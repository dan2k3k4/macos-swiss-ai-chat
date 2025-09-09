from fastapi import FastAPI, Form, Request
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from mlx_lm import load, generate

app = FastAPI()
app.add_middleware(GZipMiddleware)
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

# Server-side templates
templates = Jinja2Templates(directory="dist/templates")

# Load the model and tokenizer
model, tokenizer = load("mlx-community/Apertus-8B-Instruct-2509-8bit")

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/", response_class=JSONResponse)
async def generate_text(request: Request, prompt: str = Form(...)):
    if tokenizer.chat_template is not None:
        messages = [{"role": "user", "content": prompt}]
        prompt = tokenizer.apply_chat_template(
            messages, add_generation_prompt=True
        )
    response = generate(model, tokenizer, prompt=prompt, verbose=True)
    return response

@app.exception_handler(404)
async def not_found_exception_handler(request: Request, exc: 404):
    return templates.TemplateResponse("404.html", {"request": request})

@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):
    return templates.TemplateResponse("error.html", {"request": request, "error": exc})