
# ⚡️ Avatar Lab – Where AI Meets Emotion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/project-info182/Avatar-Lab.svg)](https://github.com/project-info182/Avatar-Lab/graphs/contributors)
Welcome to **Avatar Lab** – the next generation of intelligent, emotionally expressive avatar animation. More than just lip-syncing, Avatar Lab combines powerful neural speech synthesis and state-of-the-art animation model to generate **realistic**, **emotion-aware avatars** that move, speak, and feel like real humans.

Whether you're building virtual assistants, game characters, or AI-driven content creators, Avatar Lab brings your digital personas to life.

---

## 📜 Table of Contents
- [🎯 Why Avatar Lab?](#-why-avatar-lab)
- [🚀 Getting Started](#-getting-started)
- [🧬 System Architecture](#-system-architecture)
- [🧱 Technology Stack](#-technology-stack)
- [🛠️ Workflow: From Text to Expressive Avatar](#️-workflow-from-text-to-expressive-avatar)
- [SDLC](#️-software-development-life-cycle)
- [🔬 Models Explored](#-models-we-explored)
- [✅ Models Chosen for Avatar Lab](#-models-we-have-choosed-for-our-project)
- [🚀 Use Cases](#-use-cases)
- [🗺️ Project Milestones & Roadmap](#️-project-milestones--roadmap)
- [📈 Project Updates](#-project-updates)
- [🤝 Contribute or Collaborate](#-contribute-or-collaborate)
- [👥 Contributors](#-contributors)

---

## 🎯 Why Avatar Lab?

Most avatar tools stop at syncing lips to sound. **We go further.**

Avatar Lab delivers avatars with:
- 🎙 **Neural Speech Synthesis:** Realistic, expressive speech via cutting-edge TTS models.
- 🗣 **True-to-Life Lip Sync:** Facial animations that match audio at a near-human level.
- 👀 **Emotional Facial Motion:** Micro-expressions, eye blinks, and head tilts for authentic avatars.

---

---

## 🚀 Getting Started

This project is divided into **Frontend**, **Backend**, and **AI Models** (E2 F5 TTS & LatentSync). To run Avatar Lab locally, follow these steps:

---

### 🧩 Prerequisites

Ensure you have the following installed:

* **Node.js** (v18.x or newer)
* **npm** or **Yarn**
* **Python** (v3.9 or later recommended)
* **pip** (Python package installer)
* **MongoDB** (local or hosted instance like MongoDB Atlas)
* **Git** (for cloning the repo)
* **ffmpeg** (for audio/video processing)
* **Virtualenv** or Python `venv` module

---

## 🛠 Project Setup

### 1. **Clone the Repository**

```bash
git clone https://github.com/project-info182/Avatar-Lab.git
cd Avatar-Lab
```

---

### 2. **Set Up Backend**

```bash
cd backend
npm install
```

#### Configure Environment Variables

* Create a `.env` file in the backend directory based on `.env.example`:

```bash
cp .env.example .env
```

* Set your MongoDB URI, ports, and any other secrets.

#### Run Backend Server

```bash
npm start
```

> The backend will run on `http://localhost:5000` by default.

---

### 3. **Set Up Frontend**

```bash
cd ../frontend
npm install
```

#### Environment Setup

* If required, create a `.env.local` file for the frontend:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

#### Run the Frontend

```bash
npm run dev
```

> Access the web app at: `http://localhost:3000`

---

### 4. **Set Up AI Models**

> Each model runs as a **separate Python service**. Use **virtual environments** to manage dependencies cleanly.

---

#### 📢 A. E2 F5 TTS (Speech Synthesis)
**recommended** refer official repo link for installation process:[E2 F5 TTS GitHub](https://github.com/SWivid/F5-TTS.git)
### 🐍 Create a Python 3.10 Environment
```bash
conda create -n f5-tts python=3.10
conda activate f5-tts
##### Start Zonos TTS API
```
⚙ Install PyTorch (Match Your Device)
For Intel GPU
```bash
pip install torch torchaudio --index-url https://download.pytorch.org/whl/test/xpu
```
📦 F5-TTS Installation
Option 1: Pip package (inference only)
```bash
pip install f5-tts
```
Option 2: Local editable install (for training or finetuning)
```bash
git clone https://github.com/SWivid/F5-TTS.git
cd F5-TTS
# git submodule update --init --recursive  # If needed for bigvgan
pip install -e .
```
🐳 Docker Usage
Build from Dockerfile
```bash
docker build -t f5tts:v1 .
```
Run from GitHub Container Registry
```bash
docker container run --rm -it --gpus=all \
--mount 'type=volume,source=f5-tts,target=/root/.cache/huggingface/hub/' \
-p 7860:7860 ghcr.io/swivid/f5-tts:main
```
Web Interface (Gradio)
```bash
docker container run --rm -it --gpus=all \
--mount 'type=volume,source=f5-tts,target=/root/.cache/huggingface/hub/' \
-p 7860:7860 ghcr.io/swivid/f5-tts:main f5-tts_infer-gradio --host 0.0.0.0
```
📊 Benchmark

| Model |	Concurrency	| Avg Latency |	RTF |	Mode |
| ----- | ----------- | ----------- | --- |----- |
| F5-TTS | Base (Vocos)	|2	253 ms |	0.0394	| Client-Server |
| F5-TTS | Base (Vocos)	| 1 |	 -	0.0402	| Offline TRT-LLM |
| F5-TTS | Base (Vocos)	| 1	| -	0.1467	| Offline PyTorch |

🗣 Inference Methods
1️⃣ Gradio App
```bash
# Launch UI
f5-tts_infer-gradio
```
# Specify port & host
f5-tts_infer-gradio --port 7860 --host 0.0.0.0

# Public share
f5-tts_infer-gradio --share

2️⃣ CLI Inference
With Flags
bash
Copy
Edit
```bash
f5-tts_infer-cli --model F5TTS_v1_Base \
--ref_audio "prompt.wav" \
--ref_text "The transcription of reference audio." \
--gen_text "Some text to synthesize."
```
Default setting
```bash
f5-tts_infer-cli
```
With custom config
bash
Copy
Edit
```bash
f5-tts_infer-cli -c custom.toml
```
Multi-voice
```bash
f5-tts_infer-cli -c src/f5_tts/infer/examples/multi/story.toml
```

##### Start E2 F5 TTS API

```bash
python tts.py
```

> E2 F5 TTS will run on `http://localhost:8000` (or whatever port you've configured).

---

#### 🎥 B. LatentSync (Facial Animation) 
**recommended**: refer official repo link for installation process: [LatentSync GitHub](https://github.com/bytedance/LatentSync)

```bash
cd ../latent-sync  # adjust path based on your repo
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r latentsync-requirements.txt
```

##### Download Pretrained Weights

> Check the official [LatentSync GitHub](https://github.com/bytedance/LatentSync) for checkpoint files and instructions on how to download model.

```bash
# Example:
wget https://some-url-to-latentsync-checkpoint/ckpt.pth -O checkpoints/ckpt.pth
```

##### Start LatentSync API

```bash
python animation.py
```

> LatentSync will run on `http://localhost:6900` (or configured port).

---

### 🧪 Final Test

Once all components are running:

* Open `http://localhost:3000`
* Enter a text prompt and select an avatar
* Submit to generate audio → pass to LatentSync → receive final animated avatar video

---

### 🛠 Sample API Endpoints (Backend)

* `POST /api/generate-speech`

  * Input: `{ text: "Hello", voice_id: "female_01" }`
  * Output: `{ audio_url: "/media/audio123.wav" }`

* `POST /api/lipsync`

  * Input: `{ video_url: "base_avatar.mp4", audio_url: "/media/audio123.wav" }`
  * Output: `{ video_url: "/media/avatar_out.mp4" }`

---
## ✅ Summary Checklist

| Component       | Installed | Running | Port  |
| --------------- | --------- | ------- | ----- |
| MongoDB         | ✅       | ✅      | 27017 |
| Frontend (React)| ✅       | ✅      | 3000  |
| E2 F5 TTS       | ✅       | ✅      | 8000  |
| LatentSync      | ✅       | ✅      | 6900  |

---

## 📎 Troubleshooting

* **CORS errors:** Ensure frontend has the correct `NEXT_PUBLIC_API_BASE_URL` pointing to backend.
* **Port conflicts:** Change port numbers in `.env` files and Python scripts if needed.
* **Model not responding:** Double-check virtual environments and that you're using the correct Python version (3.9+).
* **Missing model files:** Re-check the GitHub repo or authors for links to required weights.
* **Make sure you are using correct valid paths for models and other components in project (it will be based on your system).3**

---


## 🧬 System Architecture

![System Architecture Diagram for Avatar Lab](https://github.com/project-info182/Avatar-Lab/blob/1333679590c6ba8ef8f8a15e454e162553c5d34f/Architecture%20Final.png)
*Caption: High-level overview of Avatar Lab's components and data flow.*

---

## 🧱 Technology Stack

### Frontend
- ⚛️ **React.js (Next.js):** Component-based UI, SSR, and routing.
- 🎨 **CSS:** Utility-CSS  for rapid  styling.

### AI & Deep Learning 
- 🧠 **E2 F5 TTS:** Chosen for its lightweight architecture and natural speech synthesis.
- 🧍‍♂️ **LatentSync:** Selected for superior lip-sync accuracy and realistic avatar animation.

### Backend
- 🌐 **FLASK:** Powers the REST API and orchestrates the animation pipeline.
- 🗂 **MongoDB:** NoSQL database for user data, animation metadata, and project configurations.

### Deployment & Infrastructure (Example)
- 🐳 **Docker:** Containerization for consistent environments.
- ☁️ **Vercel/Netlify:** For frontend deployment.
- ☁️ **AWS/Google Cloud/Azure:** For backend and AI model hosting (e.g., EC2, SageMaker, AI Platform).

---

## 🛠️ Workflow: From Text to Expressive Avatar

![Avatar Generation Workflow](https://github.com/project-info182/Avatar-Lab/blob/6ae54c141753c68b6ad441e4eb859562c92c0771/WorkFlow.png)
*Caption: Step-by-step process from user input to final animated avatar.*

1.  selects avatar/voice preferences and User inputs text/script.
2.  Backend sends text to **Zonos TTS** to generate expressive speech audio.
3.  The generated audio and chosen avatar template (or 3D model reference) are passed to **LatentSync**.
4.  LatentSync generates facial landmarks and renders the animated video.
5.  The final video is delivered to the user.

---

## 🔬 Models We Explored

### 🗣️ Speech Synthesis Models
- [**Coqui TTS**](https://github.com/coqui-ai/TTS)
- [**Zonos TTS**](https://github.com/Zyphra/Zonos)
- [**Bark TTS**](https://github.com/suno-ai/bark)
- [**Spark TTS**](https://github.com/SparkAudio/Spark-TTS)
- [**E2 F5 TTS**](https://github.com/SWivid/F5-TTS.git) 

### 🎥 Diffusion-Based Facial Animation
- [**DiffPoseTalker**](https://github.com/DiffPoseTalk/DiffPoseTalk/tree/main)
- [**Memo Avatar**](https://github.com/memoavatar/memo.git)
- [**SadTalker**](https://github.com/OpenTalker/SadTalker)
- [**DiffTalk**](https://github.com/sstzal/DiffTalk)
- [**LatentSync**](https://github.com/bytedance/LatentSync)

---

## ✅ Models Chosen for Avatar Lab

After rigorous evaluation, we finalized the following for **Avatar Lab**:

### 🗣️ Speech Synthesis: [E2 F5 TTS GitHub](https://github.com/SWivid/F5-TTS.git)
**Reasoning:** E2 F5 TTS was selected for its lightweight architecture, natural-sounding voice synthesis, and flexibility in customization, which allows for diverse and expressive vocal outputs.

🎧 **Sample Audio Output:**
[Listen to a E2 F5 TTS Sample (on GitHub Pages)](https://project-info182.github.io/Avatar-Lab/)

### 🎥 Facial Animation: [LatentSync](https://github.com/bytedance/LatentSync)
**Reasoning:** LatentSync demonstrated superior performance in generating highly realistic avatar animations with precise lip-sync accuracy and nuanced emotional expressions, crucial for our project's goals.

📹 **Sample Video Outputs:**

| Demo 1: Expressive Dialogue | Demo 2: Subtle Emotions |
| :-------------------------: | :---------------------: |
| <a href="https://project-info182.github.io/Avatar-Lab/video.html"><img src="https://raw.githubusercontent.com/project-info182/Avatar-Lab/main/thumbnail.png" alt="Watch Demo 1: Expressive Dialogue" width="280"/></a> | <a href="https://project-info182.github.io/Avatar-Lab/video1.html"><img src="https://raw.githubusercontent.com/project-info182/Avatar-Lab/main/thumbnail1.png" alt="Watch Demo 2: Subtle Emotions" width="280"/></a> |

---

## 🚀 Use Cases

Avatar Lab is ideal for enhancing applications in:
- 💬 **Virtual Assistants & Chatbots:** HR bots, customer support agents, smart help desks with a human touch.
- 🕹 **Gaming & Metaverse:** Immersive NPCs, AI-driven characters, personalized player avatars.
- 📚 **Education & E-Learning:** AI tutors, sign-language avatars, multilingual virtual teachers.
- 📹 **Content Creation & Marketing:** Automated video explainers, virtual influencers, localized video advertisements.
-  accessibility **Accessibility Tools:** Avatars for text-to-sign-language or for individuals needing communication aids.

---

## 🗺️ Project Milestones & Roadmap

### ✅ Completed Milestones
- **Core Model Selection:**
    - 🌐 Finalized **E2 F5 TTS** for speech synthesis.
    - 🎥 Finalized **LatentSync** for facial animation.
- **Prototyping & Foundation:**
    - 🖥️ Initial frontend structure designed with React.js and CSS.
    - ⚙️ Core backend API developed using Node.js & Express.js.
    - 🔗 Proof-of-concept integration of TTS and facial animation models with the backend.

### 🚀 Goals & Next Steps
- [ ] **Full-Fledged Web Application:**
    - [ ✅ ] Develop a user-friendly interface for avatar generation (text input, audio upload, avatar selection).
    - [ ] Implement user accounts for saving projects and preferences.
- [ ] **API Enhancement & Documentation:**
    - [ ] Refine and document the REST API for third-party developer integration.
- [ ] **Advanced Features:**
    - [ ] Wider range of avatar customization options.
    - [ ] Control over emotional intensity and style.
    - [ ] Support for multiple languages.
- [ ] **Optimization & Scalability:**
    - [ ] Optimize model inference times and resource usage.
    - [ ] Enhance backend architecture for scalability and reliability.


---

## 📈 Project Updates

-   **[Date -  2025-03-28]:** Resolved TTS integration issue (internal server error) by switching to URL-based access for audio templates, improving reliability.
-   **[Date -  2025-03-30]:** Core prototype functionality (text-to-speech-to-video pipeline) is complete. Shifting focus to frontend refinement, UX improvements, and comprehensive testing.
-   **[Date -  2025-04-10]:** Investigated running TTS and LatentSync models on a unified port. Encountered dependency conflicts; currently sticking to running models on different ports.
-   **[Date -  2025-04-28]:** Secured API endpoints using token-based authentication to prevent unauthorized access and ensure safe communication between frontend and backend services.

---

## 🤝 Contribute or Collaborate

We’re building something exciting—and you can be part of it! We welcome contributions of all kinds, from code and documentation to ideas and feedback.

**How to Contribute:**
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/YourAmazingFeature`).
5.  Open a Pull Request.

Please read our `CONTRIBUTING.md` (you'll need to create this file!) for more details on our code style, testing, and development process.

For major changes, please open an issue first to discuss what you would like to change.

---

### 👥 Contributors

| Contributor | Milestones | Link 1 | Link 2 |  PPT MS1  |  PPT MS2  |
|-------------|-------------|--------|--------|--------|--------|
| [**Shashank Reddy Y**](https://github.com/Shashank-Reddy-Y) | ✅ | [🔗](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) | [🔗](https://www.youtube.com/watch?v=2OAat-O9tiI) |[🖼️](https://docs.google.com/presentation/d/1hkraoqiPgqxAMTRiCD1xvrzdblH9ixJV/edit?usp=drive_link&ouid=112871208750488785966&rtpof=true&sd=true)|[🖼️](https://docs.google.com/presentation/d/1k44_tQRxC8tiqEMKGNxxAamb2oCeWoAb/edit?usp=drive_link&ouid=112871208750488785966&rtpof=true&sd=true) |
| [**Naveen Chandra Kanth**](https://github.com/NaveenCK-10) | ✅ | [🔗](https://drive.google.com/file/d/1Rts7q7TaapI5omlw0qFV_KxFqUi8bThU/view) | [🔗](https://youtu.be/lwAWlZbiIEQ) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |
| [**Satvik V**](https://github.com/satvik2106) | ✅ | [🔗](https://drive.google.com/file/d/1s4eZk3HqT5uchN9sxeLcd6HxGL5uHqRg/view?usp=sharing ) | [🔗](https://youtu.be/fjwtNnMoR7U) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |
| [**Aditi**](https://github.com/Aditi500-ace) | ✅ | [🔗](https://drive.google.com/file/d/14aIGteYMLMZRihXWLoF2emBLyeJd6uc0/view) | [🔗](https://www.youtube.com/watch?v=PbUxsLS-Z1w ) |[🖼️](https://drive.google.com/drive/folders/1YdCwkhUvY5H2MpUpqY-7JOB667h9TqyK) |[🖼️](https://drive.google.com/drive/folders/1r5elbmza_GlRo1y2rZS8-OoDlf-uWhxi) |
| [**Monisha Sarai**](https://github.com/monishasarai) | ✅ | [🔗](https://drive.google.com/file/d/1-FPxfE8rQpelFUe8QxZLEJ-O1JqGXROb/view?usp=sharing) | [🔗](https://youtu.be/MwL9nOHvudY2) |[🖼️](https://docs.google.com/presentation/d/1146AEUrIhc3d8jzfAjvnWN5f_4OrgW7u/edit?usp=drive_link&ouid=110890027172717740279&rtpof=true&sd=true) |[🖼️](https://docs.google.com/presentation/d/1XuCmUIAtZ8B5kSkgRiRnpykxnEmpFem8/edit?usp=drive_link&ouid=110890027172717740279&rtpof=true&sd=true) |
| [**Spandana**](https://github.com/Span1531) | ✅ | [🔗](https://youtu.be/4SZgv0JUSOE?si=lXV6CaAiMzR5eZVC) | [🔗](https://youtu.be/u2-8Ueby_Tc?si=OfX6cu478gJk_cc6) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |
| [**Vajra Chaitanya**](https://github.com/Vajra-Chaitanya) | ✅ | [🔗](https://drive.google.com/file/d/1lF_ZUxjrVLVz_F2whhQSTp726MF5AOzZ/view) | [🔗](https://drive.google.com/file/d/1ZTL0fw-yTPf6SjyKqk-O561yviX7VjBr/view ) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |[🖼️](https://drive.google.com/file/d/1LSdhs9I4q9J3JzZuaGZ9N7Xv_AcpcDro/view) |


---

**Let’s make avatars *feel* human.**
Welcome to the future of expressive AI.
