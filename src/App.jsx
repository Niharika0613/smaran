import { useEffect, useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowRight, Award, Bell, Bookmark, CalendarDays,
  CheckCircle2, ChevronDown, ChevronRight, Clock3, Download, FileText,
  HeartPulse, HelpCircle, History, Info, Layers, LayoutDashboard, Library,
  ListMusic, MessageSquarePlus, MoreHorizontal, Music2, Pause, Play, Plus,
  RotateCcw, Search, Settings, ShieldAlert, ShieldCheck, SkipBack, SkipForward,
  Sparkles, Stethoscope, Sliders, TrendingUp, Volume2, X, Zap
} from 'lucide-react'
import { soundEngine } from './utils/soundEngine.js'

const fallbackPatients = [
  {
    "id": "patient-nirmala",
    "name": "Nirmala Sharma",
    "initials": "NS",
    "age": 74,
    "birthYear": 1952,
    "stage": "Middle stage",
    "era": "1966–1974",
    "culture": "Hindi Cinema Golden Era · Classic Ghazals",
    "score": "MMSE 18 / 30",
    "color": "#c27d66",
    "activeMood": "calm",
    "symptoms": [
      "Sundowning",
      "Anxiety",
      "Restlessness"
    ],
    "meds": "Donepezil 10mg · 8:00 AM",
    "last": "Today",
    "consentedAt": "2026-10-03T10:00:00.000Z",
    "biography": "Retired Hindi literature lecturer from Lucknow University. Grew up listening to Ameen Sayani's Binaca Geetmala on transistor radio. Deep emotional connection to Lata Mangeshkar, Madan Mohan, and classic ghazals.",
    "familyContact": "Son: Rahul Sharma (Gurugram) · +91 98101 22345",
    "triggers": [
      "Overly bright fluorescent tube-lights",
      "Sudden loud metallic noises",
      "Late afternoon shadows (4:30 PM - 7:00 PM)"
    ],
    "habits": {
      "wakeTime": "06:30 AM",
      "sundowningWindow": "4:30 PM – 7:00 PM",
      "bedTime": "09:30 PM",
      "primaryComfortRoutine": "Warm cardamom milk with low-tempo sitar or Madan Mohan melodies"
    },
    "milestones": [
      {
        "id": "ms-n1",
        "year": 1968,
        "title": "Vividh Bharati & Binaca Geetmala in Lucknow",
        "memoryDescription": "Listening to Ameen Sayani countdown on the Murphy transistor radio on Wednesday nights with her father.",
        "songTitle": "Lag Ja Gale (Embrace)",
        "artist": "Lata Mangeshkar / Madan Mohan",
        "genre": "Hindi Cinema Classic",
        "tempoBpm": 60,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pn-1",
            "url": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
            "caption": "Childhood home in Hazratganj, Lucknow, 1968"
          }
        ]
      },
      {
        "id": "ms-n2",
        "year": 1972,
        "title": "Wedding Celebration in Varanasi with Anand",
        "memoryDescription": "Traditional wedding reception at the Ganga ghats. Anand played this record on their first evening.",
        "songTitle": "Aap Ki Nazron Ne Samjha",
        "artist": "Lata Mangeshkar / Madan Mohan",
        "genre": "Romantic Standard",
        "tempoBpm": 62,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pn-2",
            "url": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
            "caption": "Anand & Nirmala wedding ceremony, Varanasi, December 1972"
          }
        ]
      },
      {
        "id": "ms-n3",
        "year": 1976,
        "title": "First Family Road Trip to Shimla",
        "memoryDescription": "Driving their Ambassador car along the Kalka-Shimla hills while singing Khayyam songs.",
        "songTitle": "Kabhie Kabhie Mere Dil Mein",
        "artist": "Mukesh / Khayyam",
        "genre": "Poetic Ballad",
        "tempoBpm": 64,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pn-3",
            "url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            "caption": "Shimla pine hills family journey, June 1976"
          }
        ]
      },
      {
        "id": "ms-n4",
        "year": 1985,
        "title": "Son Rahul's Childhood Musical Mornings",
        "memoryDescription": "Playing Mohammed Rafi records while preparing breakfast in their Delhi quarters.",
        "songTitle": "Chaudhvin Ka Chand Ho",
        "artist": "Mohammed Rafi / Ravi",
        "genre": "Ghazal Classic",
        "tempoBpm": 62,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pn-4",
            "url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
            "caption": "Courtyard morning with son Rahul, 1985"
          }
        ]
      }
    ],
    "medicalReports": [
      {
        "id": "rep-n1",
        "appointmentDate": "2026-09-15",
        "physicianName": "Dr. Alok Verma, MD, DM (Neurology)",
        "facility": "All India Institute of Medical Sciences (AIIMS)",
        "diagnosis": "Alzheimer's Dementia (Moderate Stage)",
        "cognitiveScore": "MMSE 17 / 30",
        "mocaScore": "MoCA 13 / 30",
        "symptomsObserved": "Severe late-afternoon disorientation, repetitive querying about her childhood Lucknow home.",
        "medicationsPrescribed": "Donepezil 10mg morning post-breakfast",
        "physicianNotes": "Initiate non-pharmacological acoustic therapy daily at 4:00 PM to intercept sundowning transition. Avoid sedative titration."
      },
      {
        "id": "rep-n2",
        "appointmentDate": "2026-10-18",
        "physicianName": "Dr. Alok Verma, MD, DM",
        "facility": "AIIMS Memory Clinic",
        "diagnosis": "Alzheimer's Dementia (Middle Stage - Stabilized)",
        "cognitiveScore": "MMSE 18 / 30",
        "mocaScore": "MoCA 14 / 30",
        "symptomsObserved": "Agitation reduced by 75%. Caregiver reports singing lyrics along with Lata Mangeshkar records.",
        "medicationsPrescribed": "Donepezil 10mg continued",
        "physicianNotes": "Measurable positive behavioral response noted. MMSE score stabilized (+1 point improvement). Continue structured 25-minute evening sessions."
      },
      {
        "id": "rep-n3",
        "appointmentDate": "2026-11-15",
        "physicianName": "Dr. Alok Verma, MD, DM",
        "facility": "AIIMS Memory Clinic",
        "diagnosis": "Alzheimer's Dementia (Middle Stage - Cognitively Plateaued)",
        "cognitiveScore": "MMSE 18 / 30",
        "mocaScore": "MoCA 14 / 30",
        "symptomsObserved": "Calm during evening hours; motor restlessness successfully minimized.",
        "medicationsPrescribed": "Donepezil 10mg continued",
        "physicianNotes": "Excellent adherence to 4:00 PM pre-sundowning Madan Mohan repertoire. Behavioral stability maintained without neuroleptic agents."
      }
    ],
    "caregiverTips": "Singing the opening line of \"Lag Ja Gale\" prompts immediate verbal recognition and settles pacing."
  },
  {
    "id": "patient-rameshwar",
    "name": "Col. Rameshwar Rao (Retd.)",
    "initials": "RR",
    "age": 79,
    "birthYear": 1947,
    "stage": "Early stage",
    "era": "1961–1969",
    "culture": "Classic Hindi Cinema · Patriotic Standards · Ghazals",
    "score": "MMSE 22 / 30",
    "color": "#607d8b",
    "activeMood": "joyful",
    "symptoms": [
      "Mild apathy",
      "Morning withdrawal",
      "Short-term memory loss"
    ],
    "meds": "Memantine 10mg · 9:00 AM",
    "last": "Yesterday",
    "consentedAt": "2026-10-08T10:00:00.000Z",
    "biography": "Decorated veteran Indian Army Artillery Officer. Stationed across Punjab, J&K, and Pune. Deep connection to classic Mukesh, Kishore Kumar, and Indian military band melodies.",
    "familyContact": "Daughter: Major Shreya Rao · +91 98230 44512",
    "triggers": [
      "Rushing through morning routine",
      "Disorganized schedule",
      "Loud sudden alarm bells"
    ],
    "habits": {
      "wakeTime": "06:00 AM",
      "sundowningWindow": "5:00 PM – 6:30 PM",
      "bedTime": "10:00 PM",
      "primaryComfortRoutine": "Listening to Kishore Kumar and Mukesh while walking in the garden"
    },
    "milestones": [
      {
        "id": "ms-r1",
        "year": 1965,
        "title": "Commissioning into the Regiment of Artillery",
        "memoryDescription": "Passing out parade at Indian Military Academy, Dehradun with his parents in attendance.",
        "songTitle": "Ae Mere Pyare Watan",
        "artist": "Manna Dey / Salil Chowdhury",
        "genre": "Patriotic Classical",
        "tempoBpm": 66,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pr-1",
            "url": "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
            "caption": "IMA Dehradun commissioning parade, 1965"
          }
        ]
      },
      {
        "id": "ms-r2",
        "year": 1970,
        "title": "Evening Barracks Listening in Western Command",
        "memoryDescription": "Playing Mukesh records on the mess gramophone with fellow young officers.",
        "songTitle": "Jeena Yahan Marna Yahan",
        "artist": "Mukesh / Shankar-Jaikishan",
        "genre": "Philosophical Ballad",
        "tempoBpm": 58,
        "audioPreset": "binaural",
        "photos": [
          {
            "id": "pr-2",
            "url": "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
            "caption": "Officers mess evening gathering, Punjab 1970"
          }
        ]
      },
      {
        "id": "ms-r3",
        "year": 1975,
        "title": "Wedding Anniversary in Pune",
        "memoryDescription": "Singing Kishore Kumar songs with his wife Sunita during monsoon family dinner.",
        "songTitle": "Yeh Shaam Mastani",
        "artist": "Kishore Kumar / R.D. Burman",
        "genre": "Classic Melody",
        "tempoBpm": 72,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pr-3",
            "url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
            "caption": "Pune monsoon celebration with Sunita, 1975"
          }
        ]
      }
    ],
    "medicalReports": [
      {
        "id": "rep-r1",
        "appointmentDate": "2026-10-05",
        "physicianName": "Brig. Dr. K.S. Rathore (Retd.), MD, DM",
        "facility": "Army Hospital Research & Referral (AHRR), New Delhi",
        "diagnosis": "Mild Cognitive Impairment (Amnestic Type)",
        "cognitiveScore": "MMSE 22 / 30",
        "mocaScore": "MoCA 19 / 30",
        "symptomsObserved": "Apathy and mid-morning withdrawal.",
        "medicationsPrescribed": "Memantine 10mg morning",
        "physicianNotes": "Introduce structured morning acoustic rhythm to stimulate dopaminergic attention pathways."
      }
    ],
    "caregiverTips": "Gentle finger tapping to Kishore Kumar melodies restores conversational alertness during morning withdrawal."
  },
  {
    "id": "patient-ananya",
    "name": "Dr. Ananya Mukherjee",
    "initials": "AM",
    "age": 71,
    "birthYear": 1955,
    "stage": "Middle stage",
    "era": "1969–1977",
    "culture": "Rabindra Sangeet · Classic Bengali Standards",
    "score": "MMSE 16 / 30",
    "color": "#7e57c2",
    "activeMood": "calm",
    "symptoms": [
      "Anxiety",
      "Sleep disruption"
    ],
    "meds": "Rivastigmine 4.6mg patch · Morning",
    "last": "Today",
    "consentedAt": "2026-10-13T10:00:00.000Z",
    "biography": "Former Professor of Medicine at Calcutta Medical College. Passionate about Rabindra Sangeet and classical sarod traditions.",
    "familyContact": "Husband: Prof. Debashis Mukherjee · +91 98300 12890",
    "triggers": [
      "Bright flashing video screens",
      "Disorientation in evening hallways"
    ],
    "milestones": [
      {
        "id": "ms-a1",
        "year": 1971,
        "title": "Monsoon Evenings at College Street Coffee House",
        "memoryDescription": "Listening to acoustic Rabindra Sangeet with medical student colleagues.",
        "songTitle": "Ekla Cholo Re",
        "artist": "Rabindranath Tagore Classical",
        "genre": "Rabindra Sangeet",
        "tempoBpm": 60,
        "audioPreset": "chords",
        "photos": [
          {
            "id": "pa-1",
            "url": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
            "caption": "College Street gathering, Kolkata 1971"
          }
        ]
      }
    ],
    "medicalReports": [
      {
        "id": "rep-a1",
        "appointmentDate": "2026-10-12",
        "physicianName": "Dr. Sourav Banerjee, MD, DM",
        "facility": "Kolkata Neurological Sciences Centre",
        "diagnosis": "Vascular Dementia with Secondary Anxiety",
        "cognitiveScore": "MMSE 16 / 30",
        "mocaScore": "MoCA 12 / 30",
        "symptomsObserved": "Nocturnal pacing and sleep onset resistance.",
        "medicationsPrescribed": "Rivastigmine patch 4.6mg",
        "physicianNotes": "Use 432Hz acoustic sitar and tanpura soundscapes 45 minutes prior to bedtime."
      }
    ],
    "caregiverTips": "Acoustic sitar and soft tanpura drone creates immediate serenity before dinner."
  }
]

const fallbackTracks = [
  {
    "id": "track-1",
    "title": "Lag Ja Gale (Embrace)",
    "artist": "Lata Mangeshkar / Madan Mohan",
    "duration": "3:45",
    "seconds": 225,
    "era": "1964",
    "tag": "Formative Anchor · 1964",
    "genre": "Hindi Cinema Classic",
    "tempoBpm": 60,
    "mood": "Deep Nostalgia",
    "audioPreset": "chords",
    "memoryContext": "Vividh Bharati radio memory in Lucknow home."
  },
  {
    "id": "track-2",
    "title": "Aap Ki Nazron Ne Samjha",
    "artist": "Lata Mangeshkar / Madan Mohan",
    "duration": "3:32",
    "seconds": 212,
    "era": "1962",
    "tag": "Wedding Anchor · 1972",
    "genre": "Romantic Standard",
    "tempoBpm": 62,
    "mood": "Emotional Comfort",
    "audioPreset": "chords",
    "memoryContext": "Wedding evening celebration on Varanasi ghats."
  },
  {
    "id": "track-3",
    "title": "Kabhie Kabhie Mere Dil Mein",
    "artist": "Mukesh / Khayyam",
    "duration": "4:10",
    "seconds": 250,
    "era": "1976",
    "tag": "Family Road Trip · 1976",
    "genre": "Poetic Ballad",
    "tempoBpm": 64,
    "mood": "Serene Recollection",
    "audioPreset": "chords",
    "memoryContext": "Shimla hills Ambassador road trip with Anand."
  },
  {
    "id": "track-4",
    "title": "Chaudhvin Ka Chand Ho",
    "artist": "Mohammed Rafi / Ravi",
    "duration": "3:38",
    "seconds": 218,
    "era": "1960",
    "tag": "Paternal Anchor · 1960",
    "genre": "Ghazal Classic",
    "tempoBpm": 62,
    "mood": "Grounding Warmth",
    "audioPreset": "chords",
    "memoryContext": "Sunday breakfast radio record with son Rahul."
  },
  {
    "id": "track-5",
    "title": "Raga Bhairavi Dawn Meditation (432Hz)",
    "artist": "Smaran Neural Soundscape · Sitar & Tanpura",
    "duration": "4:15",
    "seconds": 255,
    "era": "Therapeutic Acoustic",
    "tag": "Clinical Entrainment · 432Hz",
    "genre": "Classical Indian Ambient",
    "tempoBpm": 56,
    "mood": "Distress Alleviation & Calming",
    "audioPreset": "binaural",
    "memoryContext": "Reduces autonomic heart rate and stabilizes sundowning agitation."
  },
  {
    "id": "track-6",
    "title": "Ganga Ghat Serenity & Monsoon Drops",
    "artist": "Smaran Acoustic Medicine",
    "duration": "4:00",
    "seconds": 240,
    "era": "Therapeutic Acoustic",
    "tag": "Sensory Comfort & Grounding",
    "genre": "Natural Acoustic Masking",
    "tempoBpm": 50,
    "mood": "Rest & Evening Wind-down",
    "audioPreset": "rain",
    "memoryContext": "Acoustic masking to alleviate sundowning confusion."
  }
]

const nav = [
  { label: 'Care dashboard', icon: LayoutDashboard },
  { label: 'Memory Timeline', icon: Clock3 },
  { label: 'Doctor Reports', icon: Stethoscope },
  { label: 'Sessions & Notes', icon: Music2 },
  { label: 'Progress Report', icon: Award }
]

function Avatar({ patient, large = false }) {
  if (!patient) return null
  return (
    <div className={`avatar ${large ? 'avatar-large' : ''}`} style={{ '--avatar': patient.color || '#9d86d8' }}>
      {patient.initials || patient.name?.slice(0, 2).toUpperCase()}
    </div>
  )
}

function StatTrend({ label, value, unit, trend, alert }) {
  return (
    <div className={`vital ${alert ? 'vital-alert' : ''}`}>
      <div className="vital-label">
        <span>{label}</span>
        {alert && <span className="watch-dot" />}
      </div>
      <div className="vital-reading">
        {value}
        <small>{unit}</small>
      </div>
      <div className="vital-trend">{trend}</div>
    </div>
  )
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-smaran-actor': 'clinician.care',
      ...options.headers
    }
  })
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.error || 'The care service could not complete this request.')
  }
  return response.json()
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Care dashboard')
  const [patientRecords, setPatientRecords] = useState(fallbackPatients)
  const [patientId, setPatientId] = useState(fallbackPatients[0].id)
  const [tracks, setTracks] = useState(fallbackTracks)
  const [trackIndex, setTrackIndex] = useState(0)

  // Sound Engine state
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isCalmMode: false,
    volume: 35,
    currentTime: 0,
    duration: 194,
    progress: 0,
    preset: 'chords'
  })

  // Clinical state
  const [heartRate, setHeartRate] = useState(74)
  const [response, setResponse] = useState(null)
  const [carePlan, setCarePlan] = useState(null)
  const [sessions, setSessions] = useState([])
  const [monthlyReport, setMonthlyReport] = useState(null)

  // Behavioral Learning Feedback message
  const [aiFeedback, setAiFeedback] = useState('AI Model active: Observing listening dwell-time & skips to personalize repertoire.')

  // Modals & UI
  const [modal, setModal] = useState(null) // 'onboard' | 'doctor-report' | 'milestone' | 'note' | 'simulator' | 'search' | 'playlist' | 'end-session'
  const [toast, setToast] = useState('')
  const [showPatients, setShowPatients] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Form states
  const [note, setNote] = useState('')
  const [newDoctorReport, setNewDoctorReport] = useState({
    appointmentDate: new Date().toISOString().split('T')[0],
    physicianName: 'Dr. Alok Verma, MD, DM (Neurology)',
    facility: 'All India Institute of Medical Sciences (AIIMS)',
    diagnosis: 'Alzheimer\'s Disease',
    cognitiveScore: 'MMSE 18 / 30',
    mocaScore: 'MoCA 14 / 30',
    symptomsObserved: 'Mild late-afternoon pacing, responsive to familiar vocals.',
    medicationsPrescribed: 'Donepezil 10mg morning post-breakfast',
    physicianNotes: 'Continue 3:30 PM acoustic therapy protocol. Note positive singing engagement.'
  })

  const [newMilestone, setNewMilestone] = useState({
    year: 1972,
    title: 'Varanasi Wedding Celebration',
    memoryDescription: 'Traditional wedding reception at the Ganga ghats.',
    songTitle: 'Aap Ki Nazron Ne Samjha',
    artist: 'Lata Mangeshkar / Madan Mohan',
    genre: 'Romantic Standard',
    tempoBpm: 62,
    audioPreset: 'chords'
  })

  const [onboardingForm, setOnboardingForm] = useState({
    name: '',
    age: '',
    birthYear: '',
    stage: 'Middle stage',
    culture: '',
    score: 'MMSE 18',
    symptoms: 'Sundowning, Anxiety',
    meds: 'Donepezil 10mg',
    biography: '',
    triggers: 'Loud sudden sounds',
    weddingSong: '',
    weddingArtist: ''
  })

  const [insightPeriod, setInsightPeriod] = useState('30 days')

  // Multi-Sensory Photo Memory state
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [activeMilestoneForPhoto, setActiveMilestoneForPhoto] = useState(null)
  const [photoUploadUrl, setPhotoUploadUrl] = useState('')
  const [photoUploadCaption, setPhotoUploadCaption] = useState('')
  const [showPhotoInPlayer, setShowPhotoInPlayer] = useState(true)

  const patient = patientRecords.find(p => p.id === patientId) || patientRecords[0] || fallbackPatients[0]
  const currentTrack = tracks[trackIndex] || tracks[0]

  // Detect if currently playing track has attached photos/milestones
  const currentMilestone = useMemo(() => {
    if (!currentTrack?.title) return null
    return (patient.milestones || []).find(m =>
      m.songTitle && m.songTitle.toLowerCase().trim() === currentTrack.title.toLowerCase().trim()
    ) || null
  }, [patient.milestones, currentTrack?.title])

  const currentPhoto = useMemo(() => {
    return currentMilestone?.photos?.[0] || null
  }, [currentMilestone])

  // Subscribe to Sound Engine
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      setAudioState(state)
    })
    return () => unsubscribe()
  }, [])

  // Initial Data Fetch
  useEffect(() => {
    let cancelled = false
    api('/api/dashboard')
      .then(data => {
        if (cancelled) return
        if (data.patients?.length) {
          setPatientRecords(data.patients)
          setPatientId(curr => (data.patients.some(p => p.id === curr) ? curr : data.patients[0].id))
        }
        if (data.recentSessions?.length) {
          setSessions(data.recentSessions)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [])

  // Sync Repertoire & Monthly Report when active patient changes
  useEffect(() => {
    if (!patient?.id) return
    let cancelled = false

    api(`/api/patients/${patient.id}/repertoire`)
      .then(rep => {
        if (!cancelled && rep?.playlists?.memoryReminiscence?.length) {
          setTracks(rep.playlists.memoryReminiscence)
        }
      })
      .catch(() => {})

    api(`/api/patients/${patient.id}/monthly-report`)
      .then(rep => { if (!cancelled) setMonthlyReport(rep) })
      .catch(() => {})

    return () => { cancelled = true }
  }, [patient?.id])

  // Sync Care Plan when patient or vitals change
  useEffect(() => {
    if (!patient?.id) return
    let cancelled = false
    const agitation = response === 'agitated' ? 8 : response === 'positive' ? 1 : 3
    api(`/api/patients/${patient.id}/care-plan?heartRate=${heartRate}&agitation=${agitation}`)
      .then(plan => { if (!cancelled) setCarePlan(plan) })
      .catch(() => { if (!cancelled) setCarePlan(null) })
    return () => { cancelled = true }
  }, [patient?.id, response, heartRate])

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  // Keyboard Shortcuts (⌘K / Ctrl+K, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setModal('search')
      } else if (e.key === 'Escape') {
        setModal(null)
        setShowPatients(false)
        setShowNotifications(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Track time formatting
  const formattedCurrentTime = useMemo(() => {
    const sec = Math.floor(audioState.currentTime)
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
  }, [audioState.currentTime])

  const formattedDuration = useMemo(() => {
    const sec = Math.floor(audioState.duration)
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
  }, [audioState.duration])

  // Audio Controls
  const togglePlayAudio = () => {
    if (!audioState.isPlaying && audioState.currentTime === 0) {
      soundEngine.playTrack(currentTrack)
    } else {
      soundEngine.togglePlay()
    }
  }

  // Behavioral Learning: Skip Handler
  const handleTrackSkip = async (direction) => {
    const dwell = audioState.currentTime
    const wasQuickSkip = dwell < 15

    // Send behavioral telemetry to backend
    api('/api/telemetry/interaction', {
      method: 'POST',
      body: JSON.stringify({
        patientId: patient.id,
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        action: 'skip',
        dwellSeconds: dwell,
        activeMood: patient.activeMood || 'calm'
      })
    }).catch(() => {})

    if (wasQuickSkip) {
      setAiFeedback(`Learned: "${currentTrack.title}" skipped early (${Math.round(dwell)}s). AI reducing similar frequency weights.`)
    }

    const nextIdx = (trackIndex + direction + tracks.length) % tracks.length
    setTrackIndex(nextIdx)
    const nextTrack = tracks[nextIdx]
    soundEngine.playTrack(nextTrack)
    setToast(`Playing next: ${nextTrack.title}`)
  }

  // Behavioral Learning: Replay / Like Handler
  const handleReplaySong = async () => {
    soundEngine.seek(0)
    soundEngine.resume()

    api('/api/telemetry/interaction', {
      method: 'POST',
      body: JSON.stringify({
        patientId: patient.id,
        trackId: currentTrack.id,
        trackTitle: currentTrack.title,
        action: 'replay',
        activeMood: patient.activeMood || 'calm'
      })
    }).catch(() => {})

    setAiFeedback(`Learned: "${currentTrack.title}" replayed! Flagged as Core Memory Anchor (+30 resonance).`)
    setToast(`Replaying "${currentTrack.title}" — Memory Anchor Boosted!`)
  }

  const selectTrackDirectly = (idx) => {
    setTrackIndex(idx)
    soundEngine.playTrack(tracks[idx])
    setToast(`Now playing: ${tracks[idx].title}`)
  }

  const playMilestoneSong = (ms) => {
    const existingIdx = tracks.findIndex(t => t.title.toLowerCase() === (ms.songTitle || '').toLowerCase())
    if (existingIdx !== -1) {
      selectTrackDirectly(existingIdx)
    } else {
      const customTrack = {
        id: `ms-${ms.id}`,
        title: ms.songTitle,
        artist: ms.artist || 'Memory Milestone',
        duration: '3:00',
        seconds: 180,
        audioPreset: ms.audioPreset || 'chords',
        tag: `Milestone · ${ms.year}`,
        genre: ms.genre || 'Acoustic Standard'
      }
      setTracks(prev => [customTrack, ...prev])
      setTrackIndex(0)
      soundEngine.playTrack(customTrack)
    }
    setAiFeedback(`Memory Anchor Activated: Connected to "${ms.title}" (${ms.year}).`)
    setToast(`Playing Memory Anchor: ${ms.songTitle}`)
    setActiveTab('Care dashboard')
  }

  // Change Patient Mood Dynamically
  const handleMoodSelect = async (moodKey) => {
    try {
      await api(`/api/patients/${patient.id}/mood`, {
        method: 'POST',
        body: JSON.stringify({ mood: moodKey })
      })

      // Update local state
      setPatientRecords(prev => prev.map(p => (p.id === patient.id ? { ...p, activeMood: moodKey } : p)))

      // Adapt Audio
      if (moodKey === 'agitated' || moodKey === 'sundowning') {
        soundEngine.triggerCalmMode(true)
        soundEngine.setVolume(20)
        setAiFeedback('Agitation/Sundowning Detected: Iso-principle engaged (warm lowpass 450Hz filter, softened volume).')
        setToast('Agitation mode active: Acoustic filters calmed.')
      } else {
        soundEngine.triggerCalmMode(false)
        setAiFeedback(`Mood updated to "${moodKey}": AI re-ranking playlist queue for emotional stability.`)
        setToast(`Mood set to: ${moodKey}`)
      }

      // Re-fetch dynamic repertoire
      const rep = await api(`/api/patients/${patient.id}/repertoire`)
      if (rep?.playlists?.memoryReminiscence) {
        setTracks(rep.playlists.memoryReminiscence)
      }
    } catch (err) {
      setToast(err.message)
    }
  }

  // Submit Doctor Visit Report
  const handleSubmitDoctorReport = async (e) => {
    e.preventDefault()
    try {
      const savedReport = await api(`/api/patients/${patient.id}/medical-reports`, {
        method: 'POST',
        body: JSON.stringify(newDoctorReport)
      })

      setPatientRecords(prev => prev.map(p => {
        if (p.id === patient.id) {
          return {
            ...p,
            score: newDoctorReport.cognitiveScore,
            meds: newDoctorReport.medicationsPrescribed,
            medicalReports: [...(p.medicalReports || []), savedReport]
          }
        }
        return p
      }))

      // Re-fetch monthly report
      const updatedRep = await api(`/api/patients/${patient.id}/monthly-report`)
      setMonthlyReport(updatedRep)

      setModal(null)
      setToast(`New Neurologist Report for ${patient.name} recorded! AI care plan updated.`)
    } catch (err) {
      setToast(err.message)
    }
  }

  // Submit Milestone
  const handleAddMilestone = async (e) => {
    e.preventDefault()
    try {
      const saved = await api(`/api/patients/${patient.id}/milestones`, {
        method: 'POST',
        body: JSON.stringify(newMilestone)
      })

      setPatientRecords(prev => prev.map(p => {
        if (p.id === patient.id) {
          return { ...p, milestones: [...(p.milestones || []), saved] }
        }
        return p
      }))

      setModal(null)
      setToast(`Memory milestone "${saved.title}" added with song "${saved.songTitle}"!`)
    } catch (err) {
      setToast(err.message)
    }
  }

  // Handle local photo file upload via FileReader (converts to base64 Data URL)
  const handlePhotoFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPhotoUploadUrl(reader.result)
      if (!photoUploadCaption) {
        setPhotoUploadCaption(file.name.replace(/\.[^/.]+$/, ''))
      }
    }
    reader.readAsDataURL(file)
  }

  // Attach photo to existing milestone
  const handleAttachPhotoToMilestone = async (e) => {
    e.preventDefault()
    if (!photoUploadUrl || !activeMilestoneForPhoto) return
    try {
      const photoPayload = {
        url: photoUploadUrl,
        caption: photoUploadCaption || activeMilestoneForPhoto.title
      }
      await api(`/api/patients/${patient.id}/milestones/${activeMilestoneForPhoto.id}/photos`, {
        method: 'POST',
        body: JSON.stringify(photoPayload)
      })

      setPatientRecords(prev => prev.map(p => {
        if (p.id === patient.id) {
          const updatedMilestones = (p.milestones || []).map(m => {
            if (m.id === activeMilestoneForPhoto.id) {
              return {
                ...m,
                photos: [...(m.photos || []), { id: `ph-${Date.now()}`, ...photoPayload }]
              }
            }
            return m
          })
          return { ...p, milestones: updatedMilestones }
        }
        return p
      }))

      setToast(`Photo memory attached to "${activeMilestoneForPhoto.title}"!`)
      setModal(null)
      setPhotoUploadUrl('')
      setPhotoUploadCaption('')
    } catch (err) {
      setToast(err.message)
    }
  }

  // Complete Onboarding
  const handleOnboardingSubmit = async (e) => {
    e.preventDefault()
    try {
      const birth = Number(onboardingForm.birthYear) || (2026 - Number(onboardingForm.age))
      const era = `${birth + 14}–${birth + 22}`

      const payload = {
        name: onboardingForm.name,
        age: Number(onboardingForm.age),
        birthYear: birth,
        stage: onboardingForm.stage,
        era,
        culture: onboardingForm.culture || 'American Motown & Folk',
        score: onboardingForm.score,
        symptoms: onboardingForm.symptoms.split(',').map(s => s.trim()),
        meds: onboardingForm.meds,
        biography: onboardingForm.biography,
        triggers: onboardingForm.triggers.split(',').map(t => t.trim()),
        milestones: [
          {
            year: birth + 21,
            title: 'Wedding & Early Adulthood',
            memoryDescription: 'Formative love story & family roots.',
            songTitle: onboardingForm.weddingSong || 'Stand by Me',
            artist: onboardingForm.weddingArtist || 'Ben E. King',
            genre: onboardingForm.culture || 'Familiar Soul',
            tempoBpm: 68,
            audioPreset: 'chords'
          }
        ],
        consentConfirmed: true,
        consentedAt: new Date().toISOString()
      }

      const created = await api('/api/patients', {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      setPatientRecords(prev => [created, ...prev])
      setPatientId(created.id)
      setModal(null)
      setToast(`Welcome to Smaran Neurological Care, ${created.name}! Personal reminiscence vault curated.`)
    } catch (err) {
      setToast(err.message)
    }
  }

  // Simulator Handler
  const runSimulation = async (simMode) => {
    try {
      const result = await api('/api/integrations/simulate-vitals', {
        method: 'POST',
        body: JSON.stringify({ patientId: patient.id, mode: simMode })
      })
      setHeartRate(result.observation.heartRate)
      setResponse(result.observation.response)
      if (simMode === 'agitated') {
        soundEngine.triggerCalmMode(true)
        soundEngine.setVolume(20)
        setAiFeedback('Simulator Trigger: Sundowning heart rate spike detected (108 BPM). Calm Mode active.')
        setToast('Simulator: Agitation spike triggered! Calm Mode engaged.')
      } else {
        soundEngine.triggerCalmMode(false)
        setAiFeedback(`Simulator: Vitals resting at ${result.observation.heartRate} BPM.`)
        setToast(`Simulator: Vitals updated (${result.observation.heartRate} BPM)`)
      }
      setModal(null)
    } catch (err) {
      setToast(err.message)
    }
  }

  // Filtered search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const matches = []

    patientRecords.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.culture?.toLowerCase().includes(q) || p.era?.includes(q)) {
        matches.push({ type: 'Patient', title: p.name, subtitle: `${p.stage} · ${p.era}`, action: () => { setPatientId(p.id); setModal(null); } })
      }
      (p.milestones || []).forEach(m => {
        if (m.title.toLowerCase().includes(q) || m.songTitle?.toLowerCase().includes(q)) {
          matches.push({ type: 'Memory Milestone', title: `${m.title} (${m.year})`, subtitle: `Song: ${m.songTitle}`, action: () => { playMilestoneSong(m); setModal(null); } })
        }
      })
    })

    tracks.forEach((t, i) => {
      if (t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)) {
        matches.push({ type: 'Track', title: t.title, subtitle: `${t.artist} · ${t.genre || ''}`, action: () => { selectTrackDirectly(i); setModal(null); } })
      }
    })

    return matches.slice(0, 8)
  }, [searchQuery, patientRecords, tracks])

  return (
    <div className="app-shell">
      {/* --- SIDEBAR --- */}
      <aside className="sidebar">
        <div className="brand">
          <img src="/smaran-icon.png" alt="Smaran Emblem" className="brand-icon-img" />
          <div className="brand-text-block">
            <div className="brand-hindi">स्मरण</div>
            <span className="brand-title">Smaran</span>
          </div>
          <em>neuromusic</em>
        </div>

        {audioState.isPlaying && (
          <div className="audio-pulse-indicator">
            <div className="wave-bars">
              <span /><span /><span /><span />
            </div>
            <span>Acoustic Synth Active</span>
            {audioState.isCalmMode && <small style={{ color: '#4ea595', marginLeft: 'auto', fontWeight: 700 }}>CALM</small>}
          </div>
        )}

        <div className="sidebar-label">CLINICAL SUITE</div>
        <nav>
          {nav.map(item => {
            const Icon = item.icon
            const isCurrent = activeTab === item.label
            return (
              <button
                key={item.label}
                className={`nav-item ${isCurrent ? 'nav-active' : ''}`}
                onClick={() => {
                  setActiveTab(item.label)
                  setToast(`${item.label} opened`)
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === 'Progress Report' && <span className="new-dot">Monthly</span>}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={18} />
            <span>Sundowning Alerts</span>
            <span className="notice-dot" />
          </button>
          <button className="nav-item" onClick={() => setModal('simulator')}>
            <Zap size={18} />
            <span>Vitals Simulator</span>
          </button>
          <div className="caregiver">
            <div className="caregiver-avatar">AS</div>
            <div>
              <strong>Alex Smith, CDP</strong>
              <span>Dementia Music Therapist</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- NOTIFICATIONS DRAWER --- */}
      {showNotifications && (
        <div className="notifications-drawer">
          <div className="notif-header">
            <h4>Care Team Alerts</h4>
            <button className="ghost-button" onClick={() => setShowNotifications(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="notif-list">
            <div className="notif-item notif-urgent">
              <strong>Sundowning Risk Window Approaching</strong>
              <p>Eleanor Thompson (3:30 PM). Suggested: Start 55 BPM familiar Motown acoustic routine.</p>
            </div>
            <div className="notif-item">
              <strong>Doctor Appointment Update Logged</strong>
              <p>Dr. Verma (AIIMS) confirmed MMSE stabilized at 18/30 with music therapy.</p>
            </div>
            <div className="notif-item">
              <strong>Core Memory Trigger Discovered</strong>
              <p>"Lag Ja Gale" triggered positive verbal humming and shoulder relaxation.</p>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN WORKSPACE --- */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="greeting">
            <p>NEUROLOGICAL MUSIC THERAPY PLATFORM · THURSDAY, NOV 19</p>
            <h1>Personalized Memory Restoration</h1>
          </div>
          <div className="top-actions">
            <button className="action-btn btn-primary" onClick={() => setModal('onboard')}>
              <Plus size={16} /> Onboard New Patient
            </button>
            <button className="search-btn" onClick={() => setModal('search')}>
              <Search size={17} />
              <span>Search milestones & songs</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className="action-btn btn-secondary" onClick={() => setModal('simulator')}>
              <Zap size={15} style={{ color: '#df7b66' }} />
              <span>Simulate Vitals</span>
            </button>
            <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell size={18} />
              <span className="notification-dot" />
            </button>
          </div>
        </header>

        {/* Real-time Mood & Emotional Receptivity Bar */}
        <section className="mood-bar">
          <div className="mood-bar-label">
            <Sparkles size={16} style={{ color: '#7861b5' }} />
            <span>HOW IS {patient.name.split(' ')[0].toUpperCase()} RIGHT NOW?</span>
          </div>
          <div className="mood-chips">
            {[
              { key: 'calm', label: 'Calm & Content' },
              { key: 'joyful', label: 'Engaged & Joyful' },
              { key: 'apathetic', label: 'Withdrawn / Low Affect' },
              { key: 'restless', label: 'Restless & Wandering' },
              { key: 'agitated', label: 'Sundowning / Agitated' }
            ].map(m => (
              <button
                key={m.key}
                className={`mood-chip ${patient.activeMood === m.key ? `chip-active chip-${m.key}` : ''}`}
                onClick={() => handleMoodSelect(m.key)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* Active Patient Strip */}
        <section className="patient-strip">
          <div className="patient-selector-wrap">
            <button className="patient-selector" onClick={() => setShowPatients(!showPatients)}>
              <Avatar patient={patient} />
              <div>
                <small>ACTIVE PATIENT CHART</small>
                <strong>{patient.name}</strong>
              </div>
              <ChevronDown size={17} />
            </button>

            {showPatients && (
              <div className="patient-menu">
                {patientRecords.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPatientId(p.id)
                      setShowPatients(false)
                      soundEngine.triggerCalmMode(false)
                      setToast(`${p.name} active`)
                    }}
                  >
                    <Avatar patient={p} />
                    <span>
                      {p.name}
                      <small>{p.stage} · {p.score}</small>
                    </span>
                    {p.id === patientId && <CheckCircle2 size={13} className="menu-check" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="patient-details">
            <span><CalendarDays size={15} /> Age {patient.age}</span>
            <span className="divider" />
            <span>{patient.stage}</span>
            <span className="divider" />
            <span>{patient.score}</span>
            <span className="divider" />
            <span>Formative Reminiscence Era: <strong>{patient.era}</strong></span>
          </div>

          <button className="view-profile" onClick={() => setActiveTab('Memory Timeline')}>
            <span>View Memory Timeline</span>
            <ChevronRight size={16} />
          </button>
        </section>

        {/* AI Behavioral Telemetry Card */}
        <div style={{
          background: '#f4f2fa',
          border: '1px solid #e5dfef',
          borderRadius: 8,
          padding: '8px 14px',
          fontSize: 12,
          color: '#524b64',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}>
          <Sparkles size={16} style={{ color: '#7861b5', flexShrink: 0 }} />
          <span>{aiFeedback}</span>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: CARE DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'Care dashboard' && (
          <>
            <div className="dashboard-grid">
              {/* NOW PLAYING CARD */}
              <section className="now-playing panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      <span className="live-pip" />
                      {audioState.isPlaying ? 'NOW PLAYING (LIVE WEB AUDIO)' : 'SESSION READY'}
                    </span>
                    <h2>{audioState.isCalmMode ? 'Calm Mode Intervention' : currentTrack.title}</h2>
                  </div>
                  <button className="ghost-button" onClick={() => setModal('playlist')} title="Repertoire">
                    <ListMusic size={20} />
                  </button>
                </div>

                <div className="record-row">
                  {showPhotoInPlayer && currentPhoto ? (
                    <div
                      className="memory-photo-art"
                      onClick={() => setSelectedPhoto(currentPhoto)}
                      title="Click to view full memory photo"
                    >
                      <img src={currentPhoto.url} alt={currentPhoto.caption} />
                      <div className="memory-photo-badge"><Camera size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{currentPhoto.caption}</div>
                    </div>
                  ) : (
                    <div className={`album-art ${audioState.isCalmMode ? 'calm-mode-art' : ''}`}>
                      <div className="sun" />
                      <div className="hill hill-one" />
                      <div className="hill hill-two" />
                      <div className="plant"><Music2 size={16} /></div>
                    </div>
                  )}

                  <div className="track-info">
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span className={`adaptive-badge ${audioState.isCalmMode ? 'calm-badge' : ''}`}>
                        <Sparkles size={13} />
                        {audioState.isCalmMode ? 'Acute Distress Filter' : 'Memory Anchor'}
                      </span>
                      {currentPhoto && (
                        <button
                          className="btn-replay-feedback"
                          style={{ padding: '2px 8px', fontSize: 10 }}
                          onClick={() => setShowPhotoInPlayer(!showPhotoInPlayer)}
                        >
                          {showPhotoInPlayer ? 'Show Art' : 'Show Photo Memory'}
                        </button>
                      )}
                      {currentMilestone && (
                        <button
                          className="btn-replay-feedback"
                          style={{ padding: '2px 8px', fontSize: 10 }}
                          onClick={() => {
                            setActiveMilestoneForPhoto(currentMilestone)
                            setModal('attach-photo')
                          }}
                        >
                          + Add Photo
                        </button>
                      )}
                    </div>
                    <h3>{currentTrack.title}</h3>
                    <p>{currentTrack.artist}</p>
                    <p className="track-reason">
                      {currentPhoto ? `Attached Memory: ${currentPhoto.caption}` : (currentTrack.memoryContext || `Formative ${patient.era} youth window`)}
                    </p>
                  </div>
                </div>

                {/* Timeline slider */}
                <div className="timeline">
                  <input
                    aria-label="Progress"
                    type="range"
                    min="0"
                    max="100"
                    value={audioState.progress}
                    onChange={e => soundEngine.seek(Number(e.target.value))}
                  />
                  <div>
                    <span>{formattedCurrentTime}</span>
                    <span>{formattedDuration}</span>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="player-controls">
                  <button onClick={() => handleTrackSkip(-1)} title="Previous">
                    <SkipBack fill="currentColor" size={22} />
                  </button>
                  <button className="play-button" onClick={togglePlayAudio} title={audioState.isPlaying ? 'Pause' : 'Play'}>
                    {audioState.isPlaying ? <Pause fill="currentColor" size={23} /> : <Play fill="currentColor" size={23} style={{ marginLeft: 3 }} />}
                  </button>
                  <button onClick={() => handleTrackSkip(1)} title="Next (Skips teach the AI model)">
                    <SkipForward fill="currentColor" size={22} />
                  </button>

                  <button className="btn-replay-feedback" onClick={handleReplaySong} title="Replay reinforces hippocampal memory valence in Smaran clinical engine">
                    <RotateCcw size={13} /> Replay
                  </button>

                  <div className="volume">
                    <Volume2 size={17} />
                    <input
                      aria-label="Volume"
                      type="range"
                      min="0"
                      max="100"
                      value={audioState.volume}
                      onChange={e => soundEngine.setVolume(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="session-footer">
                  <span><Clock3 size={15} /> 20 min guided reminiscence</span>
                  <span className="divider" />
                  <span>BPM: {currentTrack.tempoBpm || 68}</span>
                  <button onClick={() => setModal('end-session')}>
                    <X size={15} /> End & Save session
                  </button>
                </div>
              </section>

              {/* LIVE CHECK-IN & VITALS */}
              <section className="vitals-card panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      <HeartPulse size={14} /> LIVE BIOMETRIC TELEMETRY
                    </span>
                    <h2>{patient.name.split(' ')[0]}'s Vitals</h2>
                  </div>
                  <button className="time-chip" onClick={() => setModal('simulator')}>
                    <span className="sync-ring" /> Feed Active
                  </button>
                </div>

                <div className="vitals-grid">
                  <StatTrend
                    label="Heart rate"
                    value={heartRate}
                    unit="bpm"
                    trend={heartRate > 95 ? 'Elevated arousal' : 'Resting baseline'}
                    alert={heartRate > 95}
                  />
                  <StatTrend
                    label="Mood State"
                    value={patient.activeMood ? patient.activeMood.toUpperCase() : 'CALM'}
                    unit=""
                    trend="AI queue synchronized"
                    alert={patient.activeMood === 'agitated'}
                  />
                  <StatTrend
                    label="Memory Recall"
                    value="92%"
                    unit=""
                    trend="Smiled at melody"
                  />
                </div>

                <div className="response-ask">
                  <p>Log Caregiver Observation:</p>
                  <div className="response-buttons">
                    <button className={response === 'positive' ? 'good' : ''} onClick={() => setResponse('positive')}>
                      <HeartPulse size={13} style={{ marginRight: 4 }} /> Positive
                    </button>
                    <button className={response === 'neutral' ? 'good' : ''} onClick={() => setResponse('neutral')}>
                      <Activity size={13} style={{ marginRight: 4 }} /> Neutral
                    </button>
                    <button className={response === 'agitated' ? 'caution' : ''} onClick={() => handleMoodSelect('agitated')}>
                      <AlertTriangle size={13} style={{ marginRight: 4 }} /> Agitated
                    </button>
                  </div>

                  <div className="care-actions-bar">
                    <button className="note-link" onClick={() => setModal('note')}>
                      <MessageSquarePlus size={15} /> Add clinical observation note
                    </button>
                    <button className="note-link" onClick={() => setModal('simulator')} style={{ color: '#df7b66' }}>
                      <Zap size={15} /> Test Vital Simulator
                    </button>
                  </div>
                </div>
              </section>

              {/* UP NEXT */}
              <section className="recommendations panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      <Sparkles size={14} /> AI DYNAMIC QUEUE
                    </span>
                    <h2>Reminiscence Repertoire</h2>
                  </div>
                  <button className="view-all" onClick={() => setModal('playlist')}>
                    View All <ChevronRight size={15} />
                  </button>
                </div>

                <div className="recommend-list">
                  {tracks.map((item, idx) => {
                    if (idx === trackIndex) return null
                    return (
                      <button className="song-row" key={item.id || item.title} onClick={() => selectTrackDirectly(idx)}>
                        <span className="song-number">0{idx + 1}</span>
                        <div className={`mini-art mini-art-${idx % 4}`}>
                          <Music2 size={16} />
                        </div>
                        <div className="song-name">
                          <strong>{item.title}</strong>
                          <span>{item.artist} · {item.tempoBpm || 68} BPM</span>
                        </div>
                        <span className="song-duration">{item.duration || '3:00'}</span>
                        <Play size={16} className="row-play" />
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* SPARKLINE */}
              <section className="insights panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      <Activity size={14} /> COGNITIVE ENGAGEMENT
                    </span>
                    <h2>Response Trending Positively</h2>
                  </div>
                  <div className="period-toggle">
                    {['7 days', '30 days'].map(p => (
                      <button key={p} className={insightPeriod === p ? 'period-active' : ''} onClick={() => setInsightPeriod(p)}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="insight-body">
                  <div className="chart-wrap">
                    <svg viewBox="0 0 450 156" role="img" aria-label="Engagement chart">
                      <defs>
                        <linearGradient id="area-grad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#9f8ee4" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#9f8ee4" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="130" x2="450" y2="130" />
                      <line x1="0" y1="86" x2="450" y2="86" />
                      <line x1="0" y1="42" x2="450" y2="42" />
                      <path d="M 0 111 C 24 104, 38 114, 58 97 S 92 80, 116 91 S 153 105, 176 79 S 214 55, 237 67 S 272 79, 300 48 S 337 42, 358 51 S 396 24, 450 18 L 450 150 L 0 150 Z" fill="url(#area-grad)" />
                      <path d="M 0 111 C 24 104, 38 114, 58 97 S 92 80, 116 91 S 153 105, 176 79 S 214 55, 237 67 S 272 79, 300 48 S 337 42, 358 51 S 396 24, 450 18" fill="none" stroke="#9f8ee4" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="450" cy="18" r="5" fill="#ffffff" stroke="#9f8ee4" strokeWidth="3" />
                    </svg>
                    <div className="chart-labels">
                      <span>Oct 21</span><span>Oct 28</span><span>Nov 04</span><span>Nov 11</span><span>Today</span>
                    </div>
                  </div>

                  <div className="insight-score">
                    <strong>+24%</strong>
                    <span>cognitive<br />recall growth</span>
                    <div className="insight-note">
                      <span className="clinical-dot dot-active" /> Pre-sundowning formative melodies before 4:30 PM consistently prevent evening agitation.
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Care Plan Banner */}
            <section className="care-plan">
              <div className="plan-icon">
                <Stethoscope size={20} />
              </div>
              <div>
                <span>NEUROLOGICAL PROTOCOL SPECIFICATION</span>
                <h3>{carePlan?.changes?.mode || `${patient.symptoms.join(' + ')} protocol`}</h3>
                <p>
                  {carePlan ? `${carePlan.changes.tempo} · ${carePlan.changes.volume} · Formative Era: ${patient.era}` : 'Loading...'}
                </p>
              </div>
              <button onClick={() => setActiveTab('Progress Report')}>
                View Full Monthly Report <ChevronRight size={16} />
              </button>
            </section>
          </>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: LIFE MILESTONES & MEMORY TIMELINE */}
        {/* ========================================================================= */}
        {activeTab === 'Memory Timeline' && (
          <div className="milestones-view">
            <div className="view-header">
              <div>
                <h2>{patient.name}'s Life Milestones & Music Anchors</h2>
                <p>Connecting forgotten moments and people through songs attached to specific life memories.</p>
              </div>
              <button className="action-btn btn-primary" onClick={() => setModal('milestone')}>
                <Plus size={16} /> Attach Song to Life Memory
              </button>
            </div>

            <div className="timeline-container">
              {(patient.milestones || []).map(ms => (
                <div className="timeline-card" key={ms.id}>
                  <div className="milestone-year">{ms.year}</div>
                  <div className="milestone-title">{ms.title}</div>
                  <p className="milestone-desc">{ms.memoryDescription}</p>

                  {/* Attached Photos / Videos */}
                  {ms.photos?.length > 0 && (
                    <div className="milestone-media-row">
                      {ms.photos.map(p => (
                        <div
                          className="milestone-photo-card"
                          key={p.id || p.url}
                          onClick={() => setSelectedPhoto(p)}
                          title="Click to view full photo"
                        >
                          <img src={p.url} alt={p.caption} />
                          <div className="milestone-photo-caption">{p.caption}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <div className="milestone-song-pill">
                      <Music2 size={16} style={{ color: '#7861b5' }} />
                      <span><strong>{ms.songTitle}</strong> — {ms.artist}</span>
                      <button className="btn-play-milestone" onClick={() => playMilestoneSong(ms)}>
                        <Play size={13} /> Play Memory Song
                      </button>
                    </div>

                    <button
                      className="btn-upload-photo"
                      onClick={() => {
                        setActiveMilestoneForPhoto(ms)
                        setPhotoUploadCaption(`${ms.title} (${ms.year})`)
                        setModal('attach-photo')
                      }}
                      title="Attach family photo or video to this milestone"
                    >
                      <Plus size={13} /> Attach Photo / Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: DOCTOR APPOINTMENTS & MEDICAL REPORTS */}
        {/* ========================================================================= */}
        {activeTab === 'Doctor Reports' && (
          <div className="doctor-reports-view">
            <div className="view-header">
              <div>
                <h2>Neurological Evaluations & Doctor Reports</h2>
                <p>Closed-loop healthcare: Upload post-appointment reports to adapt the AI music therapy dosage.</p>
              </div>
              <button className="action-btn btn-primary" onClick={() => setModal('doctor-report')}>
                <Plus size={16} /> Upload Doctor Report
              </button>
            </div>

            <div className="medical-history-grid">
              {(patient.medicalReports || []).map(rep => (
                <div className="report-card" key={rep.id}>
                  <div className="report-header">
                    <div>
                      <div className="report-doctor">{rep.physicianName}</div>
                      <div className="report-date">{rep.facility} · Appointment: {rep.appointmentDate}</div>
                    </div>
                    <span className="score-badge">
                      <Award size={14} /> Cognitive Score: {rep.cognitiveScore}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 12 }}>
                    <div><strong>Diagnosis Stage:</strong> {rep.diagnosis}</div>
                    <div><strong>Active Medications:</strong> {rep.medicationsPrescribed}</div>
                  </div>

                  <div className="report-notes">
                    <strong>Physician Clinical Notes:</strong><br />
                    {rep.physicianNotes}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: SESSIONS & NOTES */}
        {/* ========================================================================= */}
        {activeTab === 'Sessions & Notes' && (
          <div className="sessions-view">
            <div className="view-header">
              <div>
                <h2>Documented Therapy Sessions</h2>
                <p>Auditable acoustic therapy sessions, vital shifts, and caregiver observation notes</p>
              </div>
              <button className="action-btn btn-primary" onClick={() => setModal('end-session')}>
                <Plus size={16} /> Log Completed Session
              </button>
            </div>

            <div className="sessions-table-card">
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>PATIENT</th>
                    <th>GOAL</th>
                    <th>DURATION</th>
                    <th>AGITATION SHIFT</th>
                    <th>OUTCOME</th>
                    <th>CAREGIVER NOTES</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map(s => {
                    const p = patientRecords.find(item => item.id === s.patientId) || patient
                    return (
                      <tr key={s.id}>
                        <td>{new Date(s.recordedAt || s.startedAt).toLocaleDateString()}</td>
                        <td>{p.name}</td>
                        <td>{s.goal}</td>
                        <td>{s.durationMinutes || 20} mins</td>
                        <td style={{ color: '#4ea595', fontWeight: 700 }}>
                          {s.startAgitation || 5} → {s.endAgitation || 2}
                        </td>
                        <td>
                          <span className="status-pill pill-completed">
                            <CheckCircle2 size={12} /> {s.outcome || 'Completed'}
                          </span>
                        </td>
                        <td style={{ maxWidth: 240, fontSize: 11.5, color: '#686374' }}>
                          {s.note}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 5: CLINICAL PROGRESS REPORT (MONTHLY DOCTOR REPORT) */}
        {/* ========================================================================= */}
        {activeTab === 'Progress Report' && (
          <div className="report-preview-view">
            <div className="view-header">
              <div>
                <h2>Monthly Neurological Music Therapy Report</h2>
                <p>Prepared for upcoming doctor appointments and family multidisciplinary reviews</p>
              </div>
              <button className="action-btn btn-primary" onClick={() => window.print()}>
                <Download size={16} /> Print / Save PDF for Doctor
              </button>
            </div>

            <div className="clinical-doc">
              <div className="doc-header">
                <div>
                  <h2>SMARAN NEUROLOGICAL CARE REPORT</h2>
                  <p style={{ margin: 0, fontSize: 12, color: '#888494' }}>
                    Non-Pharmacological Music Reminiscence Evaluation · Report ID: {monthlyReport?.reportId || 'REP-2026-11-ET'}
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: 11, color: '#6b6678' }}>
                  <strong>Evaluated Date:</strong> {new Date().toLocaleDateString()}<br />
                  <strong>Facility:</strong> {patient.medicalReports?.[0]?.facility || 'All India Institute of Medical Sciences (AIIMS)'}
                </div>
              </div>

              <div className="doc-meta-grid">
                <div><strong>Patient Name:</strong> {patient.name}</div>
                <div><strong>Age:</strong> {patient.age} (Born {patient.birthYear || 1950})</div>
                <div><strong>Current Cognitive Score:</strong> {patient.score}</div>
                <div><strong>Dementia Stage:</strong> {patient.stage}</div>
                <div><strong>Reminiscence Era:</strong> {patient.era} (Ages 14–22)</div>
                <div><strong>Current Medication:</strong> {patient.meds}</div>
              </div>

              <div className="doc-metric-row">
                <div className="doc-metric-box">
                  <strong>{monthlyReport?.calmSuccessRate || 88}%</strong>
                  <span>Calm Induction Rate</span>
                </div>
                <div className="doc-metric-box">
                  <strong>-{monthlyReport?.avgAgitationDrop || '2.4'} pts</strong>
                  <span>Average Agitation Drop (10-pt scale)</span>
                </div>
                <div className="doc-metric-box">
                  <strong>{monthlyReport?.sundowningEpisodesAverted || 16}</strong>
                  <span>Sundowning Averted (3:30–6:00 PM)</span>
                </div>
              </div>

              <div className="doc-section">
                <h4>Cognitive Score & Stability Trajectory</h4>
                <p>
                  Over the past 90 days, cognitive degradation has plateaued at <strong>{patient.score}</strong>.
                  Daily preference-led musical reminiscence sessions before the sundowning window have preserved episodic speech recall and prevented acute behavioral crises without requiring antipsychotic dosage escalation.
                </p>
              </div>

              <div className="doc-section">
                <h4>Core Memory Anchors (Most Effective Stimuli)</h4>
                <ul>
                  {(patient.milestones || []).map(m => (
                    <li key={m.id}>
                      <strong>"{m.songTitle}" ({m.artist})</strong> — Evokes memories of {m.title} ({m.year}). Patient hums along and experiences immediate shoulder tension release.
                    </li>
                  ))}
                </ul>
              </div>

              <div className="doc-section">
                <h4>Physician Direction</h4>
                <p style={{ fontStyle: 'italic', color: '#554f64' }}>
                  "Continue 20-minute daily sessions at 3:30 PM. Maintain headphone volume ceiling at 65 dB. Music therapy protocol approved."
                </p>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888494' }}>
                  <span>Attending Neurologist: {patient.medicalReports?.[0]?.physicianName || 'Dr. Alok Verma, MD, DM'}</span>
                  <span>Board Certified Neurologist</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="disclaimer">
          Smaran Neurological Care is a specialized clinical support platform for non-pharmacological dementia therapy and autobiographical memory restoration. It complies with geriatric clinical documentation guidelines.
        </p>
      </main>

      {/* --- TOAST --- */}
      {toast && (
        <div className="toast">
          <ShieldCheck size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ONBOARD NEW PATIENT */}
      {/* ========================================================================= */}
      {modal === 'onboard' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal modal-wide" onSubmit={handleOnboardingSubmit} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">MEMORY ONBOARDING</span>
            <h2>Onboard New Resident / Loved One</h2>
            <p>Our AI model analyzes life milestones, cultural heritage, and medical reports to build a personalized memory-restoration playlist.</p>

            <div className="form-grid">
              <label>
                Full Name
                <input required placeholder="e.g. Nirmala Sharma" value={onboardingForm.name} onChange={e => setOnboardingForm({ ...onboardingForm, name: e.target.value })} />
              </label>
              <label>
                Age & Birth Year
                <input required placeholder="e.g. 76 (Born 1950)" value={onboardingForm.age} onChange={e => setOnboardingForm({ ...onboardingForm, age: e.target.value, birthYear: String(2026 - Number(e.target.value)) })} />
              </label>
              <label>
                Diagnosis & Stage
                <select value={onboardingForm.stage} onChange={e => setOnboardingForm({ ...onboardingForm, stage: e.target.value })}>
                  <option>Early stage</option>
                  <option>Middle stage</option>
                  <option>Late stage</option>
                </select>
              </label>
              <label>
                Cognitive Score (MMSE / MoCA)
                <input placeholder="e.g. MMSE 18" value={onboardingForm.score} onChange={e => setOnboardingForm({ ...onboardingForm, score: e.target.value })} />
              </label>
              <label>
                Cultural / Music Heritage
                <input required placeholder="e.g. Hindi Cinema Golden Era, Ghazals, Classical Ragas" value={onboardingForm.culture} onChange={e => setOnboardingForm({ ...onboardingForm, culture: e.target.value })} />
              </label>
              <label>
                Wedding First Dance Song
                <input placeholder="e.g. Lag Ja Gale (Lata Mangeshkar)" value={onboardingForm.weddingSong} onChange={e => setOnboardingForm({ ...onboardingForm, weddingSong: e.target.value })} />
              </label>
            </div>

            <label>
              Active Symptoms (comma separated)
              <input placeholder="e.g. Sundowning, Anxiety, Insomnia" value={onboardingForm.symptoms} onChange={e => setOnboardingForm({ ...onboardingForm, symptoms: e.target.value })} />
            </label>

            <label>
              Current Medications & Timing
              <input placeholder="e.g. Donepezil 10mg 8:00 AM" value={onboardingForm.meds} onChange={e => setOnboardingForm({ ...onboardingForm, meds: e.target.value })} />
            </label>

            <label>
              Brief Life Story & Family Milestones
              <textarea placeholder="e.g. Hindi literature lecturer, grew up listening to Binaca Geetmala on radio, loves Lata Mangeshkar..." value={onboardingForm.biography} onChange={e => setOnboardingForm({ ...onboardingForm, biography: e.target.value })} />
            </label>

            <label className="consent-check">
              <input type="checkbox" required />
              I verify that consent has been documented under institutional policy.
            </label>

            <button className="save-note" type="submit">
              Curate Personalized Reminiscence Vault
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UPLOAD DOCTOR REPORT */}
      {/* ========================================================================= */}
      {modal === 'doctor-report' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal" onSubmit={handleSubmitDoctorReport} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">DOCTOR APPOINTMENT LOG</span>
            <h2>Upload Neurologist Report</h2>
            <p>Update {patient.name}'s chart following their medical appointment to adapt the music therapy plan.</p>

            <div className="form-grid">
              <label>
                Appointment Date
                <input type="date" required value={newDoctorReport.appointmentDate} onChange={e => setNewDoctorReport({ ...newDoctorReport, appointmentDate: e.target.value })} />
              </label>
              <label>
                Neurologist / Physician Name
                <input required value={newDoctorReport.physicianName} onChange={e => setNewDoctorReport({ ...newDoctorReport, physicianName: e.target.value })} />
              </label>
            </div>

            <label>
              Hospital / Clinic Facility
              <input value={newDoctorReport.facility} onChange={e => setNewDoctorReport({ ...newDoctorReport, facility: e.target.value })} />
            </label>

            <div className="form-grid">
              <label>
                Cognitive Score (MMSE)
                <input required placeholder="e.g. MMSE 18 / 30" value={newDoctorReport.cognitiveScore} onChange={e => setNewDoctorReport({ ...newDoctorReport, cognitiveScore: e.target.value })} />
              </label>
              <label>
                MoCA Score (optional)
                <input placeholder="e.g. MoCA 14 / 30" value={newDoctorReport.mocaScore} onChange={e => setNewDoctorReport({ ...newDoctorReport, mocaScore: e.target.value })} />
              </label>
            </div>

            <label>
              Updated Medication Regimen
              <input value={newDoctorReport.medicationsPrescribed} onChange={e => setNewDoctorReport({ ...newDoctorReport, medicationsPrescribed: e.target.value })} />
            </label>

            <label>
              Physician Clinical Notes & Observations
              <textarea required value={newDoctorReport.physicianNotes} onChange={e => setNewDoctorReport({ ...newDoctorReport, physicianNotes: e.target.value })} />
            </label>

            <button className="save-note" type="submit">
              Save Doctor Report & Update AI Model
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ATTACH SONG TO LIFE MILESTONE */}
      {/* ========================================================================= */}
      {modal === 'milestone' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal" onSubmit={handleAddMilestone} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">MEMORY ANCHOR</span>
            <h2>Attach Song to Life Memory</h2>
            <p>Every person has songs linked to core memories. Help {patient.name} reconnect with their life moments.</p>

            <div className="form-grid">
              <label>
                Milestone Year
                <input type="number" required placeholder="e.g. 1974" value={newMilestone.year} onChange={e => setNewMilestone({ ...newMilestone, year: e.target.value })} />
              </label>
              <label>
                Milestone Title
                <input required placeholder="e.g. Wedding First Dance" value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })} />
              </label>
            </div>

            <label>
              What Happened in this Memory?
              <textarea required placeholder="e.g. Wedding reception at Varanasi ghats under evening lamps..." value={newMilestone.memoryDescription} onChange={e => setNewMilestone({ ...newMilestone, memoryDescription: e.target.value })} />
            </label>

            <div className="form-grid">
              <label>
                Song Title
                <input required placeholder="e.g. Lag Ja Gale" value={newMilestone.songTitle} onChange={e => setNewMilestone({ ...newMilestone, songTitle: e.target.value })} />
              </label>
              <label>
                Artist
                <input required placeholder="e.g. Lata Mangeshkar / Madan Mohan" value={newMilestone.artist} onChange={e => setNewMilestone({ ...newMilestone, artist: e.target.value })} />
              </label>
            </div>

            <label>
              Memory Photo / Image URL (optional)
              <input
                placeholder="e.g. https://... or leave blank to attach photo later"
                value={newMilestone.photoUrl || ''}
                onChange={e => setNewMilestone({ ...newMilestone, photoUrl: e.target.value })}
              />
            </label>

            <button className="save-note" type="submit">
              Attach Memory to Repertoire
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CAREGIVER OBSERVATION NOTE */}
      {/* ========================================================================= */}
      {modal === 'note' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">CLINICAL OBSERVATION</span>
            <h2>Record Care Observation</h2>
            <p>Non-verbal cues like smiling, eye contact, or foot tapping indicate cognitive engagement.</p>

            <div className="quick-tags">
              {['Humming along', 'Smiling & eye contact', 'Shoulders relaxed', 'Tapping foot', 'Agitation subsided', 'Reminiscing about family'].map(tag => (
                <button key={tag} type="button" className="quick-tag-btn" onClick={() => setNote(prev => (prev ? `${prev}, ${tag}` : tag))}>
                  + {tag}
                </button>
              ))}
            </div>

            <textarea autoFocus value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Eleanor hummed along with the chorus and closed her eyes peacefully..." />
            <button className="save-note" onClick={() => { setToast(`Care note logged for ${patient.name}`); setNote(''); setModal(null); }}>
              Save to {patient.name}'s Chart
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: VITALS SIMULATOR */}
      {/* ========================================================================= */}
      {modal === 'simulator' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow" style={{ color: '#df7b66' }}>INTERACTIVE SIMULATOR</span>
            <h2>Test Clinical Responses</h2>
            <p>Simulate autonomic nervous system states to evaluate Smaran's adaptive acoustic entrainment in real-time.</p>

            <div className="simulator-options">
              <div className="sim-card" onClick={() => runSimulation('agitated')}>
                <strong style={{ color: '#ae593c' }}><Activity size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Agitation Spike / Sundowning (108 BPM)</strong>
                <span>Triggers Calm Mode, rolls off high frequencies at 450Hz, drops volume to 20%, and alerts caregiver.</span>
              </div>
              <div className="sim-card" onClick={() => runSimulation('relaxed')}>
                <strong style={{ color: '#3d8173' }}><HeartPulse size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Deep Relaxation / Serenity (64 BPM)</strong>
                <span>Normalizes tempo, records positive engagement, and restores full acoustic harmonics.</span>
              </div>
              <div className="sim-card" onClick={() => runSimulation('normal')}>
                <strong style={{ color: '#615c71' }}>Resting Baseline (74 BPM)</strong>
                <span>Normal resting state with standard reminiscence session flow.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: GLOBAL SEARCH */}
      {/* ========================================================================= */}
      {modal === 'search' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">FAST NAVIGATOR</span>
            <h2>Search Patients, Milestones & Songs</h2>

            <div className="search-input-wrap">
              <Search size={18} />
              <input autoFocus placeholder="Type patient name, song title, or milestone year..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            <div className="search-results">
              {searchResults.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#908b9c', margin: '20px 0' }}>
                  {searchQuery ? 'No matching records found' : 'Type to search across patients and tracks'}
                </p>
              ) : (
                searchResults.map((item, idx) => (
                  <button className="search-item" key={idx} onClick={item.action}>
                    <div>
                      <strong>{item.title}</strong>
                      <small style={{ display: 'block', color: '#8d8799' }}>{item.subtitle}</small>
                    </div>
                    <span className="status-pill pill-completed" style={{ marginLeft: 'auto' }}>{item.type}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: END SESSION RECAP */}
      {/* ========================================================================= */}
      {modal === 'end-session' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">SESSION SUMMARY</span>
            <h2>Conclude Music Therapy Session</h2>
            <p>Session completed for <strong>{patient.name}</strong>.</p>
            <button className="save-note" onClick={() => { soundEngine.pause(); setModal(null); setToast('Session logged in chart.'); }}>
              Save Session & Exit
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ATTACH PHOTO OR VIDEO TO MILESTONE */}
      {/* ========================================================================= */}
      {modal === 'attach-photo' && activeMilestoneForPhoto && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal" onSubmit={handleAttachPhotoToMilestone} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">MULTI-SENSORY REMINISCENCE</span>
            <h2>Attach Photo to "{activeMilestoneForPhoto.title}"</h2>
            <p>
              Combining visual photos with music increases autobiographical recall in Alzheimer's patients by over 200%.
            </p>

            {/* Local File Upload */}
            <div className="upload-dropzone" onClick={() => document.getElementById('photoFileInput').click()}>
              <input
                id="photoFileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoFileUpload}
              />
              <p>Click or drag to select archival family photograph</p>
              <small>Supports PNG, JPG, WEBP (saved locally)</small>
            </div>

            <div style={{ textAlign: 'center', margin: '6px 0', fontSize: 11, color: '#9d98a8' }}>— OR PASTE IMAGE / VIDEO URL —</div>

            <label>
              Image / Video URL
              <input
                placeholder="https://example.com/wedding-photo.jpg"
                value={photoUploadUrl}
                onChange={e => setPhotoUploadUrl(e.target.value)}
              />
            </label>

            {photoUploadUrl && (
              <div style={{ textAlign: 'center', margin: '10px 0' }}>
                <img
                  src={photoUploadUrl}
                  alt="Preview"
                  style={{ maxHeight: 140, maxWidth: '100%', borderRadius: 8, objectFit: 'cover', border: '1px solid #dedbe5' }}
                />
              </div>
            )}

            <label>
              Memory Caption & Story
              <input
                required
                placeholder="e.g. Wedding first dance under garden lights, June 1974"
                value={photoUploadCaption}
                onChange={e => setPhotoUploadCaption(e.target.value)}
              />
            </label>

            <button className="save-note" type="submit" disabled={!photoUploadUrl}>
              Save Photo to Memory Vault
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FULL-SIZE PHOTO LIGHTBOX */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedPhoto(null)}>
          <div
            className="modal"
            style={{ maxWidth: 640, padding: 20, textAlign: 'center' }}
            onMouseDown={e => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedPhoto(null)}>
              <X size={18} />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: 8 }}
            />
            <p style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: '#2b2738' }}>
              {selectedPhoto.caption}
            </p>
            <button
              className="action-btn btn-primary"
              style={{ margin: '8px auto 0' }}
              onClick={() => {
                if (currentMilestone) playMilestoneSong(currentMilestone)
                setSelectedPhoto(null)
              }}
            >
              <Play size={13} /> Play Attached Memory Song
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: PLAYLIST VAULT */}
      {/* ========================================================================= */}
      {modal === 'playlist' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <div className="modal modal-wide" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">REPERTOIRE VAULT</span>
            <h2>{patient.name}'s Curated Songs</h2>
            <p>Songs matched to {patient.era} formative reminiscence window and personal memory anchors.</p>

            <div style={{ maxHeight: 320, overflowY: 'auto' }}>
              {tracks.map((t, idx) => (
                <div key={t.id || t.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderBottom: '1px solid #f2eff6' }}>
                  <div>
                    <strong>{t.title}</strong>
                    <div style={{ fontSize: 11, color: '#827e8f' }}>{t.artist} · {t.genre || 'Familiar Standard'}</div>
                  </div>
                  <button className="action-btn btn-secondary" style={{ height: 32, padding: '0 10px', fontSize: 11 }} onClick={() => { selectTrackDirectly(idx); setModal(null); }}>
                    <Play size={12} /> Play
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
