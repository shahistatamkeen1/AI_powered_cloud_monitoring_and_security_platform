from fastapi import APIRouter, Depends, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin, Token
from auth import hash_password, authenticate_user, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


@router.post("/login", response_model=Token)
def login_json(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.email, user.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/token", response_model=Token, include_in_schema=False)
def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Swagger sends username/password; here username = user's email
    db_user = authenticate_user(db, form_data.username, form_data.password)

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": db_user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }