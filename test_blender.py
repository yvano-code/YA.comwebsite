import socket
import json
import sys

payload = {
    "type": "execute_code",
    "params": {
        "code": "print('Hello from Antigravity')"
    }
}

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(2.0)
    s.connect(("localhost", 9876))
    s.sendall(json.dumps(payload).encode('utf-8'))
    response = s.recv(8192)
    print("Response:", response.decode('utf-8'))
except Exception as e:
    print("Error:", e)
    sys.exit(1)
