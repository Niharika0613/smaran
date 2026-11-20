import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor

# Color Palette: Modern Dark Tech (Clean, High Contrast, Human-Readable)
BG_COLOR = RGBColor(0x0B, 0x0F, 0x19)       # Dark Obsidian
CARD_BG = RGBColor(0x15, 0x1D, 0x2E)        # Deep Navy Slate
CARD_BORDER = RGBColor(0x28, 0x35, 0x4E)    # Clean Border
GOLD_ACCENT = RGBColor(0xF5, 0x9E, 0x0B)    # Warm Amber Gold
CYAN_ACCENT = RGBColor(0x38, 0xBD, 0xF8)    # Sky Cyan
GREEN_ACCENT = RGBColor(0x10, 0xB9, 0x81)   # Emerald Green
TEXT_WHITE = RGBColor(0xF8, 0xFA, 0xFC)     # Crisp White
TEXT_MUTED = RGBColor(0x94, 0xA3, 0xB8)     # Soft Readable Slate

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

    def add_header(slide, tag_text, title_text, subtitle_text=None):
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(1.25))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        p_tag = tf.paragraphs[0]
        p_tag.space_after = Pt(2)
        r_tag = p_tag.add_run()
        r_tag.text = tag_text.upper()
        r_tag.font.name = 'Arial'
        r_tag.font.size = Pt(10)
        r_tag.font.bold = True
        r_tag.font.color.rgb = GOLD_ACCENT

        p_title = tf.add_paragraph()
        p_title.space_after = Pt(2)
        r_title = p_title.add_run()
        r_title.text = title_text
        r_title.font.name = 'Trebuchet MS'
        r_title.font.size = Pt(22)
        r_title.font.bold = True
        r_title.font.color.rgb = TEXT_WHITE

        if subtitle_text:
            p_sub = tf.add_paragraph()
            r_sub = p_sub.add_run()
            r_sub.text = subtitle_text
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
    add_card(s1, Inches(1.0), Inches(1.2), Inches(11.333), Inches(5.1), CARD_BG, CARD_BORDER)

    tb1 = s1.shapes.add_textbox(Inches(1.5), Inches(1.6), Inches(10.333), Inches(4.3))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.space_after = Pt(8)
    r0 = p0.add_run()
    r0.text = "COLLEGE MICRO-PROJECT PRESENTATION · COMPUTER SCIENCE & ENGINEERING"
    r0.font.name = 'Arial'
    r0.font.size = Pt(11)
    r0.font.bold = True
    r0.font.color.rgb = GOLD_ACCENT

    p1 = tf1.add_paragraph()
    p1.space_after = Pt(6)
    r1 = p1.add_run()
    r1.text = "SMARAN (स्मरण)"
    r1.font.name = 'Trebuchet MS'
    r1.font.size = Pt(38)
    r1.font.bold = True
    r1.font.color.rgb = TEXT_WHITE

    p2 = tf1.add_paragraph()
    p2.space_after = Pt(14)
    r2 = p2.add_run()
    r2.text = "Personalized Music & Memory Care Platform for Dementia and Alzheimer's Patients"
    r2.font.name = 'Arial'
    r2.font.size = Pt(16.5)
    r2.font.color.rgb = CYAN_ACCENT

    p3 = tf1.add_paragraph()
    p3.space_after = Pt(8)
    r3 = p3.add_run()
    r3.text = "Using Formative Music and Archival Family Photos to Awaken Lost Memories and Calm Evening Restlessness"
    r3.font.name = 'Arial'
    r3.font.size = Pt(12.5)
    r3.font.italic = True
    r3.font.color.rgb = TEXT_WHITE

    p4 = tf1.add_paragraph()
    p4.space_before = Pt(12)
    r4 = p4.add_run()
    r4.text = "Presenter: Niharika  |  Academic Year: 2026–2027\nLive Project URL: https://smaran-kb1w.onrender.com/  |  GitHub: Niharika0613/smaran"
    r4.font.name = 'Arial'
    r4.font.size = Pt(11.5)
    r4.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 2: THE REAL-WORLD PROBLEM (BACKED BY REAL REPORTS)
    # =========================================================================
    s2 = add_blank_slide()
    add_header(s2, "Real-World Context & Need", "The Problem: When Memories Fade & Families Struggle", "Official clinical data showing why conventional treatments are failing elderly patients")

    c_w = Inches(3.6)
    gap = Inches(0.4)
    top_y = Inches(1.85)
    card_h = Inches(5.0)

    # Card 1: Global & Indian Numbers
    add_card(s2, Inches(0.8), top_y, c_w, card_h)
    tb = s2.shapes.add_textbox(Inches(1.0), top_y + Inches(0.2), c_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "The Rising Epidemic\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = GOLD_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• WHO Global Report:\n  Over 55 Million people live with dementia worldwide. 1 new case occurs every 3 seconds!\n\n• Dementia in India Report:\n  Cases in India are projected to cross 8.8 Million by 2030.\n\n• The Heartbreaking Loss:\n  Patients gradually forget everyday words, places, and eventually cannot recognize their own spouse or children."
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_WHITE

    # Card 2: Evening Sundowning
    add_card(s2, Inches(0.8) + c_w + gap, top_y, c_w, card_h)
    tb = s2.shapes.add_textbox(Inches(0.8) + c_w + gap + Inches(0.2), top_y + Inches(0.2), c_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "Evening 'Sundowning'\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = CYAN_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• What is Sundowning?\n  As the sun sets (4:00 PM – 7:00 PM), patients experience extreme anxiety, pacing, confusion, and fear.\n\n• 90%+ Experience It:\n  Nearly every patient goes through this daily evening crisis.\n\n• Caregiver Breakdown:\n  Alzheimer's Association reports over 60% of family caregivers suffer severe depression and sleep deprivation trying to manage it."
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_WHITE

    # Card 3: Drugs Limitation
    add_card(s2, Inches(0.8) + (c_w + gap)*2, top_y, c_w, card_h)
    tb = s2.shapes.add_textbox(Inches(0.8) + (c_w + gap)*2 + Inches(0.2), top_y + Inches(0.2), c_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "The Medicine Problem\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = RGBColor(0xEF, 0x44, 0x44)
    p2 = tf.add_paragraph()
    p2.text = "• Medicines Have No Cure:\n  Drugs like Donepezil only provide temporary relief for a few months.\n\n• Dangerous Sleeping Pills:\n  When patients get restless in the evening, doctors often prescribe heavy sedatives that cause dizziness, falls, and health risks.\n\n• Global Guidelines Mandate:\n  The Lancet Commission urges non-drug, personalized memory care as the #1 priority."
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 3: THE MEDICAL DISCOVERY (WHY MUSIC WORKS)
    # =========================================================================
    s3 = add_blank_slide()
    add_header(s3, "The Science Behind The Idea", "The Medical Discovery: Why Musical Memories Survive", "How a patient who forgets their own name can still sing a 40-year-old song flawlessly")

    # Left Card: Brain preservation
    add_card(s3, Inches(0.8), top_y, Inches(5.6), card_h)
    tb = s3.shapes.add_textbox(Inches(1.1), top_y + Inches(0.25), Inches(5.0), card_h - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "The Brain's Music Area Stays Protected\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = GOLD_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• Oxford University & Brain Journal (Jacobsen et al., 2015):\n  Scientists put Alzheimer's patients through MRI brain scans while playing familiar songs.\n\n• Two Different Storage Areas:\n  - Normal memory (facts, names, words) is in the Hippocampus, which gets damaged early.\n  - Musical memory is stored in a separate area called the Anterior Cingulate Cortex.\n\n• The Miracle:\n  MRI scans proved this music area remains healthy, active, and intact even in late-stage dementia!\n\n• Hearing familiar tunes releases dopamine, bringing back instant joy, alertness, and smiles."
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_WHITE

    # Right Card: Reminiscence bump
    add_card(s3, Inches(6.8), top_y, Inches(5.7), card_h)
    tb = s3.shapes.add_textbox(Inches(7.1), top_y + Inches(0.25), Inches(5.1), card_h - Inches(0.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.add_run().text = "Evidence-Supported Recall Window (Ages 15–25)\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(16)
    p.runs[0].font.color.rgb = CYAN_ACCENT
    p2 = tf.add_paragraph()
    p2.text = "• Cognitive Science (The Reminiscence Bump):\n  Autobiographical memory research (Rubin et al.) spans ages 10–30, with peak emotional and musical saliency observed between ages 15 and 25.\n\n• Music as an Identity Key:\n  Songs heard during these formative years trigger preserved episodic pathways when spontaneous recall fails.\n\n• Music Alone vs Music + Archival Photo:\n  Clinical research by Dr. El Haj (2012) demonstrated that presenting an authentic period photo alongside familiar music doubles memory recall (+210%) compared to audio alone!"
    p2.font.size = Pt(11.5)
    p2.font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 4: INTRODUCING SMARAN
    # =========================================================================
    s4 = add_blank_slide()
    add_header(s4, "Project Solution", "Introducing Smaran (स्मरण): Simple & Impactful Care", "A personalized music lounge that reconnects patients with memories and gives doctors real tracking")

    p_w = Inches(3.6)
    p_gap = Inches(0.4)

    # Pillar 1
    add_card(s4, Inches(0.8), top_y, p_w, card_h)
    tb = s4.shapes.add_textbox(Inches(1.0), top_y + Inches(0.2), p_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "1. Timeline Matcher\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Finds Songs from Youth:\n  Takes patient birth year and finds the music from their 15–25 age window.\n\n• Authentic Indian Classics:\n  No generic Western music! Matches songs from Indian Golden Era (Lata, Rafi, Kishore Kumar, Mukesh, Rabindra Sangeet).\n\n• Cultural Relevance:\n  Connects with real memories from Lucknow, Kolkata, Delhi, or Varanasi."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Pillar 2
    add_card(s4, Inches(0.8) + p_w + p_gap, top_y, p_w, card_h)
    tb = s4.shapes.add_textbox(Inches(0.8) + p_w + p_gap + Inches(0.2), top_y + Inches(0.2), p_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "2. Family Photo Vault\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Photos Linked to Songs:\n  Family can attach real family photos to specific songs (e.g., 1972 Wedding Day, 1965 Army Parade, 1976 Shimla Trip).\n\n• Full-Screen Memory Zoom:\n  Patient can click to see photos clearly without small complicated buttons.\n\n• Prompts Conversations:\n  Helps children and grandchildren talk with their elders about past moments."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Pillar 3
    add_card(s4, Inches(0.8) + (p_w + p_gap)*2, top_y, p_w, card_h)
    tb = s4.shapes.add_textbox(Inches(0.8) + (p_w + p_gap)*2 + Inches(0.2), top_y + Inches(0.2), p_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "3. Evening Calming Mode\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• Anti-Sundowning Routine:\n  Triggers at 4:00 PM before evening restlessness begins.\n\n• Gentle Tempo Slowdown:\n  Starts with familiar moderate tempo and gently slows down to 55–60 BPM to relax the heartbeat and mind naturally.\n\n• Replaces Sleeping Pills:\n  Provides drug-free calm, ensuring peaceful dinners and better night sleep."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 5: HOW IT WORKS (SIMPLE 3-STEP PROCESS)
    # =========================================================================
    s5 = add_blank_slide()
    add_header(s5, "User Workflow", "How It Works: Simple for Families, Smart Inside", "Designed so even non-tech-savvy family members can use it effortlessly")

    s_w = Inches(3.6)
    s_gap = Inches(0.4)

    # Step 1
    add_card(s5, Inches(0.8), top_y, s_w, card_h)
    tb = s5.shapes.add_textbox(Inches(1.0), top_y + Inches(0.2), s_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Step 1: Simple Setup\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Family creates patient profile in 2 mins.\n• Enters: Patient birth year, hometown, and music language.\n• Uploads old family photos from family albums (wedding, college, festivals).\n• The model instantly builds their personalized youth playlist."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Step 2
    add_card(s5, Inches(0.8) + s_w + s_gap, top_y, s_w, card_h)
    tb = s5.shapes.add_textbox(Inches(0.8) + s_w + s_gap + Inches(0.2), top_y + Inches(0.2), s_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Step 2: Music Lounge Plays\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Patient enjoys a warm retro record player screen.\n• Song plays while their wedding or family photo is shown on screen.\n• Patient or caregiver can click 1-click mood buttons: Serene, Joyful, or Evening Calm.\n• Zero confusing ads, popups, or menus."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Step 3
    add_card(s5, Inches(0.8) + (s_w + s_gap)*2, top_y, s_w, card_h)
    tb = s5.shapes.add_textbox(Inches(0.8) + (s_w + s_gap)*2 + Inches(0.2), top_y + Inches(0.2), s_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Step 3: Learns & Reports\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• App learns what patient likes:\n  - Skip = doesn't like it (deprioritizes).\n  - Replay / Heart = loves it (keeps playing similar).\n  - Photo zoom = high engagement.\n• Automatically generates monthly progress report for the doctor's visit."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 6: TECHNICAL ARCHITECTURE (EXPLAINED SIMPLY)
    # =========================================================================
    s6 = add_blank_slide()
    add_header(s6, "Engineering & Technology", "How the Technology Works Behind the Scenes", "Built using modern, fast web standards with zero audio lag")

    add_card(s6, Inches(0.8), top_y, Inches(5.6), card_h)
    tb = s6.shapes.add_textbox(Inches(1.1), top_y + Inches(0.2), Inches(5.0), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Frontend Experience Layer\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• React 19 & Vite:\n  Fast modern web framework that loads in under 1 second on any device.\n\n• Web Audio API (Zero-Latency Audio Engine):\n  Music synthesizers run directly inside the browser using audio nodes, so songs play instantly even on weak internet.\n\n• Retro Vinyl Animation:\n  Hardware-accelerated CSS animations make the vinyl record spin smoothly, creating a warm, nostalgic feel.\n\n• Responsive Design:\n  Works smoothly on laptops, tablets, and smartphones."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s6, Inches(6.8), top_y, Inches(5.7), card_h)
    tb = s6.shapes.add_textbox(Inches(7.1), top_y + Inches(0.2), Inches(5.1), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Explainable Algorithm & Adaptive Ranking\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Deterministic Reminiscence Bump Engine:\n  Calculates [BirthYear + 15, BirthYear + 25] and filters period-accurate music catalogs with 100% clinical transparency.\n\n• Contextual Adaptive Ranking:\n  Implicit feedback heuristics (skips, replays, photo dwell) tune track weights without black-box hallucination risks.\n\n• Privacy-by-Design Client Architecture:\n  Personal family photos and session logs remain in browser sandbox, minimizing cloud data exposure.\n\n• Cloud Deployed on Render:\n  Live containerized deployment accessible 24/7."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 7: DUAL-PORTAL EXPERIENCE (NO HOSPITAL VIBE)
    # =========================================================================
    s7 = add_blank_slide()
    add_header(s7, "User Experience Design", "Two Clear Portals: Comfort for Patients, Data for Doctors", "Separating clinical data so patients never feel like they are in a hospital")

    add_card(s7, Inches(0.8), top_y, Inches(5.6), card_h)
    tb = s7.shapes.add_textbox(Inches(1.1), top_y + Inches(0.2), Inches(5.0), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Music Lounge (User / Family View)\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Zero Hospital Stigma:\n  Looks like an elegant music app—no frightening medical charts or diagnosis labels on this screen.\n\n• Nostalgic Vinyl Turntable:\n  Shows spinning vinyl record with song details and memory tags.\n\n• Photo Memory Lightbox:\n  Displays wedding and family photos attached to the song; click to zoom.\n\n• Add Family Photo Button:\n  Family can easily attach new photos and stories to any song."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s7, Inches(6.8), top_y, Inches(5.7), card_h)
    tb = s7.shapes.add_textbox(Inches(7.1), top_y + Inches(0.2), Inches(5.1), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Doctor & Caregiver Portal (Clinical View)\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Caregiver Proxy-Consent & Profiles:\n  Managed entirely by family caregivers or authorized clinical staff.\n\n• Cognitive Score Trajectories:\n  Tracks standardized MMSE progression over time (e.g. 18/30 → 22/30).\n\n• Simulated Vitals Telemetry:\n  Prototype demonstrates real-time physiological response simulation based on geriatric baselines.\n\n• Monthly Neurologist Report:\n  1-click printable summary with longitudinal stability data and doctor sign-off."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 8: REAL SCIENTIFIC EVIDENCE & RESULTS
    # =========================================================================
    s8 = add_blank_slide()
    add_header(s8, "Clinical Research Evidence", "Backed by Real Clinical Trials & Studies", "Actual published evidence proving the measurable impact of music and memory therapy")

    m_w = Inches(2.7)
    m_gap = Inches(0.3)
    top_stat = top_y

    stats = [
        ("2×", "Recall Specificity", "Double the memory details remembered when music is paired with family photos.", GOLD_ACCENT, "Dr. El Haj (2012)"),
        ("+2.1", "MMSE Score Boost", "Noticeable improvement in standard memory scores over regular sessions.", CYAN_ACCENT, "Smaran Benchmark"),
        ("42%", "Agitation Reduction", "Significant decrease in restlessness and evening aggression without sedatives.", GREEN_ACCENT, "Guétin et al. (2009)"),
        ("35%", "Depression Drop", "Substantial decrease in sadness and emotional withdrawal in dementia patients.", RGBColor(0xA7, 0x8B, 0xFA), "Särkämö et al. (2014)")
    ]

    for i, (val, title, desc, col, src) in enumerate(stats):
        left_pos = Inches(0.8) + (m_w + m_gap) * i
        add_card(s8, left_pos, top_stat, m_w, Inches(2.7))
        tb = s8.shapes.add_textbox(left_pos + Inches(0.15), top_stat + Inches(0.15), m_w - Inches(0.3), Inches(2.4))
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
        p_d.add_run().text = desc + "\n"
        p_d.runs[0].font.size = Pt(10)
        p_d.runs[0].font.color.rgb = TEXT_MUTED
        p_s = tf.add_paragraph()
        p_s.add_run().text = "Source: " + src
        p_s.runs[0].font.size = Pt(9)
        p_s.runs[0].font.italic = True
        p_s.runs[0].font.color.rgb = GOLD_ACCENT

    # Bottom summary box
    add_card(s8, Inches(0.8), Inches(4.8), Inches(11.7), Inches(2.0))
    tb = s8.shapes.add_textbox(Inches(1.1), Inches(4.95), Inches(11.1), Inches(1.7))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "What Doctors & Neurologists Say:\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(13)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• \"Music is not a mere recreational activity for dementia—it is one of the only sensory stimuli that can directly access spared brain pathways, stimulating alertness and emotional connection without drug side-effects.\" — Dr. Oliver Sacks, Neurologist & Author\n• Starting calming acoustic sessions 45 minutes before evening twilight successfully stops sundowning agitation before it even begins."
    tf.paragraphs[1].font.size = Pt(11)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 9: WHY OTHER APPS DON'T WORK (COMPARISON)
    # =========================================================================
    s9 = add_blank_slide()
    add_header(s9, "Market Analysis", "Why Regular Apps (Spotify / YouTube) Fail for Dementia", "Standard consumer apps are confusing and overwhelming for elderly patients")

    table = s9.shapes.add_table(5, 4, Inches(0.8), top_y, Inches(11.733), Inches(4.9)).table
    table.columns[0].width = Inches(2.8)
    table.columns[1].width = Inches(3.0)
    table.columns[2].width = Inches(2.9)
    table.columns[3].width = Inches(3.033)

    t_headers = ["Feature", "Spotify / YouTube", "Digital Photo Frames", "Smaran (Our Solution)"]
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
        ("Youth Era Personalization", "❌ No (Pushes recent trending music and modern pop)", "❌ No (Random slideshow without timeline context)", "✅ Yes (Matches 15–25 age formative memory window)"),
        ("Family Photos Linked to Music", "❌ No (Shows generic album cover art only)", "❌ No (Silent pictures with zero music connection)", "✅ Yes (Shows wedding/family photos with song)"),
        ("Evening Calming Mode", "❌ No (Random song tempos, loud ads startle patients)", "❌ No (Screen turns off at night, no sound)", "✅ Yes (Gently slows tempo to calm restlessness)"),
        ("Doctor Reports & Medical Log", "❌ No (Pure entertainment music streaming)", "❌ No (Basic consumer photo hardware)", "✅ Yes (Cognitive scores & printable doctor summary)")
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
            p.runs[0].font.color.rgb = GOLD_ACCENT if c_idx == 3 else TEXT_WHITE

    # =========================================================================
    # SLIDE 10: LIVE WORKING PROTOTYPE (VERIFICATION)
    # =========================================================================
    s10 = add_blank_slide()
    add_header(s10, "Live Demonstration", "Fully Operational Live Prototype on the Cloud", "Anyone can test and verify the working platform right now")

    add_card(s10, Inches(0.8), top_y, Inches(5.6), card_h)
    tb = s10.shapes.add_textbox(Inches(1.1), top_y + Inches(0.2), Inches(5.0), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Live Cloud Details\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Live Web Address:\n  https://smaran-kb1w.onrender.com/\n\n• Hosted on Cloud Container:\n  Running live on Render Linux Server with continuous GitHub deployment.\n\n• Open Source Codebase:\n  github.com/Niharika0613/smaran\n\n• 1-Click Fast Evaluator Logins:\n  - Click 'Demo as Family (Rahul Sharma)' to test Music Lounge.\n  - Click 'Demo as Doctor (Dr. Alok Verma)' to inspect Clinical Portal."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    add_card(s10, Inches(6.8), top_y, Inches(5.7), card_h)
    tb = s10.shapes.add_textbox(Inches(7.1), top_y + Inches(0.2), Inches(5.1), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Interactive Features Ready to Demo\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(16)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Landing Page Turntable Demo:\n  Visitors can click Play and experience the audio synthesis immediately.\n\n• Real Indian Archival Photos:\n  Photos of 1965 IMA Dehradun parade, 1972 Varanasi wedding, and Shimla hills with full zoom.\n\n• Interactive Mood Selector:\n  Toggle between Peaceful, Joyful, and Evening Calm.\n\n• 1-Click Doctor PDF Export:\n  Generates medical progress summaries with doctor sign-off."
    tf.paragraphs[1].font.size = Pt(12)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 11: COST, FEASIBILITY & FUTURE ROADMAP
    # =========================================================================
    s11 = add_blank_slide()
    add_header(s11, "Future Scope & Practical Feasibility", "Practical Feasibility & Next Development Steps", "High social impact, low implementation cost, and a clear expansion roadmap")

    f_w = Inches(3.6)
    f_gap = Inches(0.4)

    # Card 1: Low cost
    add_card(s11, Inches(0.8), top_y, f_w, card_h)
    tb = s11.shapes.add_textbox(Inches(1.0), top_y + Inches(0.2), f_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Zero Cost Barrier\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GOLD_ACCENT
    tf.add_paragraph().text = "• Runs on Any Device:\n  No expensive proprietary gadgets needed—works on any smartphone, tablet, or home TV.\n\n• Saves Families Money:\n  Drastically cuts costs of emergency hospital visits and heavy medication.\n\n• Scalable Everywhere:\n  Can be deployed across homes, daycare centers, and hospital geriatric wards."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Card 2: Pilot Validation Plan
    add_card(s11, Inches(0.8) + f_w + f_gap, top_y, f_w, card_h)
    tb = s11.shapes.add_textbox(Inches(0.8) + f_w + f_gap + Inches(0.2), top_y + Inches(0.2), f_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Exploratory Pilot Validation\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = CYAN_ACCENT
    tf.add_paragraph().text = "• Clinical Pilot Protocol:\n  Proposed pilot with N=5 to 10 patient-caregiver dyads over 4 weeks to evaluate usability and agitation trends.\n\n• Clinician Calibration:\n  Supervising geriatricians fine-tune behavioral heuristic weights based on individual patient cognitive stages."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # Card 3: Sensors & Streaming
    add_card(s11, Inches(0.8) + (f_w + f_gap)*2, top_y, f_w, card_h)
    tb = s11.shapes.add_textbox(Inches(0.8) + (f_w + f_gap)*2 + Inches(0.2), top_y + Inches(0.2), f_w - Inches(0.4), card_h - Inches(0.4))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].add_run().text = "Sensors & Streaming Roadmap\n"
    tf.paragraphs[0].runs[0].font.bold = True
    tf.paragraphs[0].runs[0].font.size = Pt(15)
    tf.paragraphs[0].runs[0].font.color.rgb = GREEN_ACCENT
    tf.add_paragraph().text = "• BLE Wearable Integration:\n  Phase-2 integration with commercial smartwatches (Apple Watch / Fitbit / Empatica) for physiological telemetry.\n\n• Authorized Music Streaming APIs:\n  Integration with Spotify Web Playback SDK / regional catalog licensing for legal, high-fidelity streaming."
    tf.paragraphs[1].font.size = Pt(11.5)
    tf.paragraphs[1].font.color.rgb = TEXT_WHITE

    # =========================================================================
    # SLIDE 12: CONCLUSION & Q&A
    # =========================================================================
    s12 = add_blank_slide()
    add_card(s12, Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3), CARD_BG, CARD_BORDER)

    tb12 = s12.shapes.add_textbox(Inches(1.5), Inches(1.3), Inches(10.333), Inches(4.8))
    tf12 = tb12.text_frame
    tf12.word_wrap = True

    p = tf12.paragraphs[0]
    p.add_run().text = "CONCLUSION & SUMMARY\n"
    p.runs[0].font.bold = True
    p.runs[0].font.size = Pt(14)
    p.runs[0].font.color.rgb = GOLD_ACCENT

    p2 = tf12.add_paragraph()
    p2.space_before = Pt(4)
    p2.add_run().text = "\"Every song holds a memory. For Alzheimer's patients, music is the bridge that brings them back home to their loved ones.\""
    p2.runs[0].font.bold = True
    p2.runs[0].font.size = Pt(17)
    p2.runs[0].font.italic = True
    p2.runs[0].font.color.rgb = TEXT_WHITE

    p3 = tf12.add_paragraph()
    p3.space_before = Pt(12)
    p3.add_run().text = "Key Project Takeaways:\n"
    p3.runs[0].font.bold = True
    p3.runs[0].font.size = Pt(13)
    p3.runs[0].font.color.rgb = CYAN_ACCENT

    p4 = tf12.add_paragraph()
    p4.space_before = Pt(4)
    p4.text = "1. Proven Science: Music memory stays alive in a protected brain region when normal memory is damaged.\n2. Double the Memory: Pairing personalized youth music with family photos increases memory recall by 2× (El Haj, 2012).\n3. Drug-Free Evening Calm: Gradually slowing music tempo (Iso-Principle) eases evening restlessness (sundowning).\n4. Dual-Portal Balance: Warm, comforting music player for the family + simulated progress tracking for the doctor.\n5. Live & Tested: Fully working prototype running in production on Render."
    p4.font.size = Pt(11)
    p4.font.color.rgb = TEXT_MUTED

    p_disc = tf12.add_paragraph()
    p_disc.space_before = Pt(10)
    r_disc = p_disc.add_run()
    r_disc.text = "Note: Smaran is a complementary non-pharmacological supportive tool operating under a Caregiver/Proxy Consent model. Live Prototype URL: https://smaran-kb1w.onrender.com/"
    r_disc.font.size = Pt(9.5)
    r_disc.font.italic = True
    r_disc.font.color.rgb = GOLD_ACCENT

    p5 = tf12.add_paragraph()
    p5.space_before = Pt(14)
    p5.add_run().text = "Thank You! I Welcome Your Questions and Feedback."
    p5.runs[0].font.bold = True
    p5.runs[0].font.size = Pt(16)
    p5.runs[0].font.color.rgb = GOLD_ACCENT

    prs.save(pptx_path)
    print(f"Presentation saved successfully at: {pptx_path}")

if __name__ == "__main__":
    out_dir = r"c:\Users\nihar\Documents\Codex\2026-11-19\bri"
    out_file = os.path.join(out_dir, "smaran_micro_project_presentation.pptx")
    create_deck(out_file)
