import React, { useEffect, useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowRight, Award, Bell, Bookmark, CalendarDays, Camera,
  CheckCircle2, ChevronDown, ChevronRight, Clock3, Download, FileText,
  HeartPulse, HelpCircle, History, Info, Layers, LayoutDashboard, Library,
  ListMusic, MessageSquarePlus, MoreHorizontal, Music2, Pause, Play, Plus,
  RotateCcw, Search, Settings, ShieldAlert, ShieldCheck, SkipBack, SkipForward,
  Sparkles, Stethoscope, Sliders, TrendingUp, Volume2, X, Zap, Heart
} from 'lucide-react'
import { soundEngine } from './utils/soundEngine.js'
import Navbar from './components/Navbar.jsx'
import LandingPage from './components/LandingPage.jsx'
import ListenerPlayer from './components/ListenerPlayer.jsx'
import AdminPortal from './components/AdminPortal.jsx'
import AuthModal from './components/AuthModal.jsx'

const fallbackPatients = [
  {
    id: "patient-nirmala",
    name: "Nirmala Sharma",
    initials: "NS",
    age: 74,
    birthYear: 1952,
    stage: "Middle stage",
    era: "1966–1974",
    culture: "Hindi Cinema Golden Era · Classic Ghazals",
    score: "MMSE 18 / 30",
    color: "#c27d66",
    activeMood: "calm",
    symptoms: [
      "Sundowning",
      "Anxiety",
      "Restlessness"
    ],
    meds: "Donepezil 10mg · 8:00 AM",
    last: "Today",
    consentedAt: "2026-10-03T10:00:00.000Z",
    biography: "Retired Hindi literature lecturer from Lucknow University. Grew up listening to Ameen Sayani's Binaca Geetmala on transistor radio. Deep emotional connection to Lata Mangeshkar, Madan Mohan, and classic ghazals.",
    familyContact: "Son: Rahul Sharma (Gurugram) · +91 98101 22345",
    triggers: [
      "Overly bright fluorescent tube-lights",
      "Sudden loud metallic noises",
      "Late afternoon shadows (4:30 PM - 7:00 PM)"
    ],
    habits: {
      wakeTime: "06:30 AM",
      sundowningWindow: "4:30 PM – 7:00 PM",
      bedTime: "09:30 PM",
      primaryComfortRoutine: "Warm cardamom milk with low-tempo sitar or Madan Mohan melodies"
    },
    milestones: [
      {
        id: "ms-n1",
        year: 1968,
        title: "Vividh Bharati & Binaca Geetmala in Lucknow",
        memoryDescription: "Listening to Ameen Sayani countdown on the Murphy transistor radio on Wednesday nights with her father.",
        songTitle: "Lag Ja Gale (Embrace)",
        artist: "Lata Mangeshkar / Madan Mohan",
        genre: "Hindi Cinema Classic",
        tempoBpm: 60,
        audioPreset: "chords",
        photos: [
          {
            id: "pn-1",
            url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
            caption: "Childhood home in Hazratganj, Lucknow, 1968"
          }
        ]
      },
      {
        id: "ms-n2",
        year: 1972,
        title: "Wedding Celebration in Varanasi with Anand",
        memoryDescription: "Traditional wedding reception at the Ganga ghats. Anand played this record on their first evening.",
        songTitle: "Aap Ki Nazron Ne Samjha",
        artist: "Lata Mangeshkar / Madan Mohan",
        genre: "Romantic Standard",
        tempoBpm: 62,
        audioPreset: "chords",
        photos: [
          {
            id: "pn-2",
            url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
            caption: "Anand & Nirmala wedding ceremony, Varanasi, December 1972"
          }
        ]
      },
      {
        id: "ms-n3",
        year: 1976,
        title: "First Family Road Trip to Shimla",
        memoryDescription: "Driving their Ambassador car along the Kalka-Shimla hills while singing Khayyam songs.",
        songTitle: "Kabhie Kabhie Mere Dil Mein",
        artist: "Mukesh / Khayyam",
        genre: "Poetic Ballad",
        tempoBpm: 64,
        audioPreset: "chords",
        photos: [
          {
            id: "pn-3",
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            caption: "Shimla pine hills family journey, June 1976"
          }
        ]
      },
      {
        id: "ms-n4",
        year: 1985,
        title: "Son Rahul's Childhood Musical Mornings",
        memoryDescription: "Playing Mohammed Rafi records while preparing breakfast in their Delhi quarters.",
        songTitle: "Chaudhvin Ka Chand Ho",
        artist: "Mohammed Rafi / Ravi",
        genre: "Ghazal Classic",
        tempoBpm: 62,
        audioPreset: "chords",
        photos: [
          {
            id: "pn-4",
            url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
            caption: "Courtyard morning with son Rahul, 1985"
          }
        ]
      }
    ],
    medicalReports: [
      {
        id: "rep-n1",
        appointmentDate: "2026-09-15",
        physicianName: "Dr. Alok Verma, MD, DM (Neurology)",
        facility: "All India Institute of Medical Sciences (AIIMS)",
        diagnosis: "Alzheimer's Dementia (Moderate Stage)",
        cognitiveScore: "MMSE 17 / 30",
        mocaScore: "MoCA 13 / 30",
        symptomsObserved: "Severe late-afternoon disorientation, repetitive querying about her childhood Lucknow home.",
        medicationsPrescribed: "Donepezil 10mg morning post-breakfast",
        physicianNotes: "Initiate non-pharmacological acoustic therapy daily at 4:00 PM to intercept sundowning transition. Avoid sedative titration."
      },
      {
        id: "rep-n2",
        appointmentDate: "2026-10-18",
        physicianName: "Dr. Alok Verma, MD, DM",
        facility: "AIIMS Memory Clinic",
        diagnosis: "Alzheimer's Dementia (Middle Stage - Stabilized)",
        cognitiveScore: "MMSE 18 / 30",
        mocaScore: "MoCA 14 / 30",
        symptomsObserved: "Agitation reduced by 75%. Caregiver reports singing lyrics along with Lata Mangeshkar records.",
        medicationsPrescribed: "Donepezil 10mg continued",
        physicianNotes: "Measurable positive behavioral response noted. MMSE score stabilized (+1 point improvement). Continue structured 25-minute evening sessions."
      }
    ],
    caregiverTips: "Singing the opening line of 'Lag Ja Gale' prompts immediate verbal recognition and settles pacing."
  },
  {
    id: "patient-rameshwar",
    name: "Col. Rameshwar Rao (Retd.)",
    initials: "RR",
    age: 79,
    birthYear: 1947,
    stage: "Early stage",
    era: "1961–1969",
    culture: "Classic Hindi Cinema · Patriotic Standards · Ghazals",
    score: "MMSE 22 / 30",
    color: "#607d8b",
    activeMood: "joyful",
    symptoms: [
      "Mild apathy",
      "Morning withdrawal",
      "Short-term memory loss"
    ],
    meds: "Memantine 10mg · 9:00 AM",
    last: "Yesterday",
    consentedAt: "2026-10-08T10:00:00.000Z",
    biography: "Decorated veteran Indian Army Artillery Officer. Stationed across Punjab, J&K, and Pune. Deep connection to classic Mukesh, Kishore Kumar, and Indian military band melodies.",
    familyContact: "Daughter: Major Shreya Rao · +91 98230 44512",
    triggers: [
      "Rushing through morning routine",
      "Disorganized schedule",
      "Loud sudden alarm bells"
    ],
    habits: {
      wakeTime: "06:00 AM",
      sundowningWindow: "5:00 PM – 6:30 PM",
      bedTime: "10:00 PM",
      primaryComfortRoutine: "Listening to Kishore Kumar and Mukesh while walking in the garden"
    },
    milestones: [
      {
        id: "ms-r1",
        year: 1965,
        title: "Commissioning into the Regiment of Artillery",
        memoryDescription: "Passing out parade at Indian Military Academy, Dehradun with his parents in attendance.",
        songTitle: "Ae Mere Pyare Watan",
        artist: "Manna Dey / Salil Chowdhury",
        genre: "Patriotic Classical",
        tempoBpm: 66,
        audioPreset: "chords",
        photos: [
          {
            id: "pr-1",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
            caption: "IMA Dehradun commissioning parade, 1965"
          }
        ]
      }
    ],
    medicalReports: [],
    caregiverTips: "Gentle finger tapping to Kishore Kumar melodies restores conversational alertness."
  },
  {
    id: "patient-ananya",
    name: "Dr. Ananya Mukherjee",
    initials: "AM",
    age: 71,
    birthYear: 1955,
    stage: "Middle stage",
    era: "1969–1977",
    culture: "Rabindra Sangeet · Classic Bengali Standards",
    score: "MMSE 16 / 30",
    color: "#7e57c2",
    activeMood: "calm",
    symptoms: [
      "Anxiety",
      "Sleep disruption"
    ],
    meds: "Rivastigmine 4.6mg patch · Morning",
    last: "Today",
    consentedAt: "2026-10-13T10:00:00.000Z",
    biography: "Former Professor of Medicine at Calcutta Medical College. Passionate about Rabindra Sangeet and classical sarod traditions.",
    familyContact: "Husband: Prof. Debashis Mukherjee · +91 98300 12890",
    triggers: [
      "Bright flashing video screens",
      "Disorientation in evening hallways"
    ],
    habits: {
      wakeTime: "06:30 AM",
      sundowningWindow: "5:00 PM – 7:00 PM",
      bedTime: "10:00 PM",
      primaryComfortRoutine: "Acoustic sitar with warm herbal tea"
    },
    milestones: [
      {
        id: "ms-a1",
        year: 1971,
        title: "Monsoon Evenings at College Street Coffee House",
        memoryDescription: "Listening to acoustic Rabindra Sangeet with medical student colleagues.",
        songTitle: "Ekla Cholo Re",
        artist: "Rabindranath Tagore Classical",
        genre: "Rabindra Sangeet",
        tempoBpm: 60,
        audioPreset: "chords",
        photos: [
          {
            id: "pa-1",
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
            caption: "College Street gathering, Kolkata 1971"
          }
        ]
      }
    ],
    medicalReports: [],
    caregiverTips: "Acoustic sitar and soft tanpura drone creates immediate serenity before dinner."
  }
]

const fallbackTracks = [
  {
    id: "track-1",
    title: "Lag Ja Gale (Embrace)",
    artist: "Lata Mangeshkar / Madan Mohan",
    duration: "3:45",
    seconds: 225,
    era: "1964",
    tag: "Formative Anchor · 1964",
    genre: "Hindi Cinema Classic",
    tempoBpm: 60,
    mood: "Deep Nostalgia",
    audioPreset: "chords",
    memoryContext: "Vividh Bharati radio memory in Lucknow home."
  },
  {
    id: "track-2",
    title: "Aap Ki Nazron Ne Samjha",
    artist: "Lata Mangeshkar / Madan Mohan",
    duration: "3:32",
    seconds: 212,
    era: "1962",
    tag: "Wedding Anchor · 1972",
    genre: "Romantic Standard",
    tempoBpm: 62,
    mood: "Emotional Comfort",
    audioPreset: "chords",
    memoryContext: "Wedding evening celebration on Varanasi ghats."
  },
  {
    id: "track-3",
    title: "Kabhie Kabhie Mere Dil Mein",
    artist: "Mukesh / Khayyam",
    duration: "4:10",
    seconds: 250,
    era: "1976",
    tag: "Family Road Trip · 1976",
    genre: "Poetic Ballad",
    tempoBpm: 64,
    mood: "Serene Recollection",
    audioPreset: "chords",
    memoryContext: "Shimla hills Ambassador road trip with Anand."
  },
  {
    id: "track-4",
    title: "Chaudhvin Ka Chand Ho",
    artist: "Mohammed Rafi / Ravi",
    duration: "3:38",
    seconds: 218,
    era: "1960",
    tag: "Paternal Anchor · 1960",
    genre: "Ghazal Classic",
    tempoBpm: 62,
    mood: "Grounding Warmth",
    audioPreset: "chords",
    memoryContext: "Sunday breakfast radio record with son Rahul."
  },
  {
    id: "track-5",
    title: "Raga Bhairavi Dawn Meditation (432Hz)",
    artist: "Smaran Neural Soundscape · Sitar & Tanpura",
    duration: "4:15",
    seconds: 255,
    era: "Therapeutic Acoustic",
    tag: "Clinical Entrainment · 432Hz",
    genre: "Classical Indian Ambient",
    tempoBpm: 56,
    mood: "Distress Alleviation & Calming",
    audioPreset: "binaural",
    memoryContext: "Reduces autonomic heart rate and stabilizes sundowning agitation."
  },
  {
    id: "track-6",
    title: "Ganga Ghat Serenity & Monsoon Drops",
    artist: "Smaran Acoustic Medicine",
    duration: "4:00",
    seconds: 240,
    era: "Therapeutic Acoustic",
    tag: "Sensory Comfort & Grounding",
    genre: "Natural Acoustic Masking",
    tempoBpm: 50,
    mood: "Rest & Evening Wind-down",
    audioPreset: "rain",
    memoryContext: "Acoustic masking to alleviate sundowning confusion."
  }
]

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
  // Navigation: 'landing' (default) | 'listener' | 'admin'
  const [currentView, setCurrentView] = useState('landing')
  const [user, setUser] = useState(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // Clinical & Patient Data
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

  // Clinical Telemetry
  const [heartRate, setHeartRate] = useState(74)
  const [response, setResponse] = useState(null)
  const [carePlan, setCarePlan] = useState(null)
  const [sessions, setSessions] = useState([])
  const [monthlyReport, setMonthlyReport] = useState(null)

  // Modals & UI
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState('')

  // Form states
  const [note, setNote] = useState('')
  const [newDoctorReport, setNewDoctorReport] = useState({
    appointmentDate: new Date().toISOString().split('T')[0],
    physicianName: 'Dr. Alok Verma, MD, DM (Neurology)',
    facility: 'All India Institute of Medical Sciences (AIIMS)',
    diagnosis: "Alzheimer's Dementia (Moderate Stage)",
    cognitiveScore: 'MMSE 18 / 30',
    mocaScore: 'MoCA 14 / 30',
    symptomsObserved: 'Mild late-afternoon pacing, responsive to familiar vocals.',
    medicationsPrescribed: 'Donepezil 10mg morning post-breakfast',
    physicianNotes: 'Continue 4:00 PM acoustic therapy protocol. Note positive singing engagement.'
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

  // Multi-Sensory Photo Memory state
  const [activeMilestoneForPhoto, setActiveMilestoneForPhoto] = useState(null)
  const [photoUploadUrl, setPhotoUploadUrl] = useState('')
  const [photoUploadCaption, setPhotoUploadCaption] = useState('')

  const patient = patientRecords.find(p => p.id === patientId) || patientRecords[0] || fallbackPatients[0]
  const currentTrack = tracks[trackIndex] || tracks[0]

  const currentMilestone = useMemo(() => {
    if (!currentTrack?.title) return null
    return (patient.milestones || []).find(m =>
      m.songTitle && m.songTitle.toLowerCase().trim() === currentTrack.title.toLowerCase().trim()
    ) || null
  }, [patient.milestones, currentTrack?.title])

  useEffect(() => {
    const unsubscribe = soundEngine.subscribe(state => {
      setAudioState(state)
    })
    return () => unsubscribe()
  }, [])

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

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3500)
    return () => clearTimeout(timer)
  }, [toast])

  const togglePlayAudio = () => {
    if (!audioState.isPlaying && audioState.currentTime === 0) {
      soundEngine.playTrack(currentTrack)
    } else {
      soundEngine.togglePlay()
    }
  }

  const handleTrackSkip = async (direction) => {
    const dwell = audioState.currentTime
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

    const nextIdx = (trackIndex + direction + tracks.length) % tracks.length
    setTrackIndex(nextIdx)
    const nextTrack = tracks[nextIdx]
    soundEngine.playTrack(nextTrack)
    setToast(`Playing: ${nextTrack.title}`)
  }

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

    setToast(`Replaying "${currentTrack.title}" — Memory Anchor Boosted!`)
  }

  const selectTrackDirectly = (idx) => {
    setTrackIndex(idx)
    soundEngine.playTrack(tracks[idx])
    setToast(`Playing: ${tracks[idx].title}`)
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
    setToast(`Playing Memory Anchor: ${ms.songTitle}`)
    setCurrentView('listener')
  }

  const handleMoodSelect = async (moodKey) => {
    try {
      await api(`/api/patients/${patient.id}/mood`, {
        method: 'POST',
        body: JSON.stringify({ mood: moodKey })
      })
      setPatientRecords(prev => prev.map(p => p.id === patient.id ? { ...p, activeMood: moodKey } : p))
      setToast(`Atmosphere set: ${moodKey}`)
      if (moodKey === 'agitated') {
        soundEngine.triggerCalmMode(true)
      } else {
        soundEngine.triggerCalmMode(false)
      }
      const rep = await api(`/api/patients/${patient.id}/repertoire`)
      if (rep?.playlists?.memoryReminiscence) {
        setTracks(rep.playlists.memoryReminiscence)
      }
    } catch (err) {
      setToast(err.message)
    }
  }

  const handlePhotoFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      setPhotoUploadUrl(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAttachPhotoToMilestone = async (e) => {
    e.preventDefault()
    if (!activeMilestoneForPhoto || !photoUploadUrl) return
    try {
      const result = await api(`/api/patients/${patient.id}/milestones/${activeMilestoneForPhoto.id}/photos`, {
        method: 'POST',
        body: JSON.stringify({
          url: photoUploadUrl,
          caption: photoUploadCaption || activeMilestoneForPhoto.title
        })
      })

      setPatientRecords(prev => prev.map(p => {
        if (p.id === patient.id) {
          return {
            ...p,
            milestones: (p.milestones || []).map(m => {
              if (m.id === activeMilestoneForPhoto.id) {
                return {
                  ...m,
                  photos: [...(m.photos || []), result.photo]
                }
              }
              return m
            })
          }
        }
        return p
      }))

      setToast(`Photo attached to "${activeMilestoneForPhoto.title}"!`)
      setModal(null)
      setPhotoUploadUrl('')
      setPhotoUploadCaption('')
      setActiveMilestoneForPhoto(null)
    } catch (err) {
      setToast(err.message)
    }
  }

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
            score: newDoctorReport.cognitiveScore || p.score,
            medicalReports: [savedReport.report, ...(p.medicalReports || [])]
          }
        }
        return p
      }))

      setToast('Doctor appointment report logged!')
      setModal(null)
    } catch (err) {
      setToast(err.message)
    }
  }

  const handleAddMilestone = async (e) => {
    e.preventDefault()
    try {
      const added = await api(`/api/patients/${patient.id}/milestones`, {
        method: 'POST',
        body: JSON.stringify(newMilestone)
      })

      setPatientRecords(prev => prev.map(p => {
        if (p.id === patient.id) {
          return {
            ...p,
            milestones: [added.milestone, ...(p.milestones || [])]
          }
        }
        return p
      }))

      setToast(`Milestone "${newMilestone.title}" added!`)
      setModal(null)
    } catch (err) {
      setToast(err.message)
    }
  }

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault()
    try {
      const created = await api('/api/patients', {
        method: 'POST',
        body: JSON.stringify({
          ...onboardingForm,
          age: Number(onboardingForm.age),
          birthYear: Number(onboardingForm.birthYear)
        })
      })

      setPatientRecords(prev => [created, ...prev])
      setPatientId(created.id)
      setModal(null)
      setToast(`Welcome to Smaran, ${created.name}!`)
    } catch (err) {
      setToast(err.message)
    }
  }

  const runSimulation = (scenario) => {
    if (scenario === 'agitated') {
      setHeartRate(108)
      setResponse('agitated')
      soundEngine.triggerCalmMode(true)
      setToast('Simulated: Agitation Spike / Sundowning')
    } else if (scenario === 'relaxed') {
      setHeartRate(64)
      setResponse('positive')
      soundEngine.triggerCalmMode(false)
      setToast('Simulated: Deep Serenity & Humming')
    } else {
      setHeartRate(74)
      setResponse('neutral')
      soundEngine.triggerCalmMode(false)
      setToast('Simulated: Resting Baseline')
    }
    setModal(null)
  }

  return (
    <div className="smaran-app-root">
      {/* GLOBAL NAVBAR */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => { setUser(null); setToast('Signed out'); }}
        isPlaying={audioState.isPlaying}
        activePatient={patient}
      />

      {/* VIEW 1: BEAUTIFUL CONSUMER LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingPage
          onLaunchListener={() => setCurrentView('listener')}
          onLaunchAdmin={() => setCurrentView('admin')}
          currentTrack={currentTrack}
          isPlaying={audioState.isPlaying}
          onTogglePlay={togglePlayAudio}
          activePatient={patient}
        />
      )}

      {/* VIEW 2: ENGAGING CONSUMER MUSIC LOUNGE (LISTENER MODE) */}
      {currentView === 'listener' && (
        <ListenerPlayer
          patient={patient}
          patientRecords={patientRecords}
          onSelectPatient={setPatientId}
          tracks={tracks}
          trackIndex={trackIndex}
          currentTrack={currentTrack}
          audioState={audioState}
          onTogglePlay={togglePlayAudio}
          onNextTrack={() => handleTrackSkip(1)}
          onPrevTrack={() => handleTrackSkip(-1)}
          onSeek={pct => soundEngine.seek(pct)}
          onVolumeChange={v => soundEngine.setVolume(v)}
          onSelectTrack={selectTrackDirectly}
          onReplay={handleReplaySong}
          onOpenPhotoUpload={() => {
            if (currentMilestone) {
              setActiveMilestoneForPhoto(currentMilestone)
              setModal('attach-photo')
            } else {
              setModal('milestone')
            }
          }}
          onMoodSelect={handleMoodSelect}
          activeMood={patient.activeMood}
          onSwitchToAdmin={() => setCurrentView('admin')}
        />
      )}

      {/* VIEW 3: CLINICAL DOCTOR & CAREGIVER PORTAL (ADMIN MODE) */}
      {currentView === 'admin' && (
        <AdminPortal
          patient={patient}
          patientRecords={patientRecords}
          patientId={patientId}
          setPatientId={setPatientId}
          onOpenModal={setModal}
          monthlyReport={monthlyReport}
          sessions={sessions}
          carePlan={carePlan}
          response={response}
          setResponse={setResponse}
          onMoodSelect={handleMoodSelect}
          onPlayMilestoneSong={playMilestoneSong}
          onSwitchToMusic={() => setCurrentView('listener')}
        />
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={userObj => {
          setUser(userObj)
          setCurrentView(userObj.role === 'admin' ? 'admin' : 'listener')
          setToast(`Signed in as ${userObj.name}`)
        }}
      />

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="toast">
          <ShieldCheck size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* MODAL: ATTACH PHOTO */}
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

            <div className="upload-dropzone" onClick={() => document.getElementById('photoFileInput').click()}>
              <input
                id="photoFileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handlePhotoFileUpload}
              />
              <p>Click or drag to select archival family photograph from device</p>
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

      {/* MODAL: ONBOARD */}
      {modal === 'onboard' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal modal-wide" onSubmit={handleOnboardingSubmit} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">CLINICAL ONBOARDING</span>
            <h2>Onboard New Memory Care Resident</h2>
            <p>Establish baseline cognitive era and formative musical preferences.</p>

            <div className="form-grid">
              <label>
                Full Name
                <input required placeholder="e.g. Nirmala Sharma" value={onboardingForm.name} onChange={e => setOnboardingForm({ ...onboardingForm, name: e.target.value })} />
              </label>
              <label>
                Age & Birth Year
                <input required placeholder="e.g. 74 (Born 1952)" value={onboardingForm.age} onChange={e => setOnboardingForm({ ...onboardingForm, age: e.target.value, birthYear: String(2026 - Number(e.target.value)) })} />
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

            <button className="save-note" type="submit">
              Curate Personalized Reminiscence Vault
            </button>
          </form>
        </div>
      )}

      {/* MODAL: DOCTOR REPORT */}
      {modal === 'doctor-report' && (
        <div className="modal-backdrop" onMouseDown={() => setModal(null)}>
          <form className="modal" onSubmit={handleSubmitDoctorReport} onMouseDown={e => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setModal(null)}>
              <X size={18} />
            </button>
            <span className="eyebrow">DOCTOR APPOINTMENT LOG</span>
            <h2>Upload Neurologist Report</h2>
            <p>Update {patient.name}'s chart following their medical appointment.</p>

            <div className="form-grid">
              <label>
                Appointment Date
                <input type="date" required value={newDoctorReport.appointmentDate} onChange={e => setNewDoctorReport({ ...newDoctorReport, appointmentDate: e.target.value })} />
              </label>
              <label>
                Neurologist Name
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
              Physician Clinical Notes
              <textarea required value={newDoctorReport.physicianNotes} onChange={e => setNewDoctorReport({ ...newDoctorReport, physicianNotes: e.target.value })} />
            </label>

            <button className="save-note" type="submit">
              Save Doctor Report & Update Care Plan
            </button>
          </form>
        </div>
      )}

      {/* MODAL: MILESTONE */}
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
                <input type="number" required placeholder="e.g. 1972" value={newMilestone.year} onChange={e => setNewMilestone({ ...newMilestone, year: e.target.value })} />
              </label>
              <label>
                Milestone Title
                <input required placeholder="e.g. Varanasi Wedding Celebration" value={newMilestone.title} onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })} />
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

            <button className="save-note" type="submit">
              Save Memory Anchor
            </button>
          </form>
        </div>
      )}

      {/* MODAL: SIMULATOR */}
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
    </div>
  )
}
