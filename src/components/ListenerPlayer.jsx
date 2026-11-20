import React, { useState } from 'react'
import {
  Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2,
  Disc, Sparkles, Heart, Plus, Camera, Music2, Clock, ChevronRight,
  Maximize2, Eye, ShieldCheck
} from 'lucide-react'

export default function ListenerPlayer({
  patient,
  patientRecords,
  onSelectPatient,
  tracks,
  trackIndex,
  currentTrack,
  audioState,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSeek,
  onVolumeChange,
  onSelectTrack,
  onReplay,
  onOpenPhotoUpload,
  onMoodSelect,
  activeMood,
  onSwitchToAdmin
}) {
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  // Find if current track has a milestone and photos
  const currentMilestone = (patient.milestones || []).find(m =>
    m.songTitle && m.songTitle.toLowerCase().trim() === currentTrack?.title?.toLowerCase().trim()
  )
  const currentPhoto = currentMilestone?.photos?.[0] || null

  return (
    <div className="listener-lounge-wrap">
      {/* Top Banner */}
      <div className="listener-top-bar">
        <div className="listener-current-profile">
          <div className="profile-badge-small">
            <span>LISTENING PROFILE</span>
            <strong>{patient.name}</strong>
          </div>
          <span className="profile-era-pill">
            Formative Era: {patient.era} ({patient.culture})
          </span>
        </div>

        <div className="listener-top-actions">
          {/* Change Patient Dropdown */}
          {patientRecords.length > 1 && (
            <select
              className="patient-switch-select"
              value={patient.id}
              onChange={e => onSelectPatient(e.target.value)}
            >
              {patientRecords.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.culture})
                </option>
              ))}
            </select>
          )}

          <button className="btn-switch-admin" onClick={onSwitchToAdmin}>
            <span>Clinical & Doctor View</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Main Music Lounge Grid */}
      <div className="lounge-main-grid">
        {/* Left / Center: The Visual Stage (Photo & Vinyl Disc) */}
        <div className="lounge-stage-card">
          <div className="stage-visual-container">
            {currentPhoto ? (
              <div className="photo-memory-stage">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption}
                  className="stage-main-photo"
                  onClick={() => setSelectedImage(currentPhoto)}
                />
                <div className="photo-stage-overlay">
                  <div className="photo-stage-caption">
                    <Camera size={14} />
                    <span>{currentPhoto.caption}</span>
                  </div>
                  <button
                    className="photo-expand-btn"
                    onClick={() => setSelectedImage(currentPhoto)}
                    title="View Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="vinyl-groove-stage">
                <div className={`turntable-vinyl ${audioState.isPlaying ? 'turntable-spinning' : ''}`}>
                  <div className="vinyl-shine" />
                  <div className="vinyl-center-art">
                    <Music2 size={36} style={{ color: '#fff' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Upload CTA button */}
            <button className="stage-attach-photo-btn" onClick={onOpenPhotoUpload}>
              <Plus size={15} />
              <span>Attach Family Photo for this Song</span>
            </button>
          </div>

          {/* Song Info & Story Context */}
          <div className="stage-song-details">
            <div className="song-title-row">
              <div>
                <span className="song-tag-badge">
                  {currentMilestone ? `Core Memory Anchor (${currentMilestone.year})` : 'Curated Indian Classic'}
                </span>
                <h1 className="song-title-heading">{currentTrack?.title}</h1>
                <p className="song-artist-subheading">
                  {currentTrack?.artist} · {currentTrack?.genre || 'Classic Standard'}
                </p>
              </div>

              <button
                className="btn-replay-heart"
                onClick={onReplay}
                title="Liking & Replaying reinforces this memory anchor in the AI model!"
              >
                <Heart size={18} fill="#df7b66" color="#df7b66" />
                <span>Replay Song</span>
              </button>
            </div>

            {/* Memory Story Card */}
            {currentMilestone && (
              <div className="memory-story-box">
                <Sparkles size={16} className="sparkle-gold" />
                <div>
                  <strong>Personal Life Memory:</strong>
                  <p>{currentMilestone.memoryDescription}</p>
                </div>
              </div>
            )}

            {/* Player Controls */}
            <div className="player-deck">
              {/* Progress Slider */}
              <div className="slider-row">
                <span className="time-code">
                  {formatSeconds(audioState.currentTime || 0)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioState.progress || 0}
                  onChange={e => onSeek(Number(e.target.value))}
                  className="audio-seeker-bar"
                />
                <span className="time-code">
                  {currentTrack?.duration || '3:30'}
                </span>
              </div>

              {/* Main Button Cluster */}
              <div className="deck-buttons-cluster">
                <button className="deck-btn" onClick={onPrevTrack} title="Previous">
                  <SkipBack size={20} />
                </button>

                <button
                  className={`deck-play-btn ${audioState.isPlaying ? 'playing' : ''}`}
                  onClick={onTogglePlay}
                >
                  {audioState.isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                </button>

                <button className="deck-btn" onClick={onNextTrack} title="Next">
                  <SkipForward size={20} />
                </button>

                {/* Volume control */}
                <div className="deck-volume-wrap">
                  <Volume2 size={18} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audioState.volume || 35}
                    onChange={e => onVolumeChange(Number(e.target.value))}
                    className="volume-slider"
                  />
                </div>
              </div>
            </div>

            {/* Mood Atmosphere Selector */}
            <div className="mood-atmosphere-bar">
              <span className="mood-bar-heading">Set Acoustic Atmosphere:</span>
              <div className="mood-pills-row">
                {[
                  { key: 'calm', label: 'Serene & Peaceful' },
                  { key: 'joyful', label: 'Joyful & Uplifting' },
                  { key: 'apathetic', label: 'Gentle Awakening' },
                  { key: 'restless', label: 'Relaxation & Ease' },
                  { key: 'agitated', label: 'Evening Calm Mode' }
                ].map(m => (
                  <button
                    key={m.key}
                    className={`mood-pill-btn ${activeMood === m.key ? 'active' : ''}`}
                    onClick={() => onMoodSelect(m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Up Next Repertoire Queue */}
        <div className="lounge-playlist-panel">
          <div className="playlist-panel-header">
            <div>
              <h3>Reminiscence Playlist</h3>
              <p>Curated for {patient.name.split(' ')[0]}'s memory window</p>
            </div>
            <span className="track-count-pill">{tracks.length} Songs</span>
          </div>

          <div className="playlist-tracks-list">
            {tracks.map((t, idx) => {
              const isCurrent = idx === trackIndex
              return (
                <button
                  key={t.id || t.title}
                  className={`playlist-track-row ${isCurrent ? 'active-track' : ''}`}
                  onClick={() => onSelectTrack(idx)}
                >
                  <div className="track-number-box">
                    {isCurrent && audioState.isPlaying ? (
                      <div className="playing-bars">
                        <span /><span /><span />
                      </div>
                    ) : (
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  <div className="track-meta-block">
                    <strong>{t.title}</strong>
                    <span>{t.artist} · {t.era || 'Golden Era'}</span>
                  </div>

                  <div className="track-right-meta">
                    <span className="track-duration">{t.duration || '3:30'}</span>
                    <Play size={14} className="hover-play-icon" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Memory Milestones Mini-Gallery */}
          <div className="milestones-mini-preview">
            <div className="mini-preview-header">
              <span>Attached Family Moments</span>
              <small>{(patient.milestones || []).length} Milestones</small>
            </div>

            <div className="mini-milestone-pills">
              {(patient.milestones || []).map(ms => (
                <div key={ms.id} className="mini-milestone-tag">
                  <strong>{ms.year}</strong>: {ms.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Photo */}
      {selectedImage && (
        <div className="photo-lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="photo-lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.caption} />
            <p>{selectedImage.caption}</p>
            <button className="btn-close-lightbox" onClick={() => setSelectedImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function formatSeconds(secs) {
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}
