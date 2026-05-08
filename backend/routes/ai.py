from fastapi import APIRouter
from sqlalchemy import text
from ..database import engine
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

print("API KEY LOADED:", api_key)  # 👈 DEBUG

router = APIRouter(prefix="/metrics", tags=["metrics"])

client = OpenAI(api_key=api_key)

@router.get("/ai-insights")
def get_ai_insights():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT TOP 10 cpu_usage, memory_usage, network_usage, recorded_at
            FROM metrics
            ORDER BY recorded_at DESC
        """))
        rows = result.fetchall()

    if not rows:
        return {
            "status": "success",
            "message": "No metrics data available",
            "insights": ["No data available yet."]
        }

    rows = list(rows)
    latest = rows[0]

    cpu_values = [float(r[0]) for r in rows]
    memory_values = [float(r[1]) for r in rows]
    network_values = [float(r[2]) for r in rows]

    prompt = f"""
You are an AI cloud monitoring assistant.

Analyze these recent cloud metrics and return:
1. Overall health status
2. 3 short insights
3. 1 recommendation

Recent CPU values: {cpu_values}
Recent Memory values: {memory_values}
Recent Network values: {network_values}

Latest CPU: {float(latest[0])}
Latest Memory: {float(latest[1])}
Latest Network: {float(latest[2])}

Keep the response short, practical, and easy to understand.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You analyze infrastructure metrics."},
            {"role": "user", "content": prompt}
        ]
    )

    ai_text = response.choices[0].message.content

    return {
        "status": "success",
        "message": "AI analysis completed",
        "cpu": float(latest[0]),
        "memory": float(latest[1]),
        "network": float(latest[2]),
        "insights": ai_text
    }