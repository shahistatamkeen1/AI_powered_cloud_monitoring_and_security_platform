from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    alerts = []

    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent

    if cpu > 25:
        alerts.append({
            "type": "CPU",
            "value": cpu,
            "status": "Critical"
        })

    if memory > 85:
        alerts.append({
            "type": "Memory",
            "value": memory,
            "status": "Critical"
        })

    if not alerts:
        alerts.append({
            "type": "System",
            "value": 0,
            "status": "All systems normal"
        })

    return alerts