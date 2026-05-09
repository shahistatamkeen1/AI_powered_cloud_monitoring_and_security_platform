from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_alerts_endpoint():
    response = client.get("/alerts")
    assert response.status_code in [200, 404]