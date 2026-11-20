import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error('Smaran Application Error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#0e101f',
          color: '#f5f4fb',
          fontFamily: 'system-ui, sans-serif',
          padding: 24,
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: 480, background: '#17192e', padding: 32, borderRadius: 12, border: '1px solid #2b2e4a' }}>
            <h2 style={{ margin: '0 0 12px', color: '#df7b66' }}>Smaran Clinical Platform Notice</h2>
            <p style={{ fontSize: 14, color: '#a5a2b8', lineHeight: 1.5 }}>
              Notice: {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: 16,
                padding: '10px 20px',
                background: '#7e67c8',
                color: '#fff',
                borderRadius: 8,
                border: 0,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reload Smaran Platform
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
