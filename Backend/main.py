import os, shutil, uuid
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slidedeckai import SlideDeckAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

OUTPUT_DIR = os.path.abspath("generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

app.mount("/files", StaticFiles(directory=OUTPUT_DIR), name="files")

class GenerateReq(BaseModel):
    prompt: str

@app.post("/api/generate")
def generate_prompt(req: GenerateReq):
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(500, "GOOGLE_API_KEY is not set")

    try:
        slide_generator = SlideDeckAI(
            model='[gg]gemini-2.5-flash',
            topic=req.prompt,
            api_key=api_key,
        )
        pptx_path = slide_generator.generate()  

        
        filename = f"{uuid.uuid4().hex}.pptx"
        dest_path = os.path.join(OUTPUT_DIR, filename)
        shutil.copy(pptx_path, dest_path)

        
        return {
            "status": "success",
            "path": f"/files/{filename}"                    
        }

    except Exception as e:
        raise HTTPException(500, str(e))
