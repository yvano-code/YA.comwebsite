import socket
import json
import sys

blender_code = """
import bpy
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()
# Create a test cube
bpy.ops.mesh.primitive_cube_add()
"""

payload = {
    "type": "execute_code",
    "params": {
        "code": blender_code
    }
}

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("localhost", 9876))
    s.sendall(json.dumps(payload).encode('utf-8'))
    response = s.recv(8192)
    print("Response:", response.decode('utf-8'))
except Exception as e:
    print("Error:", e)
    sys.exit(1)
