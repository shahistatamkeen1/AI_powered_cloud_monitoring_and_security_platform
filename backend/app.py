from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import alerts, ai, metrics

# ✅ FIRST create app
app = FastAPI(
    title="AI Cloud Monitoring Backend",
    version="1.0.0"
)

# ✅ THEN add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ THEN include routers
app.include_router(alerts.router)
app.include_router(ai.router)
app.include_router(metrics.router)


# Root route
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}