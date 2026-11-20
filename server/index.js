import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildCarePlan } from './care-engine.js'
import {
  appendAudit,
  createPatient,
  getDashboard,
  getPatient,
  getPatients,
  updatePatient,
  updatePatientMood,
  addMedicalReport,
  addMilestone,
  addPhotoToMilestone,
  resetWithPhotos,
  recordTelemetry,
  getPatientRepertoire,
  getMonthlyReport,
  getSessions,
  recordSessionEvent,
  recordObservation
} from './store.js'

const app = express()
const port = Number(process.env.PORT || 8787)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const webhookSecret = process.env.VITAL_WEBHOOK_SECRET || 'beatbot-demo-secret'
const isDemoMode = process.env.DEMO_MODE !== 'false'

app.disable('x-powered-by')
app.use(cors())
app.use(express.json({ limit: '500kb' }))
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'same-origin')
  next()
})

const actor = req => String(req.header('x-smaran-actor') || req.header('x-beatbot-actor') || 'caregiver.alex')
const required = fields => (req, res, next) => {
  const missing = fields.filter(field => req.body?.[field] === undefined || req.body?.[field] === '')
  if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` })
  next()
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'smaran-neurological-care-api',
    status: 'operational',
    demoMode: isDemoMode,
    timestamp: new Date().toISOString()
  })
})

// Unified Dashboard Data
app.get('/api/dashboard', async (_req, res, next) => {
  try {
    const data = await getDashboard()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// Patients List & CRUD
app.get('/api/patients', async (_req, res, next) => {
  try {
    res.json(await getPatients())
  } catch (error) {
    next(error)
  }
})

app.get('/api/patients/:patientId', async (req, res, next) => {
  try {
    const patient = await getPatient(req.params.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    res.json(patient)
  } catch (error) {
    next(error)
  }
})

app.post('/api/patients', required(['name', 'age']), async (req, res, next) => {
  try {
    const patient = await createPatient(req.body, actor(req))
    res.status(201).json(patient)
  } catch (error) {
    next(error)
  }
})

app.put('/api/patients/:patientId', async (req, res, next) => {
  try {
    const updated = await updatePatient(req.params.patientId, req.body, actor(req))
    if (!updated) return res.status(404).json({ error: 'Patient not found' })
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

// Dynamic Mood Update
app.post('/api/patients/:patientId/mood', required(['mood']), async (req, res, next) => {
  try {
    const updated = await updatePatientMood(req.params.patientId, req.body.mood, actor(req))
    if (!updated) return res.status(404).json({ error: 'Patient not found' })
    
    // Also record as observation
    await recordObservation({
      patientId: req.params.patientId,
      response: req.body.mood === 'agitated' ? 'agitated' : 'positive',
      mood: req.body.mood,
      source: 'mood-selector'
    }, actor(req))

    res.json(updated)
  } catch (error) {
    next(error)
  }
})

// Dynamic Mood-Adapted AI Repertoire
app.get('/api/patients/:patientId/repertoire', async (req, res, next) => {
  try {
    const repertoire = await getPatientRepertoire(req.params.patientId)
    if (!repertoire) return res.status(404).json({ error: 'Patient not found' })
    res.json(repertoire)
  } catch (error) {
    next(error)
  }
})

// Doctor Appointments & Medical Reports
app.get('/api/patients/:patientId/medical-reports', async (req, res, next) => {
  try {
    const patient = await getPatient(req.params.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    res.json(patient.medicalReports || [])
  } catch (error) {
    next(error)
  }
})

app.post('/api/patients/:patientId/medical-reports', required(['cognitiveScore']), async (req, res, next) => {
  try {
    const report = await addMedicalReport(req.params.patientId, req.body, actor(req))
    if (!report) return res.status(404).json({ error: 'Patient not found' })
    res.status(201).json(report)
  } catch (error) {
    next(error)
  }
})

// Life Milestones & Memory Vault
app.post('/api/patients/:patientId/milestones', required(['title']), async (req, res, next) => {
  try {
    const item = await addMilestone(req.params.patientId, req.body, actor(req))
    if (!item) return res.status(404).json({ error: 'Patient not found' })
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
})

// Attach photo or video memory to milestone
app.post('/api/patients/:patientId/milestones/:milestoneId/photos', required(['url']), async (req, res, next) => {
  try {
    const updated = await addPhotoToMilestone(req.params.patientId, req.params.milestoneId, req.body, actor(req))
    if (!updated) return res.status(404).json({ error: 'Milestone or patient not found' })
    res.status(201).json(updated)
  } catch (error) {
    next(error)
  }
})

// Reload sample data with rich photos
app.post('/api/reset-demo-data', async (_req, res, next) => {
  try {
    const data = await resetWithPhotos()
    res.json({ ok: true, data })
  } catch (error) {
    next(error)
  }
})

// Behavioral Telemetry (Skips, Replays, Dwell Time)
app.post('/api/telemetry/interaction', required(['patientId', 'action']), async (req, res, next) => {
  try {
    const item = await recordTelemetry(req.body.patientId, req.body, actor(req))
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
})

// Monthly Clinical Progress Report
app.get('/api/patients/:patientId/monthly-report', async (req, res, next) => {
  try {
    const report = await getMonthlyReport(req.params.patientId)
    if (!report) return res.status(404).json({ error: 'Patient not found' })
    res.json(report)
  } catch (error) {
    next(error)
  }
})

// Adaptive Care Plan Protocol
app.get('/api/patients/:patientId/care-plan', async (req, res, next) => {
  try {
    const patient = await getPatient(req.params.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    res.json(buildCarePlan(patient, req.query))
  } catch (error) {
    next(error)
  }
})

// Sessions
app.get('/api/sessions', async (req, res, next) => {
  try {
    res.json(await getSessions(req.query.patientId))
  } catch (error) {
    next(error)
  }
})

app.post('/api/session-events', required(['patientId']), async (req, res, next) => {
  try {
    const patient = await getPatient(req.body.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    const event = await recordSessionEvent(req.body, actor(req))
    res.status(201).json(event)
  } catch (error) {
    next(error)
  }
})

// Observations
app.post('/api/observations', required(['patientId', 'response']), async (req, res, next) => {
  try {
    const patient = await getPatient(req.body.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })
    const observation = await recordObservation(req.body, actor(req))
    res.status(201).json(observation)
  } catch (error) {
    next(error)
  }
})

// Live Vitals Integration & Webhook
app.post('/api/integrations/vitals', required(['patientId', 'heartRate', 'agitation']), async (req, res, next) => {
  try {
    const sig = req.header('x-beatbot-signature')
    if (!isDemoMode && (!webhookSecret || sig !== webhookSecret)) {
      return res.status(401).json({ error: 'Invalid webhook signature' })
    }
    const patient = await getPatient(req.body.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })

    const observation = await recordObservation(
      { ...req.body, source: req.body.source || 'connected-device' },
      'vitals.webhook'
    )
    const plan = buildCarePlan(patient, observation)
    res.status(201).json({ observation, carePlan: plan })
  } catch (error) {
    next(error)
  }
})

// Simulator Endpoint for live testing
app.post('/api/integrations/simulate-vitals', required(['patientId']), async (req, res, next) => {
  try {
    const patient = await getPatient(req.body.patientId)
    if (!patient) return res.status(404).json({ error: 'Patient not found' })

    const mode = req.body.mode || 'normal'
    let heartRate = 72
    let agitation = 2
    let response = 'positive'
    let mood = 'calm'

    if (mode === 'agitated') {
      heartRate = Math.floor(98 + Math.random() * 18)
      agitation = Math.floor(7 + Math.random() * 3)
      response = 'agitated'
      mood = 'agitated'
    } else if (mode === 'relaxed') {
      heartRate = Math.floor(62 + Math.random() * 8)
      agitation = 1
      response = 'positive'
      mood = 'calm'
    } else {
      heartRate = Math.floor(70 + Math.random() * 12)
      agitation = Math.floor(2 + Math.random() * 3)
      response = 'neutral'
      mood = 'calm'
    }

    patient.activeMood = mood
    const obs = await recordObservation({
      patientId: patient.id,
      heartRate,
      agitation,
      response,
      mood,
      source: 'live-simulator'
    }, 'simulator')

    const plan = buildCarePlan(patient, obs)
    res.json({ observation: obs, carePlan: plan })
  } catch (error) {
    next(error)
  }
})

// Static frontend serving for production
const distPath = path.join(root, 'dist')
app.use(express.static(distPath))

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'))
  }
  next()
})

app.use(async (error, req, res, _next) => {
  console.error('Server error:', error)
  await appendAudit('request.failed', actor(req)).catch(() => {})
  res.status(500).json({ error: error.message || 'The care service could not complete this request.' })
})

app.listen(port, () => console.log(`Smaran Neurological Care Platform running on http://127.0.0.1:${port}`))
