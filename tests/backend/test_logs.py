from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_logs_endpoint():
    response = client.get("/logs")
    assert response.status_code in [200, 404]