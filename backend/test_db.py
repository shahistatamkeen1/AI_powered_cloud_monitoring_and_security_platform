import pyodbc

conn = pyodbc.connect(
    "Driver={ODBC Driver 18 for SQL Server};"
    "Server=tcp:ai-sql-server123.database.windows.net,1433;"
    "Database=ai_monitoring_db;"
    "Uid=azureadmin;"
    "Pwd=YOUR_PASSWORD_HERE;"
    "Encrypt=yes;"
    "TrustServerCertificate=no;"
)

print("Connected successfully!")
conn.close()