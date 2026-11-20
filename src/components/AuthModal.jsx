import React, { useState } from 'react'
import { X, User, Lock, Mail, Stethoscope, Heart, ArrowRight, ShieldCheck } from 'lucide-react'

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [role, setRole] = useState('listener') // 'listener' | 'admin'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    affiliation: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = formData.name || (role === 'admin' ? 'Dr. Alok Verma' : 'Rahul Sharma')
    const email = formData.email || (role === 'admin' ? 'dr.verma@aiims.edu' : 'rahul.sharma@gmail.com')
    onLogin({ name, email, role })
    onClose()
  }

  const handleQuickDemo = (demoRole) => {
    if (demoRole === 'admin') {
      onLogin({
        name: 'Dr. Alok Verma',
        email: 'dr.verma@aiims.edu',
        role: 'admin',
        facility: 'AIIMS Memory Clinic'
      })
    } else {
      onLogin({
        name: 'Rahul Sharma',
        email: 'rahul.sharma@gmail.com',
        role: 'listener',
        patient: 'Nirmala Sharma'
      })
    }
    onClose()
  }

  return (
    <div className="auth-modal-backdrop" onMouseDown={onClose}>
      <div className="auth-modal-card" onMouseDown={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="auth-header">
          <div className="auth-logo-row">
            <img src="/smaran-icon.png" alt="Smaran" className="auth-logo-img" />
            <div className="brand-hindi-wordmark">स्मरण</div>
          </div>
          <h2>{mode === 'login' ? 'Welcome Back to Smaran' : 'Create Smaran Account'}</h2>
          <p>
            {mode === 'login'
              ? 'Access personalized musical memory vaults and neurological care records.'
              : 'Begin reconnecting memories through personalized musical reminiscence.'}
          </p>
        </div>

        {/* Quick Demo Shortcuts */}
        <div className="demo-shortcuts">
          <div className="demo-shortcuts-label">1-CLICK DEMO ACCESS:</div>
          <div className="demo-btn-grid">
            <button
              type="button"
              className="demo-btn demo-btn-listener"
              onClick={() => handleQuickDemo('listener')}
            >
              <Heart size={14} />
              <span>Listener / Family Demo</span>
            </button>
            <button
              type="button"
              className="demo-btn demo-btn-doctor"
              onClick={() => handleQuickDemo('admin')}
            >
              <Stethoscope size={14} />
              <span>Doctor / Neurologist Demo</span>
            </button>
          </div>
        </div>

        <div className="auth-divider">
          <span>OR SIGN IN WITH EMAIL</span>
        </div>

        {/* Role Toggle */}
        <div className="role-selector-pills">
          <button
            type="button"
            className={`role-pill ${role === 'listener' ? 'active' : ''}`}
            onClick={() => setRole('listener')}
          >
            <Heart size={14} />
            <span>Family / Listener</span>
          </button>
          <button
            type="button"
            className={`role-pill ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            <Stethoscope size={14} />
            <span>Doctor / Specialist</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <User size={16} />
                <input
                  required
                  placeholder={role === 'admin' ? 'Dr. Alok Verma' : 'Rahul Sharma'}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrap">
              <Mail size={16} />
              <input
                type="email"
                required
                placeholder={role === 'admin' ? 'dr.verma@aiims.edu' : 'rahul@gmail.com'}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <Lock size={16} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {mode === 'register' && role === 'admin' && (
            <div className="form-group">
              <label>Medical Center / Hospital</label>
              <input
                placeholder="e.g. AIIMS New Delhi / Max Healthcare"
                value={formData.affiliation}
                onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
              />
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer-toggle">
          {mode === 'login' ? (
            <p>
              New to Smaran?{' '}
              <button type="button" onClick={() => setMode('register')}>
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already registered?{' '}
              <button type="button" onClick={() => setMode('login')}>
                Sign in
              </button>
            </p>
          )}
        </div>

        <div className="auth-security-note">
          <ShieldCheck size={13} />
          <span>Compliant with geriatric medical confidentiality standards.</span>
        </div>
      </div>
    </div>
  )
}
