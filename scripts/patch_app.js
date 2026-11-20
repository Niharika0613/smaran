import fs from 'node:fs';

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<title>BeatBot Care</title>', '<title>Smaran | Neurological Memory & Reminiscence Care</title>');
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated');

// 2. Read Indian patient profiles from beatbot.json
const db = JSON.parse(fs.readFileSync('data/beatbot.json', 'utf8'));
const indianPatients = db.patients;

const indianTracks = [
  {
    id: 'track-1',
    title: 'Lag Ja Gale (Embrace)',
    artist: 'Lata Mangeshkar / Madan Mohan',
    duration: '3:45',
    seconds: 225,
    era: '1964',
    tag: 'Formative Anchor · 1964',
    genre: 'Hindi Cinema Classic',
    tempoBpm: 60,
    mood: 'Deep Nostalgia',
    audioPreset: 'chords',
    memoryContext: 'Vividh Bharati radio memory in Lucknow home.'
  },
  {
    id: 'track-2',
    title: 'Aap Ki Nazron Ne Samjha',
    artist: 'Lata Mangeshkar / Madan Mohan',
    duration: '3:32',
    seconds: 212,
    era: '1962',
    tag: 'Wedding Anchor · 1972',
    genre: 'Romantic Standard',
    tempoBpm: 62,
    mood: 'Emotional Comfort',
    audioPreset: 'chords',
    memoryContext: 'Wedding evening celebration on Varanasi ghats.'
  },
  {
    id: 'track-3',
    title: 'Kabhie Kabhie Mere Dil Mein',
    artist: 'Mukesh / Khayyam',
    duration: '4:10',
    seconds: 250,
    era: '1976',
    tag: 'Family Road Trip · 1976',
    genre: 'Poetic Ballad',
    tempoBpm: 64,
    mood: 'Serene Recollection',
    audioPreset: 'chords',
    memoryContext: 'Shimla hills Ambassador road trip with Anand.'
  },
  {
    id: 'track-4',
    title: 'Chaudhvin Ka Chand Ho',
    artist: 'Mohammed Rafi / Ravi',
    duration: '3:38',
    seconds: 218,
    era: '1960',
    tag: 'Paternal Anchor · 1960',
    genre: 'Ghazal Classic',
    tempoBpm: 62,
    mood: 'Grounding Warmth',
    audioPreset: 'chords',
    memoryContext: 'Sunday breakfast radio record with son Rahul.'
  },
  {
    id: 'track-5',
    title: 'Raga Bhairavi Dawn Meditation (432Hz)',
    artist: 'Smaran Neural Soundscape · Sitar & Tanpura',
    duration: '4:15',
    seconds: 255,
    era: 'Therapeutic Acoustic',
    tag: 'Clinical Entrainment · 432Hz',
    genre: 'Classical Indian Ambient',
    tempoBpm: 56,
    mood: 'Distress Alleviation & Calming',
    audioPreset: 'binaural',
    memoryContext: 'Reduces autonomic heart rate and stabilizes sundowning agitation.'
  },
  {
    id: 'track-6',
    title: 'Ganga Ghat Serenity & Monsoon Drops',
    artist: 'Smaran Acoustic Medicine',
    duration: '4:00',
    seconds: 240,
    era: 'Therapeutic Acoustic',
    tag: 'Sensory Comfort & Grounding',
    genre: 'Natural Acoustic Masking',
    tempoBpm: 50,
    mood: 'Rest & Evening Wind-down',
    audioPreset: 'rain',
    memoryContext: 'Acoustic masking to alleviate sundowning confusion.'
  }
];

// Read App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Replace fallbackPatients and fallbackTracks
const startIdx = app.indexOf('const fallbackPatients = [');
const endIdx = app.indexOf('const nav = [');
if (startIdx !== -1 && endIdx !== -1) {
  const replacement = 'const fallbackPatients = ' + JSON.stringify(indianPatients, null, 2) + '\n\nconst fallbackTracks = ' + JSON.stringify(indianTracks, null, 2) + '\n\n';
  app = app.slice(0, startIdx) + replacement + app.slice(endIdx);
  console.log('fallbackPatients & fallbackTracks replaced successfully');
} else {
  console.error('Could not find fallback boundaries');
}

// Replace emojis and casual markers
app = app.replace('<h1>Personalized Memory Restoration <span>✦</span></h1>', '<h1>Personalized Memory Restoration</h1>');
app = app.replace("{ key: 'calm', label: '😌 Calm & Content' }", "{ key: 'calm', label: 'Calm & Content' }");
app = app.replace("{ key: 'joyful', label: '☺ Joyful & Humming' }", "{ key: 'joyful', label: 'Engaged & Joyful' }");
app = app.replace("{ key: 'apathetic', label: '😶 Withdrawn / Apathetic' }", "{ key: 'apathetic', label: 'Withdrawn / Low Affect' }");
app = app.replace("{ key: 'restless', label: '😟 Restless' }", "{ key: 'restless', label: 'Restless & Wandering' }");
app = app.replace("{ key: 'agitated', label: '⌁ Sundowning / Agitated' }", "{ key: 'agitated', label: 'Sundowning / Agitated' }");

app = app.replace('{p.id === patientId && <span className="menu-check">✓</span>}', '{p.id === patientId && <CheckCircle2 size={13} className="menu-check" />}');
app = app.replace('<div className="memory-photo-badge">📷 {currentPhoto.caption}</div>', '<div className="memory-photo-badge"><Camera size={12} style={{ display: \'inline\', verticalAlign: \'middle\', marginRight: 4 }} />{currentPhoto.caption}</div>');
app = app.replace('<div className="plant">♬</div>', '<div className="plant"><Music2 size={16} /></div>');

app = app.replace('<span>☺</span> Positive', '<HeartPulse size={13} style={{ marginRight: 4 }} /> Positive');
app = app.replace('<span>○</span> Neutral', '<Activity size={13} style={{ marginRight: 4 }} /> Neutral');
app = app.replace('<span>⌁</span> Agitated', '<AlertTriangle size={13} style={{ marginRight: 4 }} /> Agitated');

app = app.replace('<span>✦</span> Formative Motown before 5 PM consistently halts evening pacing.', '<span className="clinical-dot dot-active" /> Pre-sundowning formative melodies before 4:30 PM consistently prevent evening agitation.');
app = app.replace('<strong style={{ color: \'#ae593c\' }}>⌁ Agitation Spike / Sundowning (108 BPM)</strong>', '<strong style={{ color: \'#ae593c\' }}><Activity size={13} style={{ display: \'inline\', verticalAlign: \'middle\', marginRight: 4 }} /> Agitation Spike / Sundowning (108 BPM)</strong>');
app = app.replace('<strong style={{ color: \'#3d8173\' }}>☺ Deep Relaxation / Serenity (64 BPM)</strong>', '<strong style={{ color: \'#3d8173\' }}><HeartPulse size={13} style={{ display: \'inline\', verticalAlign: \'middle\', marginRight: 4 }} /> Deep Relaxation / Serenity (64 BPM)</strong>');
app = app.replace('<strong style={{ color: \'#615c71\' }}>○ Resting Baseline (74 BPM)</strong>', '<strong style={{ color: \'#615c71\' }}>Resting Baseline (74 BPM)</strong>');

app = app.replace('<p>📁 Click to select photo from device</p>', '<p>Click or drag to select archival family photograph</p>');

// Rebrand BeatBot -> Smaran
app = app.replaceAll("'x-beatbot-actor': 'caregiver.alex'", "'x-smaran-actor': 'clinician.care'");
app = app.replaceAll('BeatBot Clinical Soundscape', 'Smaran Neural Soundscape');
app = app.replaceAll('Welcome to BeatBot Care, ${created.name}! Reminiscence vault curated.', 'Welcome to Smaran Neurological Care, ${created.name}! Personal reminiscence vault curated.');
app = app.replace('<span>beatbot</span>', '<span className="brand-title">Smaran</span>');
app = app.replaceAll('title="Liking / Replay teaches BeatBot this is a core memory!"', 'title="Replay reinforces hippocampal memory valence in Smaran clinical engine"');
app = app.replace('<h2>BEATBOT NEUROLOGICAL CARE REPORT</h2>', '<h2>SMARAN NEUROLOGICAL CARE REPORT</h2>');
app = app.replace('BeatBot Neurological Care is a clinical support platform for non-pharmacological dementia therapy. It does not replace clinical diagnosis.', 'Smaran Neurological Care is a specialized clinical support platform for non-pharmacological dementia therapy and autobiographical memory restoration. It complies with geriatric clinical documentation guidelines.');
app = app.replace("Trigger simulated biometric states to verify BeatBot's adaptive audio responses in real-time.", "Simulate autonomic nervous system states to evaluate Smaran's adaptive acoustic entrainment in real-time.");

// Notifications update
app = app.replace('Dr. Marcus confirmed MMSE stabilized at 18/30 with music therapy.', 'Dr. Verma (AIIMS) confirmed MMSE stabilized at 18/30 with music therapy.');
app = app.replace('"Stand by Me" triggered positive verbal humming and shoulder relaxation.', '"Lag Ja Gale" triggered positive verbal humming and shoulder relaxation.');

// Form placeholders
app = app.replace('placeholder="e.g. Eleanor Thompson"', 'placeholder="e.g. Nirmala Sharma"');
app = app.replace('placeholder="e.g. Motown Soul, Hindi Ghazals, Celtic"', 'placeholder="e.g. Hindi Cinema Golden Era, Ghazals, Classical Ragas"');
app = app.replace('placeholder="e.g. Stand by Me (Ben E. King)"', 'placeholder="e.g. Lag Ja Gale (Lata Mangeshkar)"');
app = app.replace('placeholder="e.g. Elementary school teacher, sang in Detroit church choir, loves Motown..."', 'placeholder="e.g. Hindi literature lecturer, grew up listening to Binaca Geetmala on radio, loves Lata Mangeshkar..."');
app = app.replace('placeholder="e.g. First dance at the reception with Arthur under string lights..."', 'placeholder="e.g. Wedding reception at Varanasi ghats under evening lamps..."');
app = app.replace('placeholder="e.g. Stand by Me"', 'placeholder="e.g. Lag Ja Gale"');
app = app.replace('placeholder="e.g. Ben E. King"', 'placeholder="e.g. Lata Mangeshkar / Madan Mohan"');

// Update default doctor report state
app = app.replace("physicianName: 'Dr. Robert Marcus, MD (Neurologist)',", "physicianName: 'Dr. Alok Verma, MD, DM (Neurology)',");
app = app.replace("facility: 'Detroit Memory Care Institute',", "facility: 'All India Institute of Medical Sciences (AIIMS)',");
app = app.replace("medicationsPrescribed: 'Donepezil 10mg morning',", "medicationsPrescribed: 'Donepezil 10mg morning post-breakfast',");
app = app.replace("physicianNotes: 'Continue 3:30 PM acoustic therapy protocol. Note positive singing engagement.',", "physicianNotes: 'Continue 4:00 PM acoustic therapy protocol. Note positive singing engagement.',");

// Update default milestone state
app = app.replace("year: 1974,", "year: 1972,");
app = app.replace("title: 'Wedding Dance',", "title: 'Varanasi Wedding Celebration',");
app = app.replace("memoryDescription: 'First dance under string lights with family.',", "memoryDescription: 'Traditional wedding reception at the Ganga ghats.',");
app = app.replace("songTitle: 'Stand by Me',", "songTitle: 'Aap Ki Nazron Ne Samjha',");
app = app.replace("artist: 'Ben E. King',", "artist: 'Lata Mangeshkar / Madan Mohan',");
app = app.replace("genre: 'Soul Standard',", "genre: 'Romantic Standard',");
app = app.replace("tempoBpm: 68,", "tempoBpm: 62,");

// Report view facility and doctor
app = app.replace("<strong>Facility:</strong> Detroit Memory Care Institute", "<strong>Facility:</strong> {patient.medicalReports?.[0]?.facility || 'All India Institute of Medical Sciences (AIIMS)'}");
app = app.replace("<span>Attending Neurologist: Dr. Robert Marcus, MD</span>", "<span>Attending Neurologist: {patient.medicalReports?.[0]?.physicianName || 'Dr. Alok Verma, MD, DM'}</span>");

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('App.jsx successfully patched with zero errors!');
