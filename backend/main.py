from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from backend.database import Base, engine
from backend.models import User
from backend.auth import get_current_user

from backend.routes.ai import router as ai_router
from backend.routes.auth_routes import router as auth_router
from backend.routes.metrics import router as metrics_router

from backend.schemas import Alert, Log, Insight, HistoryItem

# ✅ Create FastAPI app FIRST
app = FastAPI(title="AI Cloud Monitoring Backend")

# ✅ CORS (frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables
Base.metadata.create_all(bind=engine)

# ✅ Include routers
app.include_router(auth_router)
app.include_router(ai_router)
app.include_router(metrics_router)   # 🔥 real-time metrics

# ✅ Root
@app.get("/")
def root():
    return {"message": "Backend is running"}


# ✅ Protected route
@app.get("/dashboard")
def dashboard(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Welcome {current_user.username}",
        "email": current_user.email
    }


# ❌ REMOVE OLD /metrics (NOW HANDLED IN metrics.py)


# ✅ Alerts
@app.get("/alerts", response_model=List[Alert])
def get_alerts():
    return [
        {
            "id": 1,
            "vmName": "vm-app01",
            "alertName": "CPU Usage High",
            "severity": "Warning",
            "status": "Open",
            "time": "10:15 AM"
        },
        {
            "id": 2,
            "vmName": "vm-db01",
            "alertName": "Memory Critical",
            "severity": "Critical",
            "status": "Open",
            "time": "10:18 AM"
        }
    ]


# ✅ Logs
@app.get("/logs", response_model=List[Log])
def get_logs():
    return [
        {
            "id": 1,
            "vmName": "vm-app01",
            "message": "CPU usage exceeded threshold",
            "severity": "Critical",
            "time": "10:15 AM"
        }
    ]


# ✅ Insights
@app.get("/insights", response_model=List[Insight])
def get_insights():
    return [
        {
            "id": 1,
            "title": "CPU Trend",
            "description": "CPU usage increasing",
            "severity": "Warning"
        }
    ]


# ✅ History
@app.get("/history", response_model=List[HistoryItem])
def get_history():
    return [
        {
            "id": 1,
            "event": "User login",
            "user": "Harini",
            "time": "09:00 AM"
        }
    ]