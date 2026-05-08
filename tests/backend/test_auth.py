from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_register_endpoint_exists():
    response = client.post("/auth/register", json={})
    assert response.status_code in [400, 422]

def test_login_endpoint_exists():
    response = client.post("/auth/login", json={})
    assert response.status_code in [400, 422]