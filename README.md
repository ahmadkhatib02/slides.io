# 🧠 slides.io


---

## 🚀 Overview

**slides.io** is a lightweight **Agentic AI** system that generates PowerPoint presentations (`.pptx`) from a simple natural-language prompt.

It uses a **FastAPI backend** integrated with the open-source **SlideDeckAI** library and a **React + TypeScript** frontend to deliver instant, AI-generated decks from user topics.

This project fulfills the **Software Engineering Intern (Agentic Systems)** take-home requirement: a reproducible program that generates a PowerPoint deck derived from a text prompt.

---

## ⚙️ Features

✅ Generate `.pptx` slides from a single prompt  
✅ FastAPI backend powered by Gemini-2.5-Flash  
✅ React + TypeScript + Tailwind frontend  
✅ Instant download of generated slides  
✅ Fully reproducible local setup  
✅ CORS-enabled API connection

---

## 🧩 Architecture

```
slides.io/
├── Backend/          # FastAPI server
│   ├── main.py       # API endpoint
│   ├── .env          # stores API key
│   └── generated/    # pptx outputs
│
├── FrontEnd/         # React + TypeScript + Vite
│   ├── src/          # Components and logic
│   ├── public/
│   └── vite.config.ts
│
└── slide-deck-ai/    # Editable SlideDeckAI module
```

---

## 🧠 Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Backend  | FastAPI, Python 3.13, SlideDeckAI       |
| Frontend | React 18, TypeScript, Vite, TailwindCSS |
| AI Model | Gemini-2.5-Flash                        |
| Output   | PowerPoint (.pptx)                      |
| Tools    | Postman, VS Code, Virtual Env           |

---

## 🧰 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/slides.io.git
cd slides.io
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate   # on Windows
# source .venv/bin/activate  # on macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload
```

📍 The backend runs at **http://127.0.0.1:8000**

#### Test via Postman

**POST** `http://127.0.0.1:8000/api/generate`

**Body**

```json
{
  "prompt": "Make a presentation about Artificial Intelligence"
}
```

**Response**

```json
{
  "status": "success",
  "path": "/files/abc123def456.pptx"
}
```

---

### 3️⃣ Frontend Setup

```bash
cd ../FrontEnd
npm install
npm run dev
```

📍 The frontend runs at **http://localhost:5173**

🟢 **Important:**

> You must **start the backend first** before running the frontend — otherwise, the frontend will not reach the `/api/generate` endpoint.

---

## 🧪 Testing the App

### ✅ Using Postman

Send a POST request to `/api/generate` with a JSON body containing your topic.

The server returns the PowerPoint file path once generated.

### ✅ Using Frontend

1. Run the backend
2. Run the frontend
3. Open `http://localhost:5173`
4. Type a topic like "The Future of Renewable Energy"
5. Wait for generation — the `.pptx` file downloads automatically

---

## 🧠 Agentic Behavior

The system follows a minimal **Plan → Act → Verify** loop:

1. **Plan:** Parse the user's topic and design a slide plan
2. **Act:** Generate structured slides using Gemini-2.5-Flash
3. **Verify:** Save and return a PowerPoint file path

**Future Enhancements**

- `.potx` template customization
- Chart generation from JSON/CSV
- Automated structure validation

---

## 💡 Use of AI Tools

This project was coded manually, with minimal syntax and debugging assistance from **ChatGPT (GPT-5)**.

All logic, structure, and architecture decisions were designed independently.
