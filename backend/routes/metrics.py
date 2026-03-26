from fastapi import APIRouter
import psutil

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    return {
        "cpu": psutil.cpu_percent(interval=1),
        "memory": psutil.virtual_memory().percent,
        "network": psutil.net_io_counters().bytes_sent
    }