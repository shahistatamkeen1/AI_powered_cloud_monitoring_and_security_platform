from fastapi import FastAPI, Depends, Request
from fastapi.responses import Response
from typing import List
import threading
import time
import random
from datetime import datetime
from sqlalchemy import text

from .database import Base, engine
from .models import User
from .auth import get_current_user
from .routes.auth_routes import router as auth_router
from .routes.metrics import router as metrics_router
from .schemas import Alert, Log, Insight, HistoryItem

app = FastAPI(title="AI Cloud Monitoring Backend")


@app.middleware("http")
async def cors_fix(request: Request, call_next):
    origin = request.headers.get("origin", "*")

    if request.method == "OPTIONS":
        response = Response(status_code=200)
    else:
        response = await call_next(request)

    response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"

    return response


Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(metrics_router)


@app.on_event("startup")
def start_metrics_thread():
    thread = threading.Thread(target=generate_metrics, daemon=True)
    thread.start()


@app.get("/")
def root():
    return {"message": "Backend is running"}


@app.get("/dashboard")
def dashboard(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Welcome {current_user.username}",
        "email": current_user.email,
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
            "time": "10:15 AM",
        },
        {
            "id": 2,
            "vmName": "vm-db01",
            "alertName": "Memory Critical",
            "severity": "Critical",
            "status": "Open",
            "time": "10:18 AM",
        },
        {
            "id": 3,
            "vmName": "vm-web02",
            "alertName": "Disk Space Low",
            "severity": "Warning",
            "status": "Acknowledged",
            "time": "10:25 AM",
        },
    ]


@app.get("/logs", response_model=List[Log])
def get_logs():
    return [
        {
            "id": 1,
            "vmName": "vm-app01",
            "message": "CPU usage exceeded threshold",
            "severity": "Critical",
            "time": "10:15 AM",
        },
        {
            "id": 2,
            "vmName": "vm-db01",
            "message": "Memory usage high",
            "severity": "Warning",
            "time": "10:05 AM",
        },
        {
            "id": 3,
            "vmName": "vm-mon01",
            "message": "System scan completed successfully",
            "severity": "Info",
            "time": "09:55 AM",
        },
        {
            "id": 4,
            "vmName": "vm-dc01",
            "message": "Multiple failed login attempts detected",
            "severity": "Critical",
            "time": "09:40 AM",
        },
    ]


@app.get("/insights", response_model=List[Insight])
def get_insights():
    return [
        {
            "id": 1,
            "title": "CPU Trend",
            "description": "CPU usage increasing over last 2 hours",
            "severity": "Warning",
        },
        {
            "id": 2,
            "title": "Memory Optimization",
            "description": "Memory usage stable but high",
            "severity": "Info",
        },
    ]


@app.get("/history", response_model=List[HistoryItem])
def get_history():
    return [
        {
            "id": 1,
            "event": "User login",
            "user": "Harini",
            "status": "Acknowledged",
            "time": "09:00 AM",
        },
        {
            "id": 2,
            "event": "Alert resolved",
            "user": "Harini",
            "status": "Resolved",
            "time": "10:30 AM",
        },
        {
            "id": 3,
            "event": "AI analysis completed",
            "user": "System",
            "status": "Acknowledged",
            "time": "11:15 AM",
        },
        {
            "id": 4,
            "event": "Critical alert generated",
            "user": "System",
            "status": "Critical",
            "time": "11:45 AM",
        },
    ]


def generate_metrics():
    while True:
        cpu = random.randint(40, 90)
        memory = random.randint(50, 85)
        network = random.randint(100, 300)

        with engine.connect() as conn:
            conn.execute(
                text("""
                    INSERT INTO metrics (cpu_usage, memory_usage, network_usage, recorded_at)
                    VALUES (:cpu, :memory, :network, :time)
                """),
                {
                    "cpu": cpu,
                    "memory": memory,
                    "network": network,
                    "time": datetime.now(),
                },
            )
            conn.commit()

        time.sleep(5)