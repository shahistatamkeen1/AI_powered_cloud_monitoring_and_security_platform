from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    alerts = []

    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent
    disk = psutil.disk_usage('/').percent

    # CPU alert
    if cpu > 80:
        alerts.append({
            "type": "CPU",
            "value": cpu,
            "status": "Critical"
        })

    # Memory alert
    if memory > 85:
        alerts.append({
            "type": "Memory",
            "value": memory,
            "status": "Critical"
        })

    # Disk alert
    if disk > 75:
        alerts.append({
            "type": "Disk",
            "value": disk,
            "status": "Warning"
        })

    # If no alerts
    if not alerts:
        alerts.append({
            "type": "System",
            "value": 0,
            "status": "All systems normal"
        })

    return alerts