from fastapi import APIRouter
import psutil

router = APIRouter()

@router.post("/ai/analyze")
def analyze_issue():
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent

    if cpu > 80:
        return {
            "issue": "High CPU usage",
            "cause": "Heavy processing load",
            "solution": "Check running processes or scale resources"
        }
    elif memory > 85:
        return {
            "issue": "High memory usage",
            "cause": "Applications consuming too much RAM",
            "solution": "Restart services or optimize memory usage"
        }
    else:
        return {
            "status": "System is stable",
            "message": "No major issues detected"
        }