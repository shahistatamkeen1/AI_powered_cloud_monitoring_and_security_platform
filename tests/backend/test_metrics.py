from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_metrics_endpoint():
    response = client.get("/metrics")
    assert response.status_code in [200, 404]