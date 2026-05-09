import pyodbc

conn = pyodbc.connect(
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=tcp:ai-sql-server123.database.windows.net,1433;"
    "Database=ai_monitoring_db;"
    "Uid=azureadmin;"
    "Pwd=CloudAdmin2026!;"
    "Encrypt=yes;"
    "TrustServerCertificate=yes;"
)

print("Connected successfully!")
conn.close()