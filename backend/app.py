from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.analyze import router as analyze_router
from routes.upload import router as upload_router

app = FastAPI(
    title="AI Candle Predictor API",
    version="1.0.0",
    description="AI Powered OHLC Candle Prediction using Gemini"
)

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Routes
# -----------------------------

app.include_router(upload_router)
app.include_router(analyze_router)

# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "success": True,
        "project": "AI Candle Predictor",
        "version": "1.0.0",
        "status": "Running"
    }

# -----------------------------
# Health Check
# -----------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }