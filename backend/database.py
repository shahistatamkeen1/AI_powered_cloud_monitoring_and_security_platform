from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import urllib

# Azure SQL ODBC connection string
odbc_conn_str = (
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=tcp:ai-sql-server123.database.windows.net,1433;"
    "Database=ai_monitoring_db;"
    "Uid=azureadmin;"
    "Pwd=pa$$w0rd;"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
    "Connection Timeout=30;"
)

# URL-encode for SQLAlchemy
params = urllib.parse.quote_plus(odbc_conn_str)
DATABASE_URL = f"mssql+pyodbc:///?odbc_connect={params}"

engine = create_engine(
    DATABASE_URL,
    fast_executemany=True,   # Boosts bulk insert performance
    echo=False               # Set True to log SQL queries (debug only)
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()