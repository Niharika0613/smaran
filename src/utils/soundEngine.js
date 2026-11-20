/**
 * BeatBot Web Audio Therapy Sound Engine
 * Generates therapeutic, calming acoustic soundscapes & chord progressions
 * using the Web Audio API with zero external dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null
    this.masterGain = null
    this.filterNode = null
    this.isPlaying = false
    this.isCalmMode = false
    this.volume = 0.35 // 0.0 to 1.0
    this.currentPreset = 'chords'
    this.currentTime = 0
    this.duration = 194
    this.timerId = null
    this.subscribers = new Set()
    this.activeNodes = []
    this.customAudio = null
  }

  init() {
    if (this.ctx) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    this.ctx = new AudioContext()

    this.filterNode = this.ctx.createBiquadFilter()
    this.filterNode.type = 'lowpass'
    this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime)
    this.filterNode.Q.setValueAtTime(1, this.ctx.currentTime)

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime)

    this.filterNode.connect(this.masterGain)
    this.masterGain.connect(this.ctx.destination)
  }

  subscribe(callback) {
    this.subscribers.add(callback)
    callback(this.getState())
    return () => this.subscribers.delete(callback)
  }

  notify() {
    const state = this.getState()
    this.subscribers.forEach(cb => {
      try { cb(state) } catch (e) { console.error(e) }
    })
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      isCalmMode: this.isCalmMode,
      volume: Math.round(this.volume * 100),
      currentTime: this.currentTime,
      duration: this.duration,
      progress: this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0,
      preset: this.currentPreset
    }
  }

  setVolume(percent) {
    this.volume = Math.max(0, Math.min(100, percent)) / 100
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime)
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1)
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume
    }
    this.notify()
  }

  seek(progressPercent) {
    this.currentTime = (Math.max(0, Math.min(100, progressPercent)) / 100) * this.duration
    if (this.customAudio) {
      this.customAudio.currentTime = this.currentTime
    }
    this.notify()
  }

  triggerCalmMode(enabled = true) {
    this.isCalmMode = enabled
    if (!this.ctx || !this.filterNode) return

    const now = this.ctx.currentTime
    if (enabled) {
      // Warm, ultra-gentle lowpass to remove harsh frequencies
      this.filterNode.frequency.cancelScheduledValues(now)
      this.filterNode.frequency.linearRampToValueAtTime(450, now + 1.2)
      // Gently soften volume by 20%
      const softVol = Math.max(0.12, this.volume * 0.7)
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.linearRampToValueAtTime(softVol, now + 1.5)
    } else {
      this.filterNode.frequency.cancelScheduledValues(now)
      this.filterNode.frequency.linearRampToValueAtTime(1400, now + 1.0)
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.8)
    }
    this.notify()
  }

  async playTrack(track) {
    this.init()
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume()
    }

    this.stop()
    this.currentPreset = track.audioPreset || 'chords'
    this.duration = track.seconds || 194
    this.currentTime = 0
    this.isPlaying = true

    if (track.audioUrl) {
      this.playCustomUrl(track.audioUrl)
    } else {
      this.startSynthesizer(this.currentPreset)
    }

    this.startTimer()
    this.notify()
  }

  pause() {
    this.isPlaying = false
    this.stopNodes()
    if (this.customAudio) {
      this.customAudio.pause()
    }
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
    this.notify()
  }

  resume() {
    if (!this.isPlaying) {
      this.init()
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      this.isPlaying = true
      if (this.customAudio) {
        this.customAudio.play().catch(() => {})
      } else {
        this.startSynthesizer(this.currentPreset)
      }
      this.startTimer()
      this.notify()
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause()
    } else {
      this.resume()
    }
  }

  stop() {
    this.isPlaying = false
    this.stopNodes()
    if (this.customAudio) {
      this.customAudio.pause()
      this.customAudio = null
    }
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
    this.notify()
  }

  startTimer() {
    if (this.timerId) clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      if (!this.isPlaying) return
      this.currentTime += 1
      if (this.currentTime >= this.duration) {
        this.currentTime = 0 // loop
      }
      this.notify()
    }, 1000)
  }

  stopNodes() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop()
        if (node.disconnect) node.disconnect()
      } catch (e) {
        // ignore already stopped nodes
      }
    })
    this.activeNodes = []
  }

  playCustomUrl(url) {
    this.customAudio = new Audio(url)
    this.customAudio.volume = this.volume
    this.customAudio.currentTime = this.currentTime
    this.customAudio.play().catch(() => {
      // Fallback to synth if external audio fails or blocked
      this.startSynthesizer('chords')
    })
  }

  startSynthesizer(preset) {
    this.stopNodes()
    if (!this.ctx) return

    switch (preset) {
      case 'ocean':
        this.buildOceanWaves()
        break
      case 'rain':
        this.buildGentleRain()
        break
      case 'binaural':
        this.buildBinauralTheta()
        break
      case 'chords':
      default:
        this.buildTherapeuticChords()
        break
    }
  }

  // --- PRESET 1: THERAPEUTIC ACOUSTIC PIANO / HARP CHORDS ---
  buildTherapeuticChords() {
    // Chord frequencies (Hz) for gentle progression:
    // Cmaj7 (C3, E3, G3, B3) -> Am7 (A2, C3, E3, G3) -> Fmaj7 (F2, A2, C3, E3) -> Gadd9 (G2, B2, D3, A3)
    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
      [110.00, 130.81, 164.81, 196.00], // Am7
      [87.31, 110.00, 130.81, 164.81],  // Fmaj7
      [98.00, 123.47, 146.83, 220.00]   // G9
    ]

    let chordIndex = 0
    const playChordStep = () => {
      if (!this.isPlaying || this.currentPreset !== 'chords') return

      const currentNotes = chords[chordIndex]
      chordIndex = (chordIndex + 1) % chords.length

      currentNotes.forEach((freq, noteIdx) => {
        // Stagger notes slightly like gentle fingerpicking
        const delay = noteIdx * 0.18
        const osc = this.ctx.createOscillator()
        const noteGain = this.ctx.createGain()

        // Warm harmonic blend
        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay)

        const startT = this.ctx.currentTime + delay
        noteGain.gain.setValueAtTime(0.0001, startT)
        // Soft attack
        noteGain.gain.linearRampToValueAtTime(0.08, startT + 0.12)
        // Gentle warm decay
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startT + 4.2)

        osc.connect(noteGain)
        noteGain.connect(this.filterNode)

        osc.start(startT)
        osc.stop(startT + 4.5)

        this.activeNodes.push(osc, noteGain)
      })
    }

    playChordStep()
    const loopInterval = setInterval(() => {
      if (!this.isPlaying || this.currentPreset !== 'chords') {
        clearInterval(loopInterval)
        return
      }
      playChordStep()
    }, 3600)

    this.activeNodes.push({ stop: () => clearInterval(loopInterval) })
  }

  // --- PRESET 2: BINAURAL THETA (432Hz + 4Hz BEAT) ---
  buildBinauralTheta() {
    const baseFreq = 432
    const beatFreq = 4 // 4Hz theta wave for deep relaxation

    // Left ear 432Hz
    const oscLeft = this.ctx.createOscillator()
    oscLeft.type = 'sine'
    oscLeft.frequency.setValueAtTime(baseFreq, this.ctx.currentTime)

    // Right ear 436Hz
    const oscRight = this.ctx.createOscillator()
    oscRight.type = 'sine'
    oscRight.frequency.setValueAtTime(baseFreq + beatFreq, this.ctx.currentTime)

    // Gentle sub-harmonic 216Hz for rich grounding warmth
    const subOsc = this.ctx.createOscillator()
    subOsc.type = 'triangle'
    subOsc.frequency.setValueAtTime(baseFreq / 2, this.ctx.currentTime)

    const toneGain = this.ctx.createGain()
    toneGain.gain.setValueAtTime(0.09, this.ctx.currentTime)

    const subGain = this.ctx.createGain()
    subGain.gain.setValueAtTime(0.04, this.ctx.currentTime)

    oscLeft.connect(toneGain)
    oscRight.connect(toneGain)
    subOsc.connect(subGain)

    toneGain.connect(this.filterNode)
    subGain.connect(this.filterNode)

    oscLeft.start()
    oscRight.start()
    subOsc.start()

    this.activeNodes.push(oscLeft, oscRight, subOsc, toneGain, subGain)
  }

  // --- PRESET 3: GENTLE OCEAN WAVES (FILTERED SWELL) ---
  buildOceanWaves() {
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const whiteNoise = this.ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const bandpass = this.ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(320, this.ctx.currentTime)
    bandpass.Q.setValueAtTime(1.8, this.ctx.currentTime)

    // LFO to swell the ocean wave frequency and gain every 7 seconds
    const waveGain = this.ctx.createGain()
    waveGain.gain.setValueAtTime(0.08, this.ctx.currentTime)

    const lfo = this.ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.14, this.ctx.currentTime) // ~7 second wave cycle

    const lfoGain = this.ctx.createGain()
    lfoGain.gain.setValueAtTime(0.05, this.ctx.currentTime)

    lfo.connect(lfoGain)
    lfoGain.connect(waveGain.gain)

    whiteNoise.connect(bandpass)
    bandpass.connect(waveGain)
    waveGain.connect(this.filterNode)

    whiteNoise.start()
    lfo.start()

    this.activeNodes.push(whiteNoise, lfo, bandpass, waveGain, lfoGain)
  }

  // --- PRESET 4: GENTLE SUMMER RAIN ---
  buildGentleRain() {
    const bufferSize = this.ctx.sampleRate * 2
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const rainSource = this.ctx.createBufferSource()
    rainSource.buffer = noiseBuffer
    rainSource.loop = true

    const lowpass = this.ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(800, this.ctx.currentTime)

    const rainGain = this.ctx.createGain()
    rainGain.gain.setValueAtTime(0.07, this.ctx.currentTime)

    rainSource.connect(lowpass)
    lowpass.connect(rainGain)
    rainGain.connect(this.filterNode)

    rainSource.start()
    this.activeNodes.push(rainSource, lowpass, rainGain)
  }
}

export const soundEngine = new SoundEngine()
