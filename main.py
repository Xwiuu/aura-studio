# main.py
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import time
import uvicorn

app = FastAPI()

# Montar arquivos estáticos (CSS/JS)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    start_time = time.time()
    
    # Processamento fake para simular "cálculo de atmosfera"
    # Em um app real, aqui viriam dados do banco
    
    render_time = round((time.time() - start_time) * 1000, 2)
    
    return templates.TemplateResponse("index.html", {
        "request": request,
        "render_time": render_time,
        "server_location": "São Paulo, BR"
    })

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)