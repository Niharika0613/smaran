const stageDefaults = {
  early: { sessionMinutes: 25, tempo: '70–85 BPM', complexity: 'moderate', volume: 'comfortable (45–55%)', maxDb: 68 },
  middle: { sessionMinutes: 20, tempo: '55–70 BPM', complexity: 'simple / familiar', volume: 'low (30–45%)', maxDb: 62 },
  late: { sessionMinutes: 12, tempo: '45–60 BPM', complexity: 'gentle acoustic / vocal only', volume: 'very low (20–35%)', maxDb: 55 }
}

/**
 * Calculates the neurological reminiscence bump era (formative musical memory window)
 * Scientifically validated in cognitive neurology: autobiographical memory encoding
 * peaks between ages 14 and 22.
 */
export function calculateReminiscenceEra(age, currentYear = 2026) {
  const numericAge = Number(age) || 75
  const birthYear = currentYear - numericAge
  const eraStart = birthYear + 14
  const eraEnd = birthYear + 22
  return `${eraStart}–${eraEnd}`
}

/**
 * This produces care-team review prompts and personalized acoustic recommendations.
 * It is supportive and non-diagnostic; a clinician must oversee all clinical plans.
 */
export function buildCarePlan(patient, checkIn = {}) {
  const stage = String(patient.stage || 'middle').toLowerCase().replace(' stage', '')
  const base = stageDefaults[stage] || stageDefaults.middle
  const symptoms = (patient.symptoms || []).map(item => item.toLowerCase())
  const agitation = Number(checkIn.agitation ?? 0)
  const heartRate = Number(checkIn.heartRate ?? 0)
  const hour = new Date().getHours()
  
  const reminiscenceEra = calculateReminiscenceEra(patient.age)
  const reasons = [
    `${base.sessionMinutes}-minute ${base.complexity} session is standard protocol for the documented ${stage} stage.`,
    `Formative reminiscence memory window is estimated at ${reminiscenceEra} (ages 14–22).`
  ]
  
  const guardrails = [
    'Start only when patient appears settled and a certified caregiver is in proximity.',
    'Monitor non-verbal cues: discontinue if furrowed brow, withdrawal, or defensive posturing occurs.',
    `Ensure headphone or speaker volume does not exceed ${base.maxDb} dB.`
  ]
  
  const changes = {
    ...base,
    mode: 'familiar repertoire',
    volumeLevel: 'comfortable',
    reminiscenceEra,
    targetHeartRate: '64–72 BPM',
    sensoryEnvironment: 'Soft natural lighting, minimal corridor foot-traffic'
  }

  // Symptom Adaptations
  if (symptoms.includes('anxiety')) {
    changes.mode = 'calming familiar repertoire & acoustic strings'
    changes.tempo = '55–65 BPM'
    changes.volume = 'gentle (30–40%)'
    reasons.push('Anxiety is documented: prioritize predictable melody, gentle acoustic timbres, and slow cadences.')
  }

  if (symptoms.includes('sundowning') && (hour >= 15 && hour <= 20)) {
    changes.mode = 'late-afternoon sundowning soothing transition'
    changes.tempo = '50–60 BPM'
    changes.volume = 'low (25–35%)'
    changes.sensoryEnvironment = 'Warm amber lamp lighting; close curtains to reduce confusing shadows and glare'
    reasons.push('Current time matches the patient\'s high-risk sundowning window (3 PM–8 PM); reducing stimulus and introducing familiar calming cues.')
  }

  if (symptoms.includes('depression') || symptoms.includes('low mood')) {
    changes.mode = 'gentle rhythmic familiar repertoire & vocal recognition'
    changes.tempo = '68–80 BPM'
    reasons.push('Documented low mood: offer recognizable vocal standards from youth to stimulate emotional connection and eye contact.')
  }

  if (symptoms.includes('sleep disruption') && (hour >= 19 || hour <= 6)) {
    changes.mode = 'binaural theta soundscape & slow ambient waves'
    changes.tempo = '45–55 BPM'
    changes.volume = 'whisper soft (15–25%)'
    reasons.push('Nighttime wind-down: utilize 432Hz harmonic tones to facilitate parasympathetic transition.')
  }

  // Real-time Vitals & Agitation Check
  if (agitation >= 7 || (heartRate && heartRate >= 105)) {
    changes.mode = 'CAUTION: PAUSE & SENSORY COMFORT CHECK'
    changes.tempo = 'discontinue music / switch to ambient white noise'
    changes.volume = 'muted or ambient minimum (<20%)'
    changes.sensoryEnvironment = 'Reduce all room noise, offer glass of warm water, gentle verbal reassurance'
    reasons.push(`The latest check-in meets the acute caution threshold (Agitation: ${agitation}/10, Heart Rate: ${heartRate || 'N/A'} BPM). Immediate sensory reassessment required.`)
    guardrails.unshift('URGENT: Caregiver intervention required before continuing music therapy.')
  }

  return {
    generatedAt: new Date().toISOString(),
    clinicianReviewRequired: true,
    patientStage: stage,
    reminiscenceEra,
    changes,
    reasons,
    guardrails,
    evidence: 'Neurological music therapy (NMT) leverages preserved auditory-motor networks in the hippocampus and temporal lobe to reduce neuropsychiatric symptoms without pharmacological side-effects.'
  }
}
