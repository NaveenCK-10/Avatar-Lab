# ⚡️ Avatar Lab – Where AI Meets Emotion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/project-info182/Avatar-Lab.svg)](https://github.com/project-info182/Avatar-Lab/graphs/contributors)

> 🎥 **Generate realistic, emotionally expressive talking avatars from text using AI.**

Welcome to **Avatar Lab** – the next generation of intelligent, emotionally expressive avatar animation. More than just lip-syncing, Avatar Lab combines powerful neural speech synthesis and state-of-the-art animation models to generate **realistic**, **emotion-aware avatars** that move, speak, and feel like real humans.

🚀 **Live Demo:** https://project-info182.github.io/Avatar-Lab/
📹 **Video Showcase:** https://project-info182.github.io/Avatar-Lab/video.html

Whether you're building virtual assistants, game characters, or AI-driven content creators, Avatar Lab brings your digital personas to life.

---

## 📜 Table of Contents

* [🎯 Why Avatar Lab?](#-why-avatar-lab)
* [⚡ Quick Start](#-quick-start)
* [🚀 Getting Started](#-getting-started)
* [🧬 System Architecture](#-system-architecture)
* [🧱 Technology Stack](#-technology-stack)
* [🛠️ Workflow: From Text to Expressive Avatar](#️-workflow-from-text-to-expressive-avatar)
* [🔬 Models Explored](#-models-we-explored)
* [✅ Models Chosen for Avatar Lab](#-models-we-have-chosen-for-our-project)
* [🚀 Use Cases](#-use-cases)
* [🗺️ Project Milestones & Roadmap](#️-project-milestones--roadmap)
* [📈 Project Updates](#-project-updates)
* [🤝 Contribute or Collaborate](#-contribute-or-collaborate)
* [👥 Contributors](#-contributors)

---

## 🎯 Why Avatar Lab?

Most avatar tools stop at syncing lips to sound. **We go further.**

Avatar Lab delivers avatars with:

* 🎙 **Neural Speech Synthesis:** Realistic, expressive speech using advanced TTS models
* 🗣 **True-to-Life Lip Sync:** Facial animations aligned with audio at near-human accuracy
* 👀 **Emotional Facial Motion:** Micro-expressions, eye blinks, and head movement

💡 **What makes this different?**
We combine **multiple AI systems into one real-time pipeline**, enabling avatars that don’t just speak — they *feel alive*.

---

## ⚡ Quick Start

Run the basic app (without AI models) in under 2 minutes:

```bash
git clone https://github.com/project-info182/Avatar-Lab.git
cd Avatar-Lab

cd frontend && npm install && npm run dev
cd ../backend && npm install && npm start
```

👉 Open: `http://localhost:3000`

---

## 🚀 Getting Started

This project is divided into **Frontend**, **Backend**, and **AI Models** (E2 F5 TTS & LatentSync).

---

### 🧩 Prerequisites

Ensure you have:

* Node.js (v18+)
* npm / Yarn
* Python (3.9+)
* MongoDB
* ffmpeg
* Git

---

## 🛠 Project Setup

### 1. Clone Repository

```bash
git clone https://github.com/project-info182/Avatar-Lab.git
cd Avatar-Lab
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Runs on: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Runs on: `http://localhost:3000`

---

### 4. AI Models Setup

Each model runs as a **separate Python service**.

---

#### 🗣️ A. E2 F5 TTS (Speech Synthesis)

> ⚠️ Recommended: Follow official repo for full setup
> https://github.com/SWivid/F5-TTS.git

```bash
conda create -n f5-tts python=3.10
conda activate f5-tts
pip install f5-tts
python tts.py
```

Runs on: `http://localhost:8000`

---

#### 🎥 B. LatentSync (Facial Animation)

> ⚠️ Official setup: https://github.com/bytedance/LatentSync

```bash
cd latent-sync
python -m venv .venv
source .venv/bin/activate

pip install -r latentsync-requirements.txt
python animation.py
```

Runs on: `http://localhost:6900`

---

### 🧪 Final Test

* Open `http://localhost:3000`
* Enter text → generate speech → render avatar

---

## 🧬 System Architecture

![System Architecture](https://github.com/project-info182/Avatar-Lab/blob/1333679590c6ba8ef8f8a15e454e162553c5d34f/Architecture%20Final.png)

**Pipeline:**

```
Frontend → Backend → TTS → LatentSync → Output Video
```

---

## 🧱 Technology Stack

### Frontend

* React.js (Next.js)
* CSS / Animations

### Backend

* Node.js (Express.js) → API Layer
* Python (Flask) → AI Services

### AI Models

* E2 F5 TTS → Speech generation
* LatentSync → Facial animation

### Infrastructure

* MongoDB
* Docker
* AWS / Vercel

---

## 🛠️ Workflow: From Text to Expressive Avatar

![Workflow](https://github.com/project-info182/Avatar-Lab/blob/6ae54c141753c68b6ad441e4eb859562c92c0771/WorkFlow.png)

1. User inputs text + selects avatar
2. Backend sends text → TTS
3. TTS generates expressive audio
4. Audio + avatar → LatentSync
5. LatentSync renders animated video
6. Final output delivered

---

## 🔬 Models We Explored

### Speech Models

* Coqui TTS
* Zonos TTS
* Bark
* Spark TTS
* **E2 F5 TTS**

### Animation Models

* SadTalker
* DiffTalk
* Memo Avatar
* DiffPoseTalk
* **LatentSync**

---

## ✅ Models Chosen for Avatar Lab

### 🗣️ E2 F5 TTS

* Lightweight and efficient
* High-quality expressive speech
* Flexible customization

### 🎥 LatentSync

* Highly realistic animation
* Precise lip-sync
* Supports subtle emotions

---

## 🚀 Use Cases

* 💬 Virtual Assistants
* 🎮 Gaming & Metaverse
* 🎓 AI Tutors
* 📹 Content Creation
* ♿ Accessibility Tools

---

## 🗺️ Roadmap

### ✅ Completed

* Model selection
* Core pipeline
* Frontend + backend integration

### 🚀 Next

* User authentication
* Emotion control sliders
* Multi-language support
* Performance optimization

---

## 📈 Project Updates

* ✅ TTS integration stabilized
* ✅ Full pipeline working
* 🔒 API security added
* ⚙️ Multi-service architecture refined

---

## 🤝 Contribute

```bash
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
```

Open a PR 🚀

---

## 👥 Contributors

* Naveen Chandra Kanth
* Shashank Reddy
* Satvik
* Aditi
* Monisha
* Spandana
* Vajra Chaitanya

---

## 💡 Why This Project Stands Out

* Combines **multiple AI models into one system**
* Goes beyond lip-sync → **adds emotion**
* Built as a **full-stack product**, not just an ML demo
* Solves real-world problems

---

## 📜 License

MIT

---

## 🚀 Final Thought

> We’re not just generating avatars —
> we’re making digital humans feel real.
