import os
import urllib
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

odbc_conn_str = os.getenv("AZURE_SQL_ODBC_CONNECTION")

if not odbc_conn_str:
    raise ValueError("AZURE_SQL_ODBC_CONNECTION is not set in environment variables")

params = urllib.parse.quote_plus(odbc_conn_str)

DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
    pool_timeout=30,
    fast_executemany=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()