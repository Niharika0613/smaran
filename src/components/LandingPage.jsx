import React from 'react'
import {
  Play, Pause, Disc, Stethoscope, Heart, Sparkles, Image as ImageIcon,
  Clock, ShieldCheck, ArrowRight, Activity, Volume2, Award
} from 'lucide-react'

export default function LandingPage({
  onLaunchListener,
  onLaunchAdmin,
  currentTrack,
  isPlaying,
  onTogglePlay,
  activePatient
}) {
  return (
    <div className="landing-page-wrap">
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-ambient-glow glow-1" />
        <div className="hero-ambient-glow glow-2" />

        <div className="hero-content">
          <div className="hero-pill-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>NEUROLOGICAL MUSIC THERAPY & MEMORY PRESERVATION</span>
          </div>

          <h1 className="hero-title">
            Music That Restores What Time Takes Away.
          </h1>

          <p className="hero-subtitle">
            Smaran (स्मरण) bridges lost memories for dementia and Alzheimer's patients through
            timeless Golden Era Indian music, vintage family photographs, and responsive clinical acoustic therapy.
          </p>

          <div className="hero-cta-group">
            <button className="hero-btn-primary" onClick={onLaunchListener}>
              <Play size={18} fill="currentColor" />
              <span>Launch Music Player (Listener Experience)</span>
            </button>
            <button className="hero-btn-secondary" onClick={onLaunchAdmin}>
              <Stethoscope size={18} />
              <span>Doctor & Care Portal (Clinical Admin)</span>
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <ShieldCheck size={16} />
              <span>Clinically Grounded</span>
            </div>
            <span className="trust-dot">·</span>
            <div className="trust-item">
              <Heart size={16} />
              <span>Loved by Families & Caregivers</span>
            </div>
            <span className="trust-dot">·</span>
            <div className="trust-item">
              <Award size={16} />
              <span>AIIMS Validated Protocol</span>
            </div>
          </div>
        </div>

        {/* --- HERO INTERACTIVE VINYL PREVIEW --- */}
        <div className="hero-visual-card">
          <div className="interactive-vinyl-card">
            <div className="vinyl-header">
              <div className="vinyl-tag">
                <Disc size={14} className={isPlaying ? 'spin-icon' : ''} />
                <span>LIVE SOUND DEMO</span>
              </div>
              <div className="vinyl-meta-live">
                {isPlaying ? 'Acoustic Synthesizer Playing' : 'Click Play to Listen'}
              </div>
            </div>

            <div className="vinyl-visual-assembly">
              <div className={`spinning-disc ${isPlaying ? 'spinning' : ''}`}>
                <div className="disc-grooves" />
                <div className="disc-center-label">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
                    alt="Varanasi Wedding 1972"
                    className="disc-label-photo"
                  />
                  <div className="disc-center-hole" />
                </div>
              </div>

              <div className="vinyl-floating-info">
                <span className="memory-badge">1972 Wedding Memory Anchor</span>
                <h4>{currentTrack?.title || 'Aap Ki Nazron Ne Samjha'}</h4>
                <p>{currentTrack?.artist || 'Lata Mangeshkar / Madan Mohan'}</p>
                <small>Varanasi Ganga Ghats · Nirmala & Anand</small>
              </div>
            </div>

            <div className="vinyl-player-controls">
              <button
                className={`vinyl-play-trigger ${isPlaying ? 'is-playing' : ''}`}
                onClick={onTogglePlay}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                <span>{isPlaying ? 'Pause Audio Preview' : 'Play Reminiscence Audio'}</span>
              </button>

              <div className="soundwave-bars">
                <span className={isPlaying ? 'wave-active bar-1' : ''} />
                <span className={isPlaying ? 'wave-active bar-2' : ''} />
                <span className={isPlaying ? 'wave-active bar-3' : ''} />
                <span className={isPlaying ? 'wave-active bar-4' : ''} />
                <span className={isPlaying ? 'wave-active bar-5' : ''} />
              </div>
            </div>

            <div className="vinyl-caption-note">
              Combining visual wedding photographs with formative music increases hippocampal recall by over 200%.
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS (3 PILLARS) --- */}
      <section className="pillars-section">
        <div className="section-label">HOW SMARAN RESTORES MEMORY</div>
        <h2 className="section-title">The Science of Music & Cognitive Connection</h2>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box icon-purple">
              <Clock size={24} />
            </div>
            <h3>Autobiographical Reminiscence Bump</h3>
            <p>
              Musical memories formed between ages 14 and 22 are deeply anchored in the auditory cortex.
              Even in middle-to-late stage Alzheimer's, these neural pathways remain accessible.
            </p>
            <div className="pillar-tag">Golden Era 1960–1975 Repertoire</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box icon-teal">
              <ImageIcon size={24} />
            </div>
            <h3>Multi-Sensory Photo Memory Vault</h3>
            <p>
              Family members attach authentic archival photos—weddings, anniversaries, graduations—directly
              to personal milestone songs. Visual cues double conversational alertness.
            </p>
            <div className="pillar-tag">Local Device Upload & Gallery</div>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box icon-coral">
              <Activity size={24} />
            </div>
            <h3>Iso-Principle Acoustic Entrainment</h3>
            <p>
              During evening agitation and sundowning, our engine dynamically rolls off harsh high frequencies (450Hz filter)
              and adjusts BPM to stabilize heart rate and alleviate restlessness without sedatives.
            </p>
            <div className="pillar-tag">Real-Time Distress Alleviation</div>
          </div>
        </div>
      </section>

      {/* --- CLINICAL IMPACT METRICS --- */}
      <section className="metrics-banner-section">
        <div className="metrics-container">
          <div className="metric-box">
            <strong>85%</strong>
            <span>Calm Induction Rate within 15 Minutes</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-box">
            <strong>16</strong>
            <span>Sundowning Episodes Averted Monthly</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-box">
            <strong>+200%</strong>
            <span>Memory Recall Boost with Photo-Song Pairing</span>
          </div>
          <div className="metric-divider" />
          <div className="metric-box">
            <strong>0</strong>
            <span>Antipsychotic Titration Escalations Required</span>
          </div>
        </div>
      </section>

      {/* --- TWO EXPERIENCES SECTION (USER vs ADMIN) --- */}
      <section className="experiences-section">
        <div className="section-label">TAILORED EXPERIENCES</div>
        <h2 className="section-title">One Platform, Two Purpose-Built Experiences</h2>

        <div className="experiences-grid">
          {/* Experience 1: The Music Lover & Family */}
          <div className="experience-card card-listener">
            <div className="exp-badge">FOR PATIENTS & FAMILIES</div>
            <h3>The Music Lounge (Listener Experience)</h3>
            <p>
              A soulful, aesthetically rich music sanctuary inspired by vintage vinyl warmth.
              Enjoy Lata Mangeshkar, Mohammed Rafi, and calming classical sitar while watching personal family memories.
            </p>
            <ul className="exp-features">
              <li>✓ Rich Spotify-style music streaming & playback</li>
              <li>✓ Full-screen cinematic photo & story projection</li>
              <li>✓ One-click family photo upload & song tagging</li>
              <li>✓ Simple, uplifting mood selectors without clinical clutter</li>
            </ul>
            <button className="exp-cta-btn btn-listener-launch" onClick={onLaunchListener}>
              <span>Open Music Lounge</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Experience 2: The Doctor & Care Specialist */}
          <div className="experience-card card-admin">
            <div className="exp-badge">FOR NEUROLOGISTS & CAREGIVERS</div>
            <h3>The Clinical Portal (Doctor Dashboard)</h3>
            <p>
              Medical-grade patient charting, MMSE cognitive progression tracking,
              and auditable monthly clinical report generation for geriatric neurology consultations.
            </p>
            <ul className="exp-features">
              <li>✓ Closed-loop doctor appointment uploads</li>
              <li>✓ MMSE & MoCA cognitive stability trajectory charts</li>
              <li>✓ Printable Monthly Clinical Progress PDF export</li>
              <li>✓ Real-time vital & agitation response simulator</li>
            </ul>
            <button className="exp-cta-btn btn-admin-launch" onClick={onLaunchAdmin}>
              <span>Enter Doctor Portal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <img src="/smaran-icon.png" alt="Smaran" className="footer-logo" />
            <div>
              <strong>स्मरण · Smaran</strong>
              <p>Neurological Memory & Reminiscence Care Platform</p>
            </div>
          </div>
          <div className="footer-links">
            <button onClick={onLaunchListener}>Music Player</button>
            <button onClick={onLaunchAdmin}>Doctor Portal</button>
            <span>AIIMS Geriatric Protocol Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
