from fastapi import APIRouter
from sqlalchemy import text
from database import engine

router = APIRouter()

@router.get("/metrics")
def get_metrics():
    query = text("""
        SELECT cpu_usage, memory_usage, network_usage, recorded_at
        FROM metrics
        ORDER BY recorded_at ASC
    """)

    with engine.connect() as conn:
        rows = conn.execute(query).fetchall()

    metrics = []
    for row in rows:
        metrics.append({
            "cpu": float(row.cpu_usage),
            "memory": float(row.memory_usage),
            "network": float(row.network_usage) if row.network_usage is not None else 0.0,
            "time": row.recorded_at.strftime("%I:%M %p"),
            "recorded_at": row.recorded_at.isoformat()
        })

    latest = metrics[-1] if metrics else {
        "cpu": 0,
        "memory": 0,
        "network": 0,
        "time": "",
        "recorded_at": ""
    }

    return {
        "summary": {
            "cpu": latest["cpu"],
            "memory": latest["memory"],
            "network": latest["network"]
        },
        "trend": metrics
    }