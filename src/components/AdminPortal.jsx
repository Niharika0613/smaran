import React, { useState } from 'react'
import {
  LayoutDashboard, Clock3, Stethoscope, Music2, Award, Zap,
  Plus, CalendarDays, ChevronRight, Activity, AlertTriangle, HeartPulse,
  Download, Camera, CheckCircle2, MessageSquarePlus, Search
} from 'lucide-react'

export default function AdminPortal({
  patient,
  patientRecords,
  patientId,
  setPatientId,
  onOpenModal,
  monthlyReport,
  sessions,
  carePlan,
  response,
  setResponse,
  onMoodSelect,
  onPlayMilestoneSong,
  onSwitchToMusic
}) {
  const [adminTab, setAdminTab] = useState('chart') // 'chart' | 'timeline' | 'doctor' | 'sessions' | 'report'

  return (
    <div className="admin-portal-wrap">
      {/* Admin Top Strip */}
      <div className="admin-header-strip">
        <div className="admin-header-info">
          <div className="admin-badge-pip">
            <Stethoscope size={14} />
            <span>NEUROLOGICAL CLINICAL PORTAL</span>
          </div>
          <h2>Clinical Management & Patient Charts</h2>
          <p>Auditable cognitive tracking, doctor appointments, and non-pharmacological care plans</p>
        </div>

        <div className="admin-header-actions">
          <button className="btn-return-music" onClick={onSwitchToMusic}>
            <Music2 size={16} />
            <span>Open Music Lounge (User View)</span>
          </button>
          <button className="btn-admin-action" onClick={() => onOpenModal('onboard')}>
            <Plus size={15} />
            <span>Onboard New Patient</span>
          </button>
        </div>
      </div>

      {/* Patient Selector Strip */}
      <div className="admin-patient-bar">
        <div className="admin-patient-selector">
          <label>SELECT ACTIVE PATIENT:</label>
          <div className="patient-tabs">
            {patientRecords.map(p => (
              <button
                key={p.id}
                className={`patient-pill ${p.id === patientId ? 'active' : ''}`}
                onClick={() => setPatientId(p.id)}
              >
                <div className="p-avatar" style={{ background: p.color || '#7e67c8' }}>
                  {p.initials}
                </div>
                <div className="p-text">
                  <strong>{p.name}</strong>
                  <small>{p.score} · Age {p.age}</small>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="admin-quick-meta">
          <span>Formative Window: <strong>{patient.era}</strong></span>
          <span className="dot-sep">·</span>
          <span>Diagnosis: <strong>{patient.stage}</strong></span>
          <span className="dot-sep">·</span>
          <span>Medication: <strong>{patient.meds}</strong></span>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="admin-subnav">
        {[
          { key: 'chart', label: 'Patient Chart & Vitals', icon: LayoutDashboard },
          { key: 'timeline', label: 'Memory Milestones & Photos', icon: Clock3 },
          { key: 'doctor', label: 'Doctor Appointments & Scores', icon: Stethoscope },
          { key: 'sessions', label: 'Therapy Sessions & Audit', icon: Music2 },
          { key: 'report', label: 'Monthly Neurologist Report', icon: Award }
        ].map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.key}
              className={`subnav-btn ${adminTab === item.key ? 'active' : ''}`}
              onClick={() => setAdminTab(item.key)}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}

        <button
          className="subnav-btn btn-sim"
          onClick={() => onOpenModal('simulator')}
        >
          <Zap size={15} />
          <span>Test Vitals Simulator</span>
        </button>
      </div>

      {/* TAB 1: CHART & VITALS */}
      {adminTab === 'chart' && (
        <div className="admin-chart-view">
          <div className="chart-grid">
            <div className="chart-card">
              <h3>Active Behavioral Observation</h3>
              <p>Log patient responsiveness during acoustic therapy session</p>

              <div className="response-selector-row">
                <button
                  className={`resp-btn ${response === 'positive' ? 'good' : ''}`}
                  onClick={() => setResponse('positive')}
                >
                  <HeartPulse size={16} />
                  <span>Positive & Relaxed</span>
                </button>
                <button
                  className={`resp-btn ${response === 'neutral' ? 'good' : ''}`}
                  onClick={() => setResponse('neutral')}
                >
                  <Activity size={16} />
                  <span>Resting Neutral</span>
                </button>
                <button
                  className={`resp-btn ${response === 'agitated' ? 'caution' : ''}`}
                  onClick={() => onMoodSelect('agitated')}
                >
                  <AlertTriangle size={16} />
                  <span>Agitated / Sundowning</span>
                </button>
              </div>

              <div className="card-actions-row">
                <button className="card-action-link" onClick={() => onOpenModal('note')}>
                  <MessageSquarePlus size={15} />
                  <span>Add Physician Note</span>
                </button>
                <button className="card-action-link" onClick={() => onOpenModal('doctor-report')}>
                  <Stethoscope size={15} />
                  <span>Upload Doctor Appointment Report</span>
                </button>
              </div>
            </div>

            <div className="chart-card">
              <h3>Neurological Care Specification</h3>
              <p>Active Iso-Principle Protocol Parameters</p>

              <div className="protocol-details-list">
                <div className="detail-row">
                  <span>Target Formative Era</span>
                  <strong>{patient.era} (Ages 14–22)</strong>
                </div>
                <div className="detail-row">
                  <span>Cultural Musical Anchor</span>
                  <strong>{patient.culture}</strong>
                </div>
                <div className="detail-row">
                  <span>Sundowning Window</span>
                  <strong>{patient.habits?.sundowningWindow || '4:30 PM – 7:00 PM'}</strong>
                </div>
                <div className="detail-row">
                  <span>Primary Comfort Routine</span>
                  <strong>{patient.habits?.primaryComfortRoutine || 'Low-tempo sitar and warm tea'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MEMORY TIMELINE & PHOTOS */}
      {adminTab === 'timeline' && (
        <div className="admin-timeline-view">
          <div className="view-title-row">
            <div>
              <h3>Autobiographical Memory Timeline</h3>
              <p>Linking personal milestones to formative songs and family photographs</p>
            </div>
            <button className="btn-admin-action" onClick={() => onOpenModal('milestone')}>
              <Plus size={15} />
              <span>Add Life Milestone</span>
            </button>
          </div>

          <div className="milestones-vertical-list">
            {(patient.milestones || []).map(ms => (
              <div key={ms.id} className="timeline-item-card">
                <div className="item-year-pill">{ms.year}</div>
                <div className="item-content">
                  <h4>{ms.title}</h4>
                  <p>{ms.memoryDescription}</p>

                  {/* Attached Photos */}
                  {ms.photos?.length > 0 && (
                    <div className="item-photos-row">
                      {ms.photos.map(p => (
                        <div key={p.id || p.url} className="timeline-photo-thumbnail">
                          <img src={p.url} alt={p.caption} />
                          <span>{p.caption}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="item-song-footer">
                    <Music2 size={16} />
                    <span><strong>{ms.songTitle}</strong> — {ms.artist}</span>
                    <button
                      className="btn-item-play"
                      onClick={() => onPlayMilestoneSong(ms)}
                    >
                      Play Song
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DOCTOR APPOINTMENTS */}
      {adminTab === 'doctor' && (
        <div className="admin-doctor-view">
          <div className="view-title-row">
            <div>
              <h3>Documented Neurologist Reports</h3>
              <p>Post-appointment clinical records tracking cognitive scores and therapeutic adaptations</p>
            </div>
            <button className="btn-admin-action" onClick={() => onOpenModal('doctor-report')}>
              <Plus size={15} />
              <span>Upload Doctor Report</span>
            </button>
          </div>

          <div className="doctor-reports-grid">
            {(patient.medicalReports || []).map(rep => (
              <div key={rep.id} className="doc-report-card">
                <div className="doc-report-top">
                  <div>
                    <strong>{rep.physicianName}</strong>
                    <span>{rep.facility} · {rep.appointmentDate}</span>
                  </div>
                  <span className="score-badge-card">{rep.cognitiveScore}</span>
                </div>
                <div className="doc-report-diagnosis">
                  <strong>Diagnosis:</strong> {rep.diagnosis}
                </div>
                <div className="doc-report-notes">
                  <strong>Physician Clinical Notes:</strong>
                  <p>{rep.physicianNotes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SESSIONS */}
      {adminTab === 'sessions' && (
        <div className="admin-sessions-view">
          <h3>Auditable Therapy Sessions</h3>
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
                </tr>
              </thead>
              <tbody>
                {sessions.map(s => (
                  <tr key={s.id}>
                    <td>{new Date(s.recordedAt || s.startedAt).toLocaleDateString()}</td>
                    <td>{patient.name}</td>
                    <td>{s.goal || 'Reminiscence'}</td>
                    <td>{s.durationMinutes || 20} mins</td>
                    <td style={{ color: '#4ea595', fontWeight: 700 }}>
                      {s.startAgitation || 5} → {s.endAgitation || 2}
                    </td>
                    <td>
                      <span className="status-pill pill-completed">
                        <CheckCircle2 size={12} /> {s.outcome || 'Calm Induction'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: MONTHLY REPORT */}
      {adminTab === 'report' && (
        <div className="admin-report-view">
          <div className="view-title-row">
            <div>
              <h3>Monthly Neurological Care Report</h3>
              <p>Formatted clinical summary for upcoming neurologist appointment</p>
            </div>
            <button className="btn-admin-action" onClick={() => window.print()}>
              <Download size={15} />
              <span>Print / Save PDF for Neurologist</span>
            </button>
          </div>

          <div className="clinical-doc">
            <div className="doc-header">
              <div>
                <h2>SMARAN NEUROLOGICAL CARE REPORT</h2>
                <p style={{ margin: 0, fontSize: 12, color: '#888494' }}>
                  Non-Pharmacological Music Reminiscence Evaluation · Report ID: {monthlyReport?.reportId || 'REP-2026-11'}
                </p>
              </div>
              <div style={{ textAlign: 'right', fontSize: 11, color: '#6b6678' }}>
                <strong>Evaluated:</strong> {new Date().toLocaleDateString()}<br />
                <strong>Facility:</strong> {patient.medicalReports?.[0]?.facility || 'AIIMS Memory Clinic'}
              </div>
            </div>

            <div className="doc-meta-grid">
              <div><strong>Patient Name:</strong> {patient.name}</div>
              <div><strong>Age:</strong> {patient.age} (Born {patient.birthYear || 1952})</div>
              <div><strong>Cognitive Score:</strong> {patient.score}</div>
              <div><strong>Dementia Stage:</strong> {patient.stage}</div>
              <div><strong>Reminiscence Era:</strong> {patient.era}</div>
              <div><strong>Medication:</strong> {patient.meds}</div>
            </div>

            <div className="doc-metric-row">
              <div className="doc-metric-box">
                <strong>{monthlyReport?.calmSuccessRate || 85}%</strong>
                <span>Calm Induction Rate</span>
              </div>
              <div className="doc-metric-box">
                <strong>-{monthlyReport?.avgAgitationDrop || '2.4'} pts</strong>
                <span>Average Agitation Drop</span>
              </div>
              <div className="doc-metric-box">
                <strong>{monthlyReport?.sundowningEpisodesAverted || 16}</strong>
                <span>Sundowning Episodes Averted</span>
              </div>
            </div>

            <div className="doc-section">
              <h4>Cognitive Trajectory & Behavioral Stabilization</h4>
              <p>
                Over the past 90 days, cognitive degradation has plateaued at <strong>{patient.score}</strong>.
                Daily preference-led musical reminiscence before the {patient.habits?.sundowningWindow || 'evening'} sundowning window
                has preserved episodic speech recall and prevented acute behavioral crises without neuroleptic escalation.
              </p>
            </div>

            <div className="doc-section">
              <h4>Core Memory Anchors (Most Effective Stimuli)</h4>
              <ul>
                {(patient.milestones || []).map(m => (
                  <li key={m.id}>
                    <strong>"{m.songTitle}" ({m.artist})</strong> — Evokes memories of {m.title} ({m.year}).
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
