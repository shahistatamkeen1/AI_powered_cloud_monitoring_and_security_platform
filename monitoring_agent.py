import time
import socket
import psutil
import requests

BACKEND_URL = "http://52.234.161.141:8000/metrics/ingest"
SYSTEM_NAME = socket.gethostname()

previous_net = psutil.net_io_counters()
previous_time = time.time()

while True:
    try:
        current_net = psutil.net_io_counters()
        current_time = time.time()

        total_previous = previous_net.bytes_sent + previous_net.bytes_recv
        total_current = current_net.bytes_sent + current_net.bytes_recv

        seconds = max(current_time - previous_time, 1)
        network_kbps = ((total_current - total_previous) / 1024) / seconds

        data = {
            "system_name": SYSTEM_NAME,
            "cpu_usage": psutil.cpu_percent(interval=1),
            "memory_usage": psutil.virtual_memory().percent,
            "network_usage": round(network_kbps, 2),
        }

        response = requests.post(BACKEND_URL, json=data, timeout=10)

        print("Sent:", data, "Status:", response.status_code)

        previous_net = current_net
        previous_time = current_time

    except Exception as e:
        print("Error sending metrics:", e)

    time.sleep(5)