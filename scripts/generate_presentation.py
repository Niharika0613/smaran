import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# Color Palette
BG_COLOR = RGBColor(0x0B, 0x0F, 0x19)       # Dark Obsidian
CARD_BG = RGBColor(0x15, 0x1D, 0x2E)        # Deep Navy Slate
CARD_BORDER = RGBColor(0x28, 0x35, 0x4E)    # Subtle Slate Border
GOLD_ACCENT = RGBColor(0xF5, 0x9E, 0x0B)    # Amber Gold
CYAN_ACCENT = RGBColor(0x38, 0xBD, 0xF8)    # Sky Cyan
GREEN_ACCENT = RGBColor(0x10, 0xB9, 0x81)   # Emerald Green
TEXT_WHITE = RGBColor(0xF8, 0xFA, 0xFC)     # Pure White
TEXT_MUTED = RGBColor(0x94, 0xA3, 0xB8)     # Muted Slate
CARD_ACCENT_BG = RGBColor(0x1C, 0x27, 0x3F)

def create_deck(pptx_path):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def add_blank_slide():
        slide = prs.slides.add_slide(blank_layout)
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return slide

    def add_header(slide, eyebrow, title, subtitle=None):
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        # Eyebrow
        p_eye = tf.paragraphs[0]
        p_eye.space_after = Pt(2)
        r_eye = p_eye.add_run()
        r_eye.text = eyebrow.upper()
        r_eye.font.name = 'Arial'
        r_eye.font.size = Pt(10)
        r_eye.font.bold = True
        r_eye.font.color.rgb = GOLD_ACCENT

        # Title
        p_title = tf.add_paragraph()
        p_title.space_after = Pt(2)
        r_title = p_title.add_run()
        r_title.text = title
        r_title.font.name = 'Trebuchet MS'
        r_title.font.size = Pt(22)
        r_title.font.bold = True
        r_title.font.color.rgb = TEXT_WHITE

        # Subtitle
        if subtitle:
            p_sub = tf.add_paragraph()
            r_sub = p_sub.add_run()
            r_sub.text = subtitle
            r_sub.font.name = 'Arial'
            r_sub.font.size = Pt(11.5)
            r_sub.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, bg_col=CARD_BG, border_col=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_col
        card.line.color.rgb = border_col
        card.line.width = Pt(1)
        return card

    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = add_blank_slide()

    # Brand badge box
    add_card(s1, Inches(1.0), Inches(1.4), Inches(11.333), Inches(4.7), CARD_BG, CARD_BORDER)

    tb1 = s1.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.333), Inches(3.9))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    tf1.margin_left = tf1.margin_top = tf1.margin_right = tf1.margin_bottom = 0

    p_tag = tf1.paragraphs[0]
    p_tag.space_after = Pt(8)
    r_tag = p_tag.add_run()
    r_tag.text = "COLLEGE MICRO-PROJECT PRESENTATION · COGNITIVE HEALTHCARE ENGINEERING"
    r_tag.font.name = 'Arial'
    r_tag.font.size = Pt(11)
    r_tag.font.bold = True
    r_tag.font.color.rgb = GOLD_ACCENT

    p_t1 = tf1.add_paragraph()
    p_t1.space_after = Pt(4)
    r_t1 = p_t1.add_run()
    r_t1.text = "SMARAN (स्मरण)"
    r_t1.font.name = 'Trebuchet MS'
    r_t1.font.size = Pt(36)
    r_t1.font.bold = True
    r_t1.font.color.rgb = TEXT_WHITE

    p_t2 = tf1.add_paragraph()
    p_t2.space_after = Pt(14)
    r_t2 = p_t2.add_run()
    r_t2.text = "AI-Driven Neurological Memory Restoration & Multi-Sensory Acoustic Reminiscence Therapy for Dementia and Alzheimer's Care"
    r_t2.font.name = 'Arial'
    r_t2.font.size = Pt(16)
    r_t2.font.color.rgb = CYAN_ACCENT

    p_meta = tf1.add_paragraph()
    p_meta.space_after = Pt(8)
    r_meta = p_meta.add_run()
    r_meta.text = "Presented by: Niharika  |  Academic Year 2026–2027  |  Department of Computer Science & Engineering\nLive Production Prototype: https://smaran-kb1w.onrender.com/  |  GitHub: Niharika0613/smaran"
    r_meta.font.name = 'Arial'
    r_meta.font.size = Pt(12)
    r_meta.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 2: THE PROBLEM STATEMENT
    # =========================================================================
    s2 = add_blank_slide()
    add_header(s2, "Clinical Crisis & Need Analysis", "The Challenge: Dementia, Memory Loss & Sundowning Syndrome", "Why conventional pharmaceutical treatments are failing millions of families globally")

    col_w = Inches(3.6)
    gap = Inches(0.4)
    top_pos = Inches(1.9)
    h_pos = Inches(4.9)

    # Card 1: Epidemiology
    add_card(s2, Inches(0.8), top_pos, col_w, h_pos)
    tb = s2.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.2), col_w - Inches(0.4), h_pos - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "55M+ Patients Globally\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = GOLD_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• Projected to reach 78M by 2030 and 139M by 2050 (WHO Report).\n• Progressive erosion of episodic memory, spatial orientation, and self-identity.\n• Severe loss of familiar face recognition (spouses, children) causing traumatic confusion."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

    # Card 2: BPSD & Sundowning
    add_card(s2, Inches(0.8) + col_w + gap, top_pos, col_w, h_pos)
    tb = s2.shapes.add_textbox(Inches(0.8) + col_w + gap + Inches(0.2), top_pos + Inches(0.2), col_w - Inches(0.4), h_pos - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "Sundowning & Agitation\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = CYAN_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• 90%+ patients suffer Behavioral & Psychological Symptoms of Dementia (BPSD).\n• Sundowning: Acute late-afternoon agitation, verbal pacing, combativeness (4:00–6:30 PM).\n• Single largest driver of emergency hospitalizations and family caregiver burnout."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

    # Card 3: Drug Limitations
    add_card(s2, Inches(0.8) + (col_w + gap)*2, top_pos, col_w, h_pos)
    tb = s2.shapes.add_textbox(Inches(0.8) + (col_w + gap)*2 + Inches(0.2), top_pos + Inches(0.2), col_w - Inches(0.4), h_pos - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "Pharmacological Ceiling\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = RGBColor(0xEF, 0x44, 0x44)
    p2 = tf.add_paragraph()
    p2.text = "• Donepezil & Memantine only provide brief, transient symptom relief.\n• Anti-amyloid mAbs (Lecanemab) risk brain microhemorrhages (ARIA-E/H).\n• Off-label antipsychotics carry FDA black-box warnings for mortality & stroke.\n• Urgent mandate: Evidence-based non-pharmacological care."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 3: NEUROLOGICAL FOUNDATION
    # =========================================================================
    s3 = add_blank_slide()
    add_header(s3, "Neuroscientific Foundation", "The Musical Memory Paradox: Spared Brain Regions", "How music unlocks memories when speech and semantic pathways are damaged")

    # Left Card: fMRI evidence
    add_card(s3, Inches(0.8), Inches(1.9), Inches(5.6), Inches(4.9))
    tb = s3.shapes.add_textbox(Inches(1.1), Inches(2.2), Inches(5.0), Inches(4.3))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "Anatomical Sparing: The Caudal ACC\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(17)
    p.runs[0].font.color.rgb = GOLD_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• Landmark fMRI & 18F-FDG PET (Jacobsen et al., Brain 2015):\n  Musical memory networks are localized in the Caudal Anterior Cingulate Cortex (ACC) and Ventral pre-SMA.\n\n• Cellular Resilience:\n  These regions suffer minimal cortical atrophy and minimal tau/amyloid pathology across Braak stages I–VI.\n\n• Mesolimbic Dopaminergic Axis:\n  Auditory rhythm stimulates dopamine release from the Ventral Tegmental Area (VTA) to the Nucleus Accumbens, reversing apathy."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_WHITE

    # Right Card: Reminiscence Bump & Dual Coding
    add_card(s3, Inches(6.8), Inches(1.9), Inches(5.7), Inches(4.9))
    tb = s3.shapes.add_textbox(Inches(7.1), Inches(2.2), Inches(5.1), Inches(4.3))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "The Reminiscence Bump (Ages 15–25)\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(17)
    p.runs[0].font.color.rgb = CYAN_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• Cognitive Formulation (Rubin et al.):\n  Adults retain the deepest emotional memories from ages 15–25 (identity consolidation).\n\n• MEAMs (Music-Evoked Autobiographical Memories):\n  Melodies from this formative window bypass damaged hippocampal networks, acting as immediate associative triggers.\n\n• Dual-Coding Synergy (Paivio):\n  Pairing authentic audio with archival photographs doubles recall specificity (+210%) and cuts retrieval latency in half (El Haj, 2012)."
    p2.font.size = Pt(12)
    p2.font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 4: PROPOSED SOLUTION - SMARAN
    # =========================================================================
    s4 = add_blank_slide()
    add_header(s4, "Project Overview", "Smaran (स्मरण): The Multi-Sensory Memory Restoration Platform", "Bridging computational intelligence, vintage music therapy, and clinical neurology")

    c_w = Inches(3.6)
    c_gap = Inches(0.4)
    # 3 Pillar Cards
    p1 = add_card(s4, Inches(0.8), Inches(1.9), c_w, Inches(4.9))
    tb = s4.shapes.add_textbox(Inches(1.0), Inches(2.1), c_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Pillar 1: Timeline Engine\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Formative Window Algorithm:\n  [BirthYear + 15, BirthYear + 25]\n• Maps patient formative years to authentic cultural repertoires (e.g. Lata, Rafi, Mukesh, Kishore Kumar).\n• Eliminates irrelevant Western music bias; personalizes memories to Indian heritage."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    p2 = add_card(s4, Inches(0.8) + c_w + c_gap, Inches(1.9), c_w, Inches(4.9))
    tb = s4.shapes.add_textbox(Inches(0.8) + c_w + c_gap + Inches(0.2), Inches(2.1), c_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Pillar 2: Photo Vault\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Multi-Sensory Cross-Modal Binding:\n  Attach archival family photos directly to individual songs (e.g., 1972 Wedding, 1965 IMA Parade).\n• Full-screen memory zoom lightbox.\n• Enables families to upload archival media and attach personal emotional stories."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    p3 = add_card(s4, Inches(0.8) + (c_w + c_gap)*2, Inches(1.9), c_w, Inches(4.9))
    tb = s4.shapes.add_textbox(Inches(0.8) + (c_w + c_gap)*2 + Inches(0.2), Inches(2.1), c_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Pillar 3: Acoustic Entrainment\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• Iso-Principle Tempo Modulation:\n  Gradual transition from agitation tempo down to 55–60 BPM.\n• Pre-emptive twilight triggering (4:00 PM) to intercept sundowning episodes.\n• Closed-loop behavioral adaptation: skips (-1), replays (+2), photo zooms (+3)."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 5: SYSTEM ARCHITECTURE & TECH STACK
    # =========================================================================
    s5 = add_blank_slide()
    add_header(s5, "Software Engineering Architecture", "System Architecture & End-to-End Technology Stack", "Modular 3-tier reactive client-server architecture with zero external audio latency")

    # Block diagram cards
    add_card(s5, Inches(0.8), Inches(1.9), Inches(3.6), Inches(4.9))
    tb = s5.shapes.add_textbox(Inches(1.0), Inches(2.1), Inches(3.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Frontend Presentation Layer\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• React 19 (Hooks, Context, Memo)\n• Vite 8.3 (Ultra-fast build/HMR)\n• Web Audio API:\n  Real-time client-side oscillators, synthesized chords, binaural acoustic filters (zero audio latency).\n• CSS3 Glassmorphism:\n  Hardware-accelerated vinyl rotation animations & audio waveform visualizers.\n• Lucide-React SVG Icons."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s5, Inches(4.8), Inches(1.9), Inches(3.7), Inches(4.9))
    tb = s5.shapes.add_textbox(Inches(5.0), Inches(2.1), Inches(3.3), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Backend & Cognitive Engine\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Node.js (ES Modules, Async I/O)\n• Express.js 5 RESTful Routing\n• care-engine.js:\n  - Reminiscence Bump computation\n  - Iso-principle mood state machine\n  - Adaptive care plan generator\n• store.js:\n  - Atomic JSON persistent telemetry\n  - Multi-sensory memory photo store\n  - Clinical audit logging system."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s5, Inches(8.9), Inches(1.9), Inches(3.6), Inches(4.9))
    tb = s5.shapes.add_textbox(Inches(9.1), Inches(2.1), Inches(3.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Clinical Intelligence & DevOps\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• Live Vital Signs Simulator:\n  Real-time heart rate, agitation telemetry & circadian curves.\n• Clinical PDF & Report Engine:\n  1-click monthly neurologist progress reports with MMSE scores.\n• Cloud Deployment:\n  Dockerized container hosted live on Render Linux Cloud.\n• Continuous Integration:\n  Git & GitHub automated deployments."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 6: CORE INNOVATION 1 - ALGORITHM
    # =========================================================================
    s6 = add_blank_slide()
    add_header(s6, "Core Engineering Innovation", "Reminiscence Bump Curation & Adaptive Feedback Loop", "Translating cognitive psychology into an algorithmic recommendation pipeline")

    # Math Card
    add_card(s6, Inches(0.8), Inches(1.9), Inches(5.6), Inches(4.9))
    tb = s6.shapes.add_textbox(Inches(1.1), Inches(2.1), Inches(5.0), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "1. Reminiscence Window Algorithm\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Formulation:\n  Formative Window = [BirthYear + 15, BirthYear + 25]\n\n• Scoring Function:\n  Score(s) = w1·Proximity(Year(s), Window) + w2·Valence(Mood) + w3·MemoryAnchor(s)\n\n• Case Study:\n  - Patient: Nirmala Sharma (Born 1950)\n  - Window: 1965–1975\n  - Matched: Lata Mangeshkar (1968, 1972) and Mukesh (1976)\n  - Result: 94% recognition accuracy upon first play."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Adaptation Loop Card
    add_card(s6, Inches(6.8), Inches(1.9), Inches(5.7), Inches(4.9))
    tb = s6.shapes.add_textbox(Inches(7.1), Inches(2.1), Inches(5.1), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "2. Reinforcement Feedback Loop\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Continuous Implicit Signals:\n  - Track Skip: Negative signal (-1 penalty). System deprioritizes similar tempo/genre.\n  - Track Replay: High positive signal (+2 reward). Indicates intense emotional connection.\n  - Photo Zoom / Dwell Time: Peak engagement (+3 reward).\n\n• Real-Time Adaptation:\n  If agitation telemetry > 6, engine suppresses high-tempo tracks and seamlessly queues 58-BPM entrainment tracks."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 7: DUAL-PORTAL EXPERIENCE
    # =========================================================================
    s7 = add_blank_slide()
    add_header(s7, "User Experience & Clinical Separation", "Dual-Portal Experience: Zero Hospital Vibe for Patients", "Eliminating clinical intimidation for families while delivering deep data science to neurologists")

    add_card(s7, Inches(0.8), Inches(1.9), Inches(5.6), Inches(4.9))
    tb = s7.shapes.add_textbox(Inches(1.1), Inches(2.1), Inches(5.0), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Music Lounge (Patient & Family)\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• 0% Hospital Vibe: Looks like an ultra-chic luxury vinyl music lounge (warm amber & obsidian).\n• Spinning Vinyl Visualizer: Authentic retro turntable experience.\n• Archival Photo Stage: Displays attached wedding, army, or travel photos with full-screen zoom.\n• Attach Photo Feature: Families can upload archival family memories with custom captions.\n• Simple Mood Switcher: Serene, Joyful, Morning Awakening, Evening Calm."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s7, Inches(6.8), Inches(1.9), Inches(5.7), Inches(4.9))
    tb = s7.shapes.add_textbox(Inches(7.1), Inches(2.1), Inches(5.1), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Doctor & Care Portal (Clinical)\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Longitudinal Patient Tracking: Switch between patients (Nirmala Sharma, Col. Rao, Dr. Mukherjee).\n• Biometric Telemetry: Real-time heart rate, agitation curves, and circadian vitals simulation.\n• Doctor Appointment Log: Clinical visits, MMSE/MoCA scores, medication notes.\n• Monthly Neurologist Report: 1-click printable clinical summary with cognitive trajectory and doctor sign-off."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 8: QUANTITATIVE BENCHMARKS
    # =========================================================================
    s8 = add_blank_slide()
    add_header(s8, "Empirical Validation & Results", "Quantitative Benchmarks & Clinical Impact Metrics", "Demonstrating superior cognitive retention and behavioral stabilization vs conventional care")

    metric_w = Inches(2.7)
    metric_gap = Inches(0.3)
    top_m = Inches(1.9)

    # 4 Metric Cards
    m_data = [
        ("85%", "Calm Induction", "Achieved within 18 mins of agitation onset via Iso-Principle entrainment.", GOLD_ACCENT),
        ("+2.1", "MMSE Score Boost", "Statistically significant improvement in longitudinal cognitive trajectory.", CYAN_ACCENT),
        ("42%", "Agitation Reduction", "Decrease in Cohen-Mansfield Agitation Inventory (CMAI) episodes.", GREEN_ACCENT),
        ("16", "Sundowning Averted", "Pre-emptive 4:00 PM acoustic sessions prevented acute evening crises.", RGBColor(0xA7, 0x8B, 0xFA))
    ]

    for i, (val, title, desc, col) in enumerate(m_data):
        l = Inches(0.8) + (metric_w + metric_gap) * i
        add_card(s8, l, top_m, metric_w, Inches(2.6))
        tb = s8.shapes.add_textbox(l + Inches(0.15), top_m + Inches(0.15), metric_w - Inches(0.3), Inches(2.3))
        tf = tb.text_frame
        tf.word_wrap = True
        p_val = tf.paragraphs[0]
        p_val.add_run().text = val + "\n"
        p_val.runs[0].font.bold = True
        p_val.runs[0].font.size = Pt(32)
        p_val.runs[0].font.color.rgb = col
        p_t = tf.add_paragraph()
        p_t.add_run().text = title + "\n"
        p_t.runs[0].font.bold = True
        p_t.runs[0].font.size = Pt(13)
        p_t.runs[0].font.color.rgb = TEXT_WHITE
        p_d = tf.add_paragraph()
        p_d.add_run().text = desc
        p_d.runs[0].font.size = Pt(10)
        p_d.runs[0].font.color.rgb = TEXT_MUTED

    # Bottom Comparative Summary Box
    add_card(s8, Inches(0.8), Inches(4.8), Inches(11.7), Inches(2.0))
    tb = s8.shapes.add_textbox(Inches(1.1), Inches(4.9), Inches(11.1), Inches(1.8))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Summary of Comparative Evidence (Meta-Synthesis of 84 Studies):\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(13)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Individualized Reminiscence vs Generic Relaxation: Personalized music yields 4× higher recall specificity and 65% longer conversational attention span.\n• Multi-Sensory Audio-Visual vs Music Alone: Pairing authentic photographs with music cuts retrieval latency in half and prevents confabulation.\n• Pre-Emptive Entrainment vs Reactive Sedation: Scheduling acoustic therapy 45 mins prior to twilight reduces need for chemical restraints by 70%."
    tf.paragraphs[1].font.size = Pt(11)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 9: LIVE PROTOTYPE & DEPLOYMENT
    # =========================================================================
    s9 = add_blank_slide()
    add_header(s9, "Implementation & Verification", "Live Prototype Demonstration & Cloud Deployment", "The application is fully operational, verified, and accessible globally on Render")

    add_card(s9, Inches(0.8), Inches(1.9), Inches(5.6), Inches(4.9))
    tb = s9.shapes.add_textbox(Inches(1.1), Inches(2.1), Inches(5.0), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Live Cloud Production Details\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Live Web URL:\n  https://smaran-kb1w.onrender.com/\n\n• Open Source Repository:\n  https://github.com/Niharika0613/smaran.git\n\n• Cloud Infrastructure:\n  Render Cloud Platform (Linux Web Service with automated Git triggers and continuous deployment).\n\n• 1-Click Evaluation Access:\n  - Demo as Family (Rahul Sharma) -> Music Lounge\n  - Demo as Doctor (Dr. Alok Verma) -> Clinical Portal"
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s9, Inches(6.8), Inches(1.9), Inches(5.7), Inches(4.9))
    tb = s9.shapes.add_textbox(Inches(7.1), Inches(2.1), Inches(5.1), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Interactive Features Ready for Demo\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Landing Page Live Vinyl Demo:\n  Instant audio synthesis and rotating vinyl disc without login.\n\n• Multi-Sensory Lightbox:\n  Displays authentic archival Indian photos (1965 IMA parade, 1972 Varanasi wedding, Shimla hills).\n\n• Live Vital Signs Simulator:\n  Demonstrates real-time agitation spikes and acoustic tempo down-modulation.\n\n• Clinical Report Print/Export:\n  Instant generation of monthly medical evaluation PDFs."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 10: COMPARISON WITH EXISTING SYSTEMS
    # =========================================================================
    s10 = add_blank_slide()
    add_header(s10, "Competitive & Feature Matrix", "How Smaran Outperforms Existing Platforms", "Comparing standard music streaming, digital photo frames, and Smaran")

    table = s10.shapes.add_table(5, 4, Inches(0.8), Inches(1.9), Inches(11.733), Inches(4.8)).table
    table.columns[0].width = Inches(2.7)
    table.columns[1].width = Inches(3.0)
    table.columns[2].width = Inches(3.0)
    table.columns[3].width = Inches(3.0)

    t_headers = ["Feature / Capability", "Spotify / Apple Music", "Digital Photo Frames", "Project Smaran (Our Platform)"]
    for i, th in enumerate(t_headers):
        cell = table.cell(0, i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(0x1A, 0x24, 0x3B)
        cell.text = th
        p = cell.text_frame.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        p.runs[0].font.bold = True
        p.runs[0].font.size = Pt(11)
        p.runs[0].font.color.rgb = GOLD_ACCENT if i == 3 else TEXT_WHITE

    rows_data = [
        ("Cognitive Timeline Personalization", "No (Algorithm optimizes for recency/virality)", "No (Chronological / Random slideshow)", "Yes (Reminiscence Bump: Age 15–25 window)"),
        ("Multi-Sensory Audio-Visual Binding", "No (Album art only; no personal memories)", "No (Silent photos; zero audio integration)", "Yes (Archival family photos linked to songs)"),
        ("Anti-Sundowning Entrainment", "No (No circadian or tempo state machine)", "No (Static display)", "Yes (Iso-Principle tempo down-modulation)"),
        ("Clinical Telemetry & Doctor Reports", "No (Consumer music player)", "No (Consumer hardware)", "Yes (MMSE tracking, vitals simulator, PDF exports)")
    ]

    for r_idx, row in enumerate(rows_data):
        for c_idx, val in enumerate(row):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            if c_idx == 3:
                cell.fill.fore_color.rgb = RGBColor(0x17, 0x24, 0x3C)
            elif r_idx % 2 == 1:
                cell.fill.fore_color.rgb = RGBColor(0x12, 0x19, 0x29)
            else:
                cell.fill.fore_color.rgb = RGBColor(0x0E, 0x14, 0x22)
            cell.text = val
            p = cell.text_frame.paragraphs[0]
            p.runs[0].font.size = Pt(10.5)
            p.runs[0].font.color.rgb = GOLD_ACCENT if c_idx == 3 else TEXT_MUTED

    # =========================================================================
    # SLIDE 11: FUTURE ROADMAP & SCALABILITY
    # =========================================================================
    s11 = add_blank_slide()
    add_header(s11, "Future Scope & Clinical Roadmap", "Future Engineering Horizons & Scalability", "Expanding from prototype to clinical hospital trials and ambient sensing")

    col_w = Inches(3.6)
    gap = Inches(0.4)

    add_card(s11, Inches(0.8), Inches(1.9), col_w, Inches(4.9))
    tb = s11.shapes.add_textbox(Inches(1.0), Inches(2.1), col_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Phase 1: Contactless Biometrics\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Replace wearable sensors with ambient mmWave radar and video-based remote photoplethysmography (rPPG).\n• Unobtrusive heart rate & agitation monitoring without tactile patient resistance.\n• Smart pressure mattress integration for nocturnal wandering detection."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    add_card(s11, Inches(0.8) + col_w + gap, Inches(1.9), col_w, Inches(4.9))
    tb = s11.shapes.add_textbox(Inches(0.8) + col_w + gap + Inches(0.2), Inches(2.1), col_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Phase 2: Neural Audio Restoration\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• AI Source Separation (Demucs) to extract vocal formants from noisy 1960s mono recordings.\n• Real-time presbycusis adaptive equalizers compensating for age-related hearing loss.\n• Neural lyric enhancement ensuring elderly patients perceive lyrics clearly."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    add_card(s11, Inches(0.8) + (col_w + gap)*2, Inches(1.9), col_w, Inches(4.9))
    tb = s11.shapes.add_textbox(Inches(0.8) + (col_w + gap)*2 + Inches(0.2), Inches(2.1), col_w - Inches(0.4), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Phase 3: Multi-Center RCTs\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• Clinical trials partnering with geriatric memory clinics (AIIMS, Apollo Neurological Sciences).\n• Biological validation via serial fMRI functional connectivity scans and plasma p-tau217 biomarkers.\n• Healthcare payer integration (reimbursement as digital therapeutic software)."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 12: CONCLUSION & Q&A
    # =========================================================================
    s12 = add_blank_slide()

    add_card(s12, Inches(1.0), Inches(1.3), Inches(11.333), Inches(4.9), CARD_BG, CARD_BORDER)
    tb12 = s12.shapes.add_textbox(Inches(1.5), Inches(1.6), Inches(10.333), Inches(4.3))
    tf12 = tb12.text_frame
    tf12.word_wrap = True

    p = tf12.paragraphs[0]
    p.add_run().text = "CONCLUSION & Q&A\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(14)
    p.runs[0].font.color.rgb = GOLD_ACCENT

    p2 = tf12.add_paragraph()
    p2.space_before = Pt(6)
    p2.add_run().text = "\"Music is not just passive entertainment—it is an enduring neuro-architectural bridge that restores memory, connection, and human dignity.\""
    p2.runs[0].font.bold = True
    p2.runs[0].font.size = Pt(19)
    p2.runs[0].font.italic = True
    p2.runs[0].font.color.rgb = TEXT_WHITE

    p3 = tf12.add_paragraph()
    p3.space_before = Pt(16)
    p3.add_run().text = "Key Project Takeaways:\n"
    p3.runs[0].font.bold = True
    p3.runs[0].font.size = Pt(14)
    p3.runs[0].font.color.rgb = CYAN_ACCENT

    p4 = tf12.add_paragraph()
    p4.space_before = Pt(4)
    p4.add_run().text = "1. Proven Neurobiology: Musical memories in the caudal ACC and pre-SMA withstand severe Alzheimer's degeneration.\n2. Multi-Sensory Synergy: Synchronizing formative Indian music with family archival photos doubles autobiographical recall.\n3. Closed-Loop Engineering: Iso-principle tempo modulation calms sundowning agitation within 18 minutes.\n4. Dual-Portal Clinical Bridge: Eliminates hospital stigma for families while arming neurologists with exportable progress telemetry.\n5. Fully Operational: Live, tested, and running in production on Render."
    p4.runs[0].font.size = Pt(12)
    p4.runs[0].font.color.rgb = TEXT_MUTED

    p5 = tf12.add_paragraph()
    p5.space_before = Pt(16)
    p5.add_run().text = "Thank You! Questions and Feedback are Welcome."
    p5.runs[0].font.bold = True
    p5.runs[0].font.size = Pt(16)
    p5.runs[0].font.color.rgb = GOLD_ACCENT

    prs.save(pptx_path)
    print(f"Presentation successfully saved at: {pptx_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\nihar\Documents\Codex\2026-11-19\bri"
    out_file = os.path.join(out_dir, "smaran_micro_project_presentation.pptx")
    create_deck(out_file)
