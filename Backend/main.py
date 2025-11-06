from fastapi import FastAPI
from slidedeckai import SlideDeckAI

app = FastAPI()

@app.get("/")
def root():
    try:
        slide_generator = SlideDeckAI(
        model='[gg]gemini-2.5-flash',
        topic='Make a slide deck on the introduction of marvel, make it short simple',
        api_key='AIzaSyDDyDQtYcOkCJ4J9U7ZxLuAAFGSkWaNJqw',
        )
        pptx_path = slide_generator.generate()
        return {"status": "success",
                "Path": pptx_path}
    except Exception as e: 
        return {"status": "error", 
                "message": str(e)}