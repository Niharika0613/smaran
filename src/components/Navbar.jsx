import React from 'react'
import { Music2, Stethoscope, User, LogOut, Disc, LayoutDashboard, Sparkles } from 'lucide-react'

export default function Navbar({
  currentView,
  setCurrentView,
  user,
  onOpenAuth,
  onLogout,
  isPlaying,
  activePatient
}) {
  return (
    <header className="global-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => setCurrentView('landing')}>
          <img src="/smaran-icon.png" alt="Smaran Emblem" className="navbar-logo" />
          <div className="navbar-brand-text">
            <div className="brand-hindi-wordmark">स्मरण</div>
            <div className="brand-subtext">Smaran <span>· MEMORY CARE</span></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="navbar-links">
          <button
            className={`nav-link ${currentView === 'landing' ? 'active' : ''}`}
            onClick={() => setCurrentView('landing')}
          >
            Overview
          </button>
          <button
            className={`nav-link ${currentView === 'listener' ? 'active' : ''}`}
            onClick={() => setCurrentView('listener')}
          >
            <Disc size={15} className={isPlaying ? 'spin-icon' : ''} />
            <span>Music Lounge</span>
            {isPlaying && <span className="live-indicator-pip" />}
          </button>
          <button
            className={`nav-link ${currentView === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentView('admin')}
          >
            <Stethoscope size={15} />
            <span>Doctor & Care Portal</span>
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="navbar-actions">
          {/* Quick Mode Toggle */}
          {currentView === 'listener' ? (
            <button className="mode-switch-btn btn-admin" onClick={() => setCurrentView('admin')}>
              <Stethoscope size={14} />
              <span>Switch to Clinical Portal</span>
            </button>
          ) : currentView === 'admin' ? (
            <button className="mode-switch-btn btn-music" onClick={() => setCurrentView('listener')}>
              <Disc size={14} />
              <span>Switch to Music Lounge</span>
            </button>
          ) : (
            <div className="landing-quick-nav">
              <button className="quick-btn-music" onClick={() => setCurrentView('listener')}>
                <Disc size={14} />
                <span>Play Music</span>
              </button>
              <button className="quick-btn-admin" onClick={() => setCurrentView('admin')}>
                <Stethoscope size={14} />
                <span>Admin View</span>
              </button>
            </div>
          )}

          {/* User Auth Profile */}
          {user ? (
            <div className="user-profile-menu">
              <div className="user-badge" title={`Signed in as ${user.role}`}>
                <div className="user-avatar-circle">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="user-meta">
                  <strong>{user.name}</strong>
                  <small>{user.role === 'admin' ? 'Neurologist' : 'Family Caregiver'}</small>
                </div>
              </div>
              <button className="logout-btn" onClick={onLogout} title="Sign Out">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button className="btn-signin" onClick={onOpenAuth}>
              <User size={15} />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
