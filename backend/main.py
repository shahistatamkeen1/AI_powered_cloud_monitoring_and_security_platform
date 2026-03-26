from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from database import Base, engine
from models import User
from auth import get_current_user
from routes.auth_routes import router as auth_router
from schemas import Alert, Log, Insight, HistoryItem

app = FastAPI(title="AI Cloud Monitoring Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Backend is running"}


# Protected route
@app.get("/dashboard")
def dashboard(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Welcome {current_user.username}",
        "email": current_user.email
    }


# Public routes for frontend data loading
@app.get("/metrics")
def get_metrics():
    return {
        "cpu": 42,
        "memory": 68,
        "network": 5242880
    }


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
        },
        {
            "id": 3,
            "vmName": "vm-web02",
            "alertName": "Disk Space Low",
            "severity": "Warning",
            "status": "Acknowledged",
            "time": "10:25 AM"
        }
    ]


@app.get("/logs", response_model=List[Log])
def get_logs():
    return [
        {
            "id": 1,
            "vmName": "vm-app01",
            "message": "CPU usage exceeded threshold",
            "severity": "Critical",
            "time": "10:15 AM"
        },
        {
            "id": 2,
            "vmName": "vm-db01",
            "message": "Memory usage high",
            "severity": "Warning",
            "time": "10:05 AM"
        },
        {
            "id": 3,
            "vmName": "vm-mon01",
            "message": "System scan completed successfully",
            "severity": "Info",
            "time": "09:55 AM"
        },
        {
            "id": 4,
            "vmName": "vm-dc01",
            "message": "Multiple failed login attempts detected",
            "severity": "Critical",
            "time": "09:40 AM"
        }
    ]


@app.get("/insights", response_model=List[Insight])
def get_insights():
    return [
        {
            "id": 1,
            "title": "CPU Trend",
            "description": "CPU usage increasing over last 2 hours",
            "severity": "Warning"
        },
        {
            "id": 2,
            "title": "Memory Optimization",
            "description": "Memory usage stable but high",
            "severity": "Info"
        }
    ]


@app.get("/history", response_model=List[HistoryItem])
def get_history():
    return [
        {
            "id": 1,
            "event": "User login",
            "user": "Harini",
            "time": "09:00 AM"
        },
        {
            "id": 2,
            "event": "Alert resolved",
            "user": "Harini",
            "time": "10:30 AM"
        }
    ]