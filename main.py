from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import time
import uvicorn
import os

app = FastAPI()

# Configuração de caminhos absolutos para evitar erros na Vercel
current_dir = os.path.dirname(os.path.realpath(__file__))
static_dir = os.path.join(current_dir, "static")
templates_dir = os.path.join(current_dir, "templates")

# Montar arquivos estáticos
app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Configurar templates
templates = Jinja2Templates(directory=templates_dir)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    start_time = time.time()
    
    # Processamento fake simulado
    
    render_time = round((time.time() - start_time) * 1000, 2)
    
    return templates.TemplateResponse("index.html", {
        "request": request,
        "render_time": render_time,
        "server_location": "São Paulo, BR (Vercel)"
    })

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
