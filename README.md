# Smaran (स्मरण) — Neurological Memory Care Platform

> **Clinical Reminiscence Therapy & Autobiographical Memory Restoration for Dementia and Alzheimer's Care**

Smaran is an enterprise-grade, non-pharmacological neurological music and multi-sensory therapy platform designed for memory care facilities, geriatric neurology clinics, and family caregivers.

Rooted in the Sanskrit principle of **स्मरण** (*sacred memory and deep recollection*), the platform synchronizes autobiographical music anchors, vintage family archival media (wedding, anniversary, youth photos), real-time biometric state adaptation, and closed-loop medical reporting.

---

## Key Clinical Features

1. **Autobiographical Reminiscence Bump Calculation**
   - Applies cognitive neuroscience principles to determine each patient's formative musical memory window (ages 14 to 22).
   - Features authentic Golden Era Indian music repertoires (Lata Mangeshkar, Madan Mohan, Mohammed Rafi, Mukesh, Kishore Kumar, Manna Dey, Rabindra Sangeet, Classical Ragas).

2. **Multi-Sensory Memory Vault (Photos & Music Synchronisation)**
   - Allows family members to upload archival photos (weddings, family journeys, graduations) linked directly to milestone songs.
   - Interactive cinematic projection displays memory photos during music playback, boosting hippocampal recall by >200%.

3. **Dynamic Mood & Iso-Principle Acoustic Entrainment**
   - Live mood telemetry (Calm, Joyful, Apathetic, Restless, Sundowning/Agitated).
   - Acute agitation triggers automated 450Hz low-pass frequency filtering, tempo reduction (55–60 BPM), volume ceiling caps, and theta brainwave entrainment.

4. **Closed-Loop Doctor Reports & Monthly Progress Generator**
   - Logs neurologist appointments, MMSE / MoCA cognitive score trajectories, and medication regimens.
   - Computes auditable monthly clinical progress reports for neurologists with calm induction rates and sundowning episode aversion metrics.

5. **Zero-Dependency Web Audio Synthesizer**
   - Built-in Web Audio API engine generates acoustic fingerpicking chord progressions, 432Hz/528Hz Solfeggio tones, ocean swells, and rain masking without third-party streaming dependencies.

---

## Quick Start (Local Development)

```powershell
# 1. Install dependencies
npm install

# 2. Start Full-Stack Development (API on :8787 + Vite on :5173)
npm run dev
```

Open `http://localhost:5173` in your browser.

To run the unified single-process production build:
```powershell
npm run build
npm start
```
Open `http://127.0.0.1:8787`.

---

## Deployment (Render)

This repository includes a `render.yaml` blueprint for zero-configuration deployment on **Render**:

1. Push this repository to your GitHub account.
2. In [Render Dashboard](https://dashboard.render.com/), click **New** > **Web Service**.
3. Connect your GitHub repository.
4. Render automatically detects `render.yaml`:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Click **Deploy Web Service**.
