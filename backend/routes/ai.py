import os
import json
from fastapi import APIRouter, HTTPException
import psutil
from openai import OpenAI

router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@router.post("/ai/analyze")
def analyze_issue():
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent

    try:
        prompt = f"""
        Analyze this system data:

        CPU Usage: {cpu}%
        Memory Usage: {memory}%

        Return ONLY valid JSON (no markdown, no explanation) like:
        {{
          "issue": "...",
          "cause": "...",
          "recommendation": "...",
          "severity": "Low/Medium/High"
        }}
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )

        ai_text = response.choices[0].message.content

        # Convert AI text → JSON safely
        ai_data = json.loads(ai_text)

        return {
            "cpu": cpu,
            "memory": memory,
            "ai_analysis": ai_data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))