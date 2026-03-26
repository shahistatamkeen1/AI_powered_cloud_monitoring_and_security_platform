from pydantic import BaseModel, EmailStr


# -------- AUTH --------
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# -------- ALERTS --------
class Alert(BaseModel):
    id: int
    vmName: str
    alertName: str
    severity: str
    status: str
    time: str


# -------- LOGS --------
class Log(BaseModel):
    id: int
    vmName: str
    message: str
    severity: str
    time: str


# -------- INSIGHTS --------
class Insight(BaseModel):
    id: int
    title: str
    description: str
    severity: str


# -------- HISTORY --------
class HistoryItem(BaseModel):
    id: int
    event: str
    user: str
    time: str