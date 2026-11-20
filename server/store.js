import fs from 'node:fs/promises'
import path from 'node:path'
import { generatePersonalizedRepertoire, adaptQueueForMood, generateMonthlyClinicalReport } from './ai-repertoire-engine.js'

const seededData = {
  patients: [
    {
      id: 'patient-nirmala',
      name: 'Nirmala Sharma',
      initials: 'NS',
      age: 74,
      birthYear: 1952,
      stage: 'Middle stage',
      era: '1966–1974',
      culture: 'Hindi Cinema Golden Era · Classic Ghazals',
      score: 'MMSE 18 / 30',
      color: '#c27d66',
      activeMood: 'calm',
      symptoms: ['Sundowning', 'Anxiety', 'Restlessness'],
      meds: 'Donepezil 10mg · 8:00 AM',
      last: 'Today',
      consentedAt: '2026-10-03T10:00:00.000Z',
      biography: 'Retired Hindi literature lecturer from Lucknow University. Grew up listening to Ameen Sayani\'s Binaca Geetmala on transistor radio. Deep emotional connection to Lata Mangeshkar, Madan Mohan, and classic ghazals.',
      familyContact: 'Son: Rahul Sharma (Gurugram) · +91 98101 22345',
      triggers: ['Overly bright fluorescent tube-lights', 'Sudden loud metallic noises', 'Late afternoon shadows (4:30 PM - 7:00 PM)'],
      habits: {
        wakeTime: '06:30 AM',
        sundowningWindow: '4:30 PM – 7:00 PM',
        bedTime: '09:30 PM',
        primaryComfortRoutine: 'Warm cardamom milk with low-tempo sitar or Madan Mohan melodies'
      },
      milestones: [
        {
          id: 'ms-n1',
          year: 1968,
          title: 'Vividh Bharati & Binaca Geetmala in Lucknow',
          memoryDescription: 'Listening to Ameen Sayani countdown on the Murphy transistor radio on Wednesday nights with her father.',
          songTitle: 'Lag Ja Gale (Embrace)',
          artist: 'Lata Mangeshkar / Madan Mohan',
          genre: 'Hindi Cinema Classic',
          tempoBpm: 60,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pn-1',
              url: '/memories/lucknow_hazratganj_1968.jpg',
              caption: 'Childhood home in Hazratganj, Lucknow, 1968'
            }
          ]
        },
        {
          id: 'ms-n2',
          year: 1972,
          title: 'Wedding Celebration in Varanasi with Anand',
          memoryDescription: 'Traditional wedding reception at the Ganga ghats. Anand played this record on their first evening.',
          songTitle: 'Aap Ki Nazron Ne Samjha',
          artist: 'Lata Mangeshkar / Madan Mohan',
          genre: 'Romantic Standard',
          tempoBpm: 62,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pn-2',
              url: '/memories/varanasi_wedding_1972.jpg',
              caption: 'Anand & Nirmala wedding ceremony, Varanasi, December 1972'
            }
          ]
        },
        {
          id: 'ms-n3',
          year: 1976,
          title: 'First Family Road Trip to Shimla',
          memoryDescription: 'Driving their Ambassador car along the Kalka-Shimla hills while singing Khayyam songs.',
          songTitle: 'Kabhie Kabhie Mere Dil Mein',
          artist: 'Mukesh / Khayyam',
          genre: 'Poetic Ballad',
          tempoBpm: 64,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pn-3',
              url: '/memories/shimla_hills_1976.jpg',
              caption: 'Shimla pine hills family journey, June 1976'
            }
          ]
        },
        {
          id: 'ms-n4',
          year: 1985,
          title: 'Son Rahul\'s Childhood Musical Mornings',
          memoryDescription: 'Playing Mohammed Rafi records while preparing breakfast in their Delhi quarters.',
          songTitle: 'Chaudhvin Ka Chand Ho',
          artist: 'Mohammed Rafi / Ravi',
          genre: 'Ghazal Classic',
          tempoBpm: 62,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pn-4',
              url: '/memories/vintage_radio_1985.jpg',
              caption: 'Courtyard morning with son Rahul, 1985'
            }
          ]
        }
      ],
      medicalReports: [
        {
          id: 'rep-n1',
          appointmentDate: '2026-09-15',
          physicianName: 'Dr. Alok Verma, MD, DM (Neurology)',
          facility: 'All India Institute of Medical Sciences (AIIMS)',
          diagnosis: 'Alzheimer\'s Dementia (Moderate Stage)',
          cognitiveScore: 'MMSE 17 / 30',
          mocaScore: 'MoCA 13 / 30',
          symptomsObserved: 'Severe late-afternoon disorientation, repetitive querying about her childhood Lucknow home.',
          medicationsPrescribed: 'Donepezil 10mg morning post-breakfast',
          physicianNotes: 'Initiate non-pharmacological acoustic therapy daily at 4:00 PM to intercept sundowning transition. Avoid sedative titration.'
        },
        {
          id: 'rep-n2',
          appointmentDate: '2026-10-18',
          physicianName: 'Dr. Alok Verma, MD, DM',
          facility: 'AIIMS Memory Clinic',
          diagnosis: 'Alzheimer\'s Dementia (Middle Stage - Stabilized)',
          cognitiveScore: 'MMSE 18 / 30',
          mocaScore: 'MoCA 14 / 30',
          symptomsObserved: 'Agitation reduced by 75%. Caregiver reports singing lyrics along with Lata Mangeshkar records.',
          medicationsPrescribed: 'Donepezil 10mg continued',
          physicianNotes: 'Measurable positive behavioral response noted. MMSE score stabilized (+1 point improvement). Continue structured 25-minute evening sessions.'
        },
        {
          id: 'rep-n3',
          appointmentDate: '2026-11-15',
          physicianName: 'Dr. Alok Verma, MD, DM',
          facility: 'AIIMS Memory Clinic',
          diagnosis: 'Alzheimer\'s Dementia (Middle Stage - Cognitively Plateaued)',
          cognitiveScore: 'MMSE 18 / 30',
          mocaScore: 'MoCA 14 / 30',
          symptomsObserved: 'Calm during evening hours; motor restlessness successfully minimized.',
          medicationsPrescribed: 'Donepezil 10mg continued',
          physicianNotes: 'Excellent adherence to 4:00 PM pre-sundowning Madan Mohan repertoire. Behavioral stability maintained without neuroleptic agents.'
        }
      ],
      caregiverTips: 'Singing the opening line of "Lag Ja Gale" prompts immediate verbal recognition and settles pacing.'
    },
    {
      id: 'patient-rameshwar',
      name: 'Col. Rameshwar Rao (Retd.)',
      initials: 'RR',
      age: 79,
      birthYear: 1947,
      stage: 'Early stage',
      era: '1961–1969',
      culture: 'Classic Hindi Cinema · Patriotic Standards · Ghazals',
      score: 'MMSE 22 / 30',
      color: '#607d8b',
      activeMood: 'joyful',
      symptoms: ['Mild apathy', 'Morning withdrawal', 'Short-term memory loss'],
      meds: 'Memantine 10mg · 9:00 AM',
      last: 'Yesterday',
      consentedAt: '2026-10-08T10:00:00.000Z',
      biography: 'Decorated veteran Indian Army Artillery Officer. Stationed across Punjab, J&K, and Pune. Deep connection to classic Mukesh, Kishore Kumar, and Indian military band melodies.',
      familyContact: 'Daughter: Major Shreya Rao · +91 98230 44512',
      triggers: ['Rushing through morning routine', 'Disorganized schedule', 'Loud sudden alarm bells'],
      habits: {
        wakeTime: '06:00 AM',
        sundowningWindow: '5:00 PM – 6:30 PM',
        bedTime: '10:00 PM',
        primaryComfortRoutine: 'Listening to Kishore Kumar and Mukesh while walking in the garden'
      },
      milestones: [
        {
          id: 'ms-r1',
          year: 1965,
          title: 'Commissioning into the Regiment of Artillery',
          memoryDescription: 'Passing out parade at Indian Military Academy, Dehradun with his parents in attendance.',
          songTitle: 'Ae Mere Pyare Watan',
          artist: 'Manna Dey / Salil Chowdhury',
          genre: 'Patriotic Classical',
          tempoBpm: 66,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pr-1',
              url: '/memories/ima_dehradun_1965.jpg',
              caption: 'IMA Dehradun commissioning parade, 1965'
            }
          ]
        },
        {
          id: 'ms-r2',
          year: 1970,
          title: 'Evening Barracks Listening in Western Command',
          memoryDescription: 'Playing Mukesh records on the mess gramophone with fellow young officers.',
          songTitle: 'Jeena Yahan Marna Yahan',
          artist: 'Mukesh / Shankar-Jaikishan',
          genre: 'Philosophical Ballad',
          tempoBpm: 58,
          audioPreset: 'binaural',
          photos: [
            {
              id: 'pr-2',
              url: '/memories/vintage_radio_1985.jpg',
              caption: 'Officers mess evening gathering, Punjab 1970'
            }
          ]
        },
        {
          id: 'ms-r3',
          year: 1975,
          title: 'Wedding Anniversary in Pune',
          memoryDescription: 'Singing Kishore Kumar songs with his wife Sunita during monsoon family dinner.',
          songTitle: 'Yeh Shaam Mastani',
          artist: 'Kishore Kumar / R.D. Burman',
          genre: 'Classic Melody',
          tempoBpm: 72,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pr-3',
              url: '/memories/varanasi_wedding_1972.jpg',
              caption: 'Pune monsoon celebration with Sunita, 1975'
            }
          ]
        }
      ],
      medicalReports: [
        {
          id: 'rep-r1',
          appointmentDate: '2026-10-05',
          physicianName: 'Brig. Dr. K.S. Rathore (Retd.), MD, DM',
          facility: 'Army Hospital Research & Referral (AHRR), New Delhi',
          diagnosis: 'Mild Cognitive Impairment (Amnestic Type)',
          cognitiveScore: 'MMSE 22 / 30',
          mocaScore: 'MoCA 19 / 30',
          symptomsObserved: 'Apathy and mid-morning withdrawal.',
          medicationsPrescribed: 'Memantine 10mg morning',
          physicianNotes: 'Introduce structured morning acoustic rhythm to stimulate dopaminergic attention pathways.'
        }
      ],
      caregiverTips: 'Gentle finger tapping to Kishore Kumar melodies restores conversational alertness during morning withdrawal.'
    },
    {
      id: 'patient-ananya',
      name: 'Dr. Ananya Mukherjee',
      initials: 'AM',
      age: 71,
      birthYear: 1955,
      stage: 'Middle stage',
      era: '1969–1977',
      culture: 'Rabindra Sangeet · Classic Bengali Standards',
      score: 'MMSE 16 / 30',
      color: '#7e57c2',
      activeMood: 'calm',
      symptoms: ['Anxiety', 'Sleep disruption'],
      meds: 'Rivastigmine 4.6mg patch · Morning',
      last: 'Today',
      consentedAt: '2026-10-13T10:00:00.000Z',
      biography: 'Former Professor of Medicine at Calcutta Medical College. Passionate about Rabindra Sangeet and classical sarod traditions.',
      familyContact: 'Husband: Prof. Debashis Mukherjee · +91 98300 12890',
      triggers: ['Bright flashing video screens', 'Disorientation in evening hallways'],
      milestones: [
        {
          id: 'ms-a1',
          year: 1971,
          title: 'Monsoon Evenings at College Street Coffee House',
          memoryDescription: 'Listening to acoustic Rabindra Sangeet with medical student colleagues.',
          songTitle: 'Ekla Cholo Re',
          artist: 'Rabindranath Tagore Classical',
          genre: 'Rabindra Sangeet',
          tempoBpm: 60,
          audioPreset: 'chords',
          photos: [
            {
              id: 'pa-1',
              url: '/memories/kolkata_coffee_house_1971.jpg',
              caption: 'College Street tram & heritage, Kolkata 1971'
            }
          ]
        }
      ],
      medicalReports: [
        {
          id: 'rep-a1',
          appointmentDate: '2026-10-12',
          physicianName: 'Dr. Sourav Banerjee, MD, DM',
          facility: 'Kolkata Neurological Sciences Centre',
          diagnosis: 'Vascular Dementia with Secondary Anxiety',
          cognitiveScore: 'MMSE 16 / 30',
          mocaScore: 'MoCA 12 / 30',
          symptomsObserved: 'Nocturnal pacing and sleep onset resistance.',
          medicationsPrescribed: 'Rivastigmine patch 4.6mg',
          physicianNotes: 'Use 432Hz acoustic sitar and tanpura soundscapes 45 minutes prior to bedtime.'
        }
      ],
      caregiverTips: 'Acoustic sitar and soft tanpura drone creates immediate serenity before dinner.'
    }
  ],
  telemetry: [],
  sessions: [
    {
      id: 'sess-101',
      patientId: 'patient-nirmala',
      type: 'completed',
      goal: 'Sundowning easing & reminiscence',
      startedAt: '2026-11-18T16:30:00.000Z',
      endedAt: '2026-11-18T16:55:00.000Z',
      durationMinutes: 25,
      tracksPlayed: ['Lag Ja Gale', 'Aap Ki Nazron Ne Samjha'],
      startAgitation: 6,
      endAgitation: 2,
      startHeartRate: 88,
      endHeartRate: 70,
      outcome: 'Agitation halted; patient hummed along peacefully',
      note: 'Started session as Nirmala began pacing near the verandah asking for Lucknow. Within 6 minutes of Lag Ja Gale, she sat down, smiled, and began humming the melody.',
      recordedAt: '2026-11-18T16:55:00.000Z',
      actor: 'caregiver.alex'
    },
    {
      id: 'sess-102',
      patientId: 'patient-rameshwar',
      type: 'completed',
      goal: 'Morning mood elevation & motor grounding',
      startedAt: '2026-11-19T09:45:00.000Z',
      endedAt: '2026-11-19T10:10:00.000Z',
      durationMinutes: 25,
      tracksPlayed: ['Yeh Shaam Mastani', 'Jeena Yahan Marna Yahan'],
      startAgitation: 3,
      endAgitation: 1,
      startHeartRate: 78,
      endHeartRate: 69,
      outcome: 'Conversational alertness restored',
      note: 'Col. Rao tapped his fingers in rhythm, smiled, and shared a memory of his regimental artillery mess in 1970.',
      recordedAt: '2026-11-19T10:10:00.000Z',
      actor: 'caregiver.alex'
    }
  ],
  observations: [
    { id: 'obs-201', patientId: 'patient-nirmala', response: 'positive', mood: 'calm', heartRate: 71, agitation: 2, source: 'caregiver-dashboard', recordedAt: '2026-11-19T16:45:00.000Z', actor: 'caregiver.local' },
    { id: 'obs-202', patientId: 'patient-nirmala', response: 'agitated', mood: 'sundowning', heartRate: 94, agitation: 7, source: 'connected-sensor', recordedAt: '2026-11-19T17:15:00.000Z', actor: 'vitals.webhook' },
    { id: 'obs-203', patientId: 'patient-rameshwar', response: 'positive', mood: 'joyful', heartRate: 72, agitation: 1, source: 'caregiver-dashboard', recordedAt: '2026-11-19T10:00:00.000Z', actor: 'caregiver.local' }
  ],
  audit: [
    { id: 'aud-001', action: 'system.initialized', actor: 'system', patientId: null, occurredAt: new Date().toISOString() }
  ]
}

const dataFile = path.resolve(process.env.BEATBOT_DATA_FILE || './data/beatbot.json')

async function ensureDataFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true })
  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seededData, null, 2), 'utf8')
  }
}

async function read() {
  await ensureDataFile()
  try {
    const raw = await fs.readFile(dataFile, 'utf8')
    const parsed = JSON.parse(raw)
    parsed.patients = parsed.patients || seededData.patients
    parsed.telemetry = parsed.telemetry || []
    parsed.sessions = parsed.sessions || seededData.sessions
    parsed.observations = parsed.observations || seededData.observations
    parsed.audit = parsed.audit || seededData.audit
    return parsed
  } catch {
    return seededData
  }
}

async function write(data) {
  const temporary = `${dataFile}.tmp`
  await fs.writeFile(temporary, JSON.stringify(data, null, 2), 'utf8')
  await fs.rename(temporary, dataFile)
}

export async function resetWithPhotos() {
  await write(seededData)
  return seededData
}

export async function getDashboard() {
  const data = await read()
  return {
    patients: data.patients,
    recentSessions: data.sessions.slice(-25).reverse(),
    observations: data.observations.slice(-50).reverse()
  }
}

export async function getPatients() {
  const data = await read()
  return data.patients
}

export async function getPatient(id) {
  const data = await read()
  return data.patients.find(patient => patient.id === id) || null
}

export async function createPatient(input, actor) {
  const data = await read()
  const birthYear = Number(input.birthYear) || (2026 - (Number(input.age) || 75))
  const eraStart = birthYear + 14
  const eraEnd = birthYear + 22

  const patient = {
    id: `patient-${crypto.randomUUID().slice(0, 8)}`,
    name: input.name,
    initials: input.initials || input.name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase(),
    age: Number(input.age),
    birthYear,
    stage: input.stage || 'Middle stage',
    era: input.era || `${eraStart}–${eraEnd}`,
    culture: input.culture || 'Hindi Cinema Golden Era',
    score: input.score || 'MMSE 18 / 30',
    color: input.color || ['#c27d66', '#607d8b', '#7e57c2', '#4ea595', '#d99a4c'][Math.floor(Math.random() * 5)],
    activeMood: 'calm',
    symptoms: Array.isArray(input.symptoms) ? input.symptoms : (input.symptoms || '').split(',').map(s => s.trim()).filter(Boolean),
    meds: input.meds || 'Not recorded',
    biography: input.biography || '',
    familyContact: input.familyContact || '',
    triggers: Array.isArray(input.triggers) ? input.triggers : (input.triggers || '').split(',').map(t => t.trim()).filter(Boolean),
    habits: input.habits || {
      wakeTime: '06:30 AM',
      sundowningWindow: '4:30 PM – 7:00 PM',
      bedTime: '09:30 PM',
      primaryComfortRoutine: 'Soft classic melodies with warm milk before evening meal'
    },
    milestones: input.milestones || [],
    medicalReports: input.medicalReports || [],
    caregiverTips: input.caregiverTips || 'Gentle familiar melodies evoke smile and eye contact.',
    last: 'New record',
    consentedAt: input.consentedAt || new Date().toISOString(),
    createdAt: new Date().toISOString()
  }

  data.patients.unshift(patient)
  data.audit.push(audit('patient.created', actor, patient.id))
  await write(data)
  return patient
}

export async function updatePatient(id, updates, actor) {
  const data = await read()
  const index = data.patients.findIndex(p => p.id === id)
  if (index === -1) return null

  data.patients[index] = {
    ...data.patients[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  data.audit.push(audit('patient.updated', actor, id))
  await write(data)
  return data.patients[index]
}

export async function updatePatientMood(id, mood, actor) {
  const data = await read()
  const patient = data.patients.find(p => p.id === id)
  if (!patient) return null
  patient.activeMood = mood
  data.audit.push(audit(`patient.mood.${mood}`, actor, id))
  await write(data)
  return patient
}

export async function addMedicalReport(patientId, report, actor) {
  const data = await read()
  const patient = data.patients.find(p => p.id === patientId)
  if (!patient) return null

  patient.medicalReports = patient.medicalReports || []
  const newReport = {
    id: `rep-${crypto.randomUUID().slice(0, 8)}`,
    appointmentDate: report.appointmentDate || new Date().toISOString().split('T')[0],
    physicianName: report.physicianName || 'Dr. Neurologist',
    facility: report.facility || 'AIIMS Memory Clinic',
    diagnosis: report.diagnosis || patient.stage,
    cognitiveScore: report.cognitiveScore || patient.score,
    mocaScore: report.mocaScore || 'MoCA Not recorded',
    symptomsObserved: report.symptomsObserved || (patient.symptoms || []).join(', '),
    medicationsPrescribed: report.medicationsPrescribed || patient.meds,
    physicianNotes: report.physicianNotes || '',
    recordedAt: new Date().toISOString(),
    actor
  }

  patient.medicalReports.push(newReport)
  if (report.cognitiveScore) {
    patient.score = report.cognitiveScore
  }
  if (report.medicationsPrescribed) {
    patient.meds = report.medicationsPrescribed
  }

  data.audit.push(audit('patient.medical_report_added', actor, patientId))
  await write(data)
  return newReport
}

export async function addMilestone(patientId, milestone, actor) {
  const data = await read()
  const patient = data.patients.find(p => p.id === patientId)
  if (!patient) return null

  patient.milestones = patient.milestones || []
  const photos = Array.isArray(milestone.photos)
    ? milestone.photos
    : milestone.photoUrl
    ? [{ id: `ph-${crypto.randomUUID().slice(0, 6)}`, url: milestone.photoUrl, caption: milestone.photoCaption || milestone.title }]
    : []

  const item = {
    id: `ms-${crypto.randomUUID().slice(0, 6)}`,
    year: Number(milestone.year) || 1970,
    title: milestone.title,
    memoryDescription: milestone.memoryDescription || '',
    songTitle: milestone.songTitle || '',
    artist: milestone.artist || '',
    genre: milestone.genre || 'Hindi Classic',
    tempoBpm: Number(milestone.tempoBpm) || 62,
    audioPreset: milestone.audioPreset || 'chords',
    photos
  }

  patient.milestones.push(item)
  data.audit.push(audit('patient.milestone_added', actor, patientId))
  await write(data)
  return item
}

export async function addPhotoToMilestone(patientId, milestoneId, photo, actor) {
  const data = await read()
  const patient = data.patients.find(p => p.id === patientId)
  if (!patient) return null

  const milestone = (patient.milestones || []).find(m => m.id === milestoneId)
  if (!milestone) return null

  milestone.photos = milestone.photos || []
  const photoItem = {
    id: `ph-${crypto.randomUUID().slice(0, 6)}`,
    url: photo.url,
    caption: photo.caption || milestone.title,
    addedAt: new Date().toISOString()
  }

  milestone.photos.push(photoItem)
  data.audit.push(audit('milestone.photo_added', actor, patientId))
  await write(data)
  return milestone
}

export async function recordTelemetry(patientId, event, actor) {
  const data = await read()
  data.telemetry = data.telemetry || []

  const item = {
    id: `tel-${crypto.randomUUID().slice(0, 8)}`,
    patientId,
    trackId: event.trackId,
    trackTitle: event.trackTitle,
    action: event.action,
    dwellSeconds: Number(event.dwellSeconds || 0),
    activeMood: event.activeMood || 'calm',
    timestamp: new Date().toISOString(),
    actor
  }

  data.telemetry.push(item)
  await write(data)
  return item
}

export async function getPatientRepertoire(patientId) {
  const data = await read()
  const patient = data.patients.find(p => p.id === patientId)
  if (!patient) return null

  const patientTelemetry = (data.telemetry || []).filter(t => t.patientId === patientId)
  const baseRepertoire = generatePersonalizedRepertoire(patient)

  const activeMood = patient.activeMood || 'calm'
  const adaptedMorning = adaptQueueForMood(baseRepertoire.morningAwakening, activeMood, patient, patientTelemetry)
  const adaptedReminiscence = adaptQueueForMood(baseRepertoire.memoryReminiscence, activeMood, patient, patientTelemetry)
  const adaptedSundowning = adaptQueueForMood(baseRepertoire.sundowningTransition, activeMood, patient, patientTelemetry)

  return {
    patientId,
    activeMood,
    reminiscenceEra: baseRepertoire.reminiscenceEra,
    playlists: {
      morningAwakening: adaptedMorning,
      memoryReminiscence: adaptedReminiscence,
      sundowningTransition: adaptedSundowning,
      deepRestSoundscapes: baseRepertoire.deepRestSoundscapes
    }
  }
}

export async function getMonthlyReport(patientId) {
  const data = await read()
  const patient = data.patients.find(p => p.id === patientId)
  if (!patient) return null

  const sessions = data.sessions.filter(s => s.patientId === patientId)
  const observations = data.observations.filter(o => o.patientId === patientId)
  const reports = patient.medicalReports || []

  return generateMonthlyClinicalReport(patient, sessions, observations, reports)
}

export async function getSessions(patientId = null) {
  const data = await read()
  if (patientId) {
    return data.sessions.filter(s => s.patientId === patientId).reverse()
  }
  return [...data.sessions].reverse()
}

export async function recordSessionEvent(input, actor) {
  const data = await read()
  const event = {
    id: `sess-${crypto.randomUUID().slice(0, 8)}`,
    patientId: input.patientId,
    type: input.type || 'session_event',
    goal: input.goal || 'Memory Reminiscence',
    startedAt: input.startedAt || new Date().toISOString(),
    endedAt: input.endedAt || new Date().toISOString(),
    durationMinutes: Number(input.durationMinutes || 25),
    tracksPlayed: input.tracksPlayed || [],
    startAgitation: input.startAgitation !== undefined ? Number(input.startAgitation) : 4,
    endAgitation: input.endAgitation !== undefined ? Number(input.endAgitation) : 2,
    startHeartRate: input.startHeartRate !== undefined ? Number(input.startHeartRate) : 78,
    endHeartRate: input.endHeartRate !== undefined ? Number(input.endHeartRate) : 69,
    outcome: input.outcome || 'Patient demonstrated positive memory engagement and calmed breathing',
    note: input.note || '',
    recordedAt: new Date().toISOString(),
    actor
  }
  data.sessions.push(event)

  const patient = data.patients.find(p => p.id === input.patientId)
  if (patient) {
    patient.last = 'Just now'
  }

  data.audit.push(audit(`session.${event.type}`, actor, input.patientId))
  await write(data)
  return event
}

export async function recordObservation(input, actor) {
  const data = await read()
  const observation = {
    id: `obs-${crypto.randomUUID().slice(0, 8)}`,
    patientId: input.patientId,
    response: input.response,
    mood: input.mood || 'calm',
    heartRate: Number(input.heartRate || 74),
    agitation: Number(input.agitation || 2),
    source: input.source || 'caregiver-dashboard',
    recordedAt: new Date().toISOString(),
    actor
  }
  data.observations.push(observation)
  data.audit.push(audit('observation.recorded', actor, input.patientId))
  await write(data)
  return observation
}

export async function appendAudit(action, actor, patientId = null) {
  const data = await read()
  data.audit.push(audit(action, actor, patientId))
  await write(data)
}

function audit(action, actor, patientId) {
  return { id: `aud-${crypto.randomUUID().slice(0, 8)}`, action, actor, patientId, occurredAt: new Date().toISOString() }
}
