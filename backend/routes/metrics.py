from fastapi import APIRouter
from sqlalchemy import text
from ..database import engine
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
import os
import json

# Load backend/.env correctly
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

router = APIRouter(prefix="/metrics", tags=["metrics"])

api_key = os.getenv("OPENAI_API_KEY")
print("METRICS API KEY LOADED:", "YES" if api_key else "NO")

client = OpenAI(api_key=api_key) if api_key else None


@router.get("/history")
def get_metrics_history():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT TOP 20 cpu_usage, memory_usage, network_usage, recorded_at
            FROM metrics
            ORDER BY recorded_at DESC
        """))
        rows = result.fetchall()

    return [
        {
            "cpu": float(row[0]) if row[0] is not None else 0,
            "memory": float(row[1]) if row[1] is not None else 0,
            "network": float(row[2]) if row[2] is not None else 0,
            "time": row[3].strftime("%H:%M:%S") if row[3] else ""
        }
        for row in reversed(rows)
    ]


@router.get("/summary")
def get_summary():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT TOP 1 cpu_usage, memory_usage, network_usage, recorded_at
            FROM metrics
            ORDER BY recorded_at DESC
        """))
        row = result.fetchone()

    if not row:
        return {"cpu": 0, "memory": 0, "network": 0, "time": ""}

    return {
        "cpu": float(row[0]) if row[0] is not None else 0,
        "memory": float(row[1]) if row[1] is not None else 0,
        "network": float(row[2]) if row[2] is not None else 0,
        "time": row[3].strftime("%Y-%m-%d %H:%M:%S") if row[3] else ""
    }


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
            "cpu": 0,
            "memory": 0,
            "network": 0,
            "health": "Unknown",
            "insights": ["No data available yet."],
            "recommendation": "Collect more metrics before analysis."
        }

    cpu_values = [float(r[0]) for r in rows if r[0] is not None]
    memory_values = [float(r[1]) for r in rows if r[1] is not None]
    network_values = [float(r[2]) for r in rows if r[2] is not None]

    latest_cpu = cpu_values[0] if cpu_values else 0
    latest_memory = memory_values[0] if memory_values else 0
    latest_network = network_values[0] if network_values else 0

    avg_cpu = sum(cpu_values) / len(cpu_values) if cpu_values else 0
    avg_memory = sum(memory_values) / len(memory_values) if memory_values else 0
    avg_network = sum(network_values) / len(network_values) if network_values else 0

    prompt = f"""
You are an AI cloud monitoring assistant.

Analyze these recent cloud system metrics and return ONLY valid JSON.
Do not include markdown, explanation, or code block fences.

Return exactly in this format:
{{
  "health": "Healthy or Warning or Critical",
  "insights": ["short insight 1", "short insight 2", "short insight 3"],
  "recommendation": "one short practical recommendation"
}}

Recent CPU values: {cpu_values}
Recent Memory values: {memory_values}
Recent Network values: {network_values}

Latest CPU: {latest_cpu}
Latest Memory: {latest_memory}
Latest Network: {latest_network}

Average CPU: {avg_cpu:.2f}
Average Memory: {avg_memory:.2f}
Average Network: {avg_network:.2f}

Identify spikes, abnormal behavior, or stability.
Keep the output short, practical, and easy to understand.
"""

    try:
        if not client:
            raise RuntimeError("OPENAI_API_KEY is missing")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a cloud operations AI assistant. Always return valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content.strip()

        if content.startswith("```"):
            content = content.strip("`")
            if content.startswith("json"):
                content = content[4:].strip()

        parsed = json.loads(content)

        health = parsed.get("health", "Unknown")
        insights = parsed.get("insights", [])
        recommendation = parsed.get("recommendation", "")

        if not isinstance(insights, list):
            insights = [str(insights)]

        with engine.begin() as conn:
            conn.execute(
                text("""
                    INSERT INTO ai_results (health, recommendation, insights, cpu, memory, network)
                    VALUES (:health, :recommendation, :insights, :cpu, :memory, :network)
                """),
                {
                    "health": health,
                    "recommendation": recommendation,
                    "insights": json.dumps(insights),
                    "cpu": latest_cpu,
                    "memory": latest_memory,
                    "network": latest_network
                }
            )

        return {
            "status": "success",
            "message": "AI analysis completed",
            "cpu": latest_cpu,
            "memory": latest_memory,
            "network": latest_network,
            "health": health,
            "insights": insights,
            "recommendation": recommendation
        }

    except Exception as e:
        fallback_insights = []

        if latest_cpu >= 85:
            fallback_insights.append("CPU usage is critically high.")
        elif latest_cpu >= 70:
            fallback_insights.append("CPU usage is elevated.")

        if latest_memory >= 80:
            fallback_insights.append("Memory usage is high.")
        elif latest_memory >= 65:
            fallback_insights.append("Memory usage is moderately elevated.")

        if latest_network >= 240:
            fallback_insights.append("Network traffic shows a strong spike.")
        elif latest_network >= 180:
            fallback_insights.append("Network traffic is above normal.")

        if not fallback_insights:
            fallback_insights.append("System metrics are currently stable.")

        if latest_cpu >= 85 or latest_memory >= 80 or latest_network >= 240:
            fallback_health = "Critical"
            fallback_recommendation = "Investigate system load immediately and consider scaling resources."
        elif latest_cpu >= 70 or latest_memory >= 65 or latest_network >= 180:
            fallback_health = "Warning"
            fallback_recommendation = "Monitor resource usage closely and optimize workload distribution."
        else:
            fallback_health = "Healthy"
            fallback_recommendation = "Continue monitoring. No immediate action is required."

        return {
            "status": "success",
            "message": f"AI analysis fallback used: {str(e)}",
            "cpu": latest_cpu,
            "memory": latest_memory,
            "network": latest_network,
            "health": fallback_health,
            "insights": fallback_insights,
            "recommendation": fallback_recommendation
        }


@router.get("/ai-history")
def get_ai_history():
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT TOP 10 id, health, recommendation, insights, cpu, memory, network, created_at
            FROM ai_results
            ORDER BY created_at DESC
        """))
        rows = result.fetchall()

    history = []
    for row in rows:
        try:
            parsed_insights = json.loads(row[3]) if row[3] else []
        except Exception:
            parsed_insights = [row[3]] if row[3] else []

        history.append({
            "id": row[0],
            "health": row[1],
            "recommendation": row[2],
            "insights": parsed_insights,
            "cpu": float(row[4]) if row[4] is not None else 0,
            "memory": float(row[5]) if row[5] is not None else 0,
            "network": float(row[6]) if row[6] is not None else 0,
            "created_at": row[7].strftime("%Y-%m-%d %H:%M:%S") if row[7] else ""
        })

    return history