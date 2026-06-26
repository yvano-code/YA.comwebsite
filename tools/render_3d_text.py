import socket
import json
import sys

blender_code = """
import bpy
import math

# Clear scene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete()

# Render settings
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'GPU'
scene.cycles.samples = 64 # High quality, fast enough
scene.render.film_transparent = True
scene.render.resolution_x = 2048
scene.render.resolution_y = 2048

# sRGB to Linear helper
def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else math.pow((c + 0.055) / 1.055, 2.4)

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    r, g, b = tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))
    return (srgb_to_linear(r/255.0), srgb_to_linear(g/255.0), srgb_to_linear(b/255.0), 1.0)

# Colors
color_face = hex_to_rgb('#FFD700')
color_side = hex_to_rgb('#0a1128')

# Create materials
mat_face = bpy.data.materials.new(name="Face")
mat_face.use_nodes = True
bsdf_face = mat_face.node_tree.nodes.get('Principled BSDF')
if bsdf_face:
    bsdf_face.inputs['Base Color'].default_value = color_face
    bsdf_face.inputs['Roughness'].default_value = 0.15 # Glossy
    bsdf_face.inputs['Specular IOR Level'].default_value = 0.8

mat_side = bpy.data.materials.new(name="Side")
mat_side.use_nodes = True
bsdf_side = mat_side.node_tree.nodes.get('Principled BSDF')
if bsdf_side:
    bsdf_side.inputs['Base Color'].default_value = color_side
    bsdf_side.inputs['Roughness'].default_value = 0.3 # Slightly more matte

# Key light (Top-Left)
key_light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
key_light_data.energy = 50000
key_light_data.size = 10
key_light_obj = bpy.data.objects.new(name="Key_Light", object_data=key_light_data)
bpy.context.collection.objects.link(key_light_obj)
key_light_obj.location = (-10, 10, 20)

# Fill light (Bottom-Right)
fill_light_data = bpy.data.lights.new(name="Fill_Light", type='AREA')
fill_light_data.energy = 10000
fill_light_data.size = 20
fill_light_obj = bpy.data.objects.new(name="Fill_Light", object_data=fill_light_data)
bpy.context.collection.objects.link(fill_light_obj)
fill_light_obj.location = (10, -10, 10)

# Camera setup
cam_data = bpy.data.cameras.new("Camera")
cam_data.type = 'PERSP'
cam_data.lens = 35
cam_obj = bpy.data.objects.new("Camera", cam_data)
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Look straight down at the text
cam_obj.location = (0, 0, 10)
cam_obj.rotation_euler = (0, 0, 0)

# Text parts
parts = ["S", "T", "O", "R", "Y", "A", "E", "L"]
font_path = "/System/Library/Fonts/Supplemental/Arial Rounded Bold.ttf"
try:
    font_data = bpy.data.fonts.load(font_path)
except:
    font_data = None

for part in parts:
    for obj in bpy.context.scene.objects:
        if obj.type == 'FONT':
            bpy.data.objects.remove(obj, do_unlink=True)
            
    bpy.ops.object.text_add(location=(0, 0, 0))
    text_obj = bpy.context.active_object
    text_obj.data.body = part
    if font_data:
        text_obj.data.font = font_data
    
    # 3D Settings
    text_obj.data.extrude = 0.05
    text_obj.data.bevel_depth = 0.005
    text_obj.data.bevel_resolution = 6
    text_obj.data.space_character = 1.0
    text_obj.data.space_line = 1.0
    
    # Materials
    text_obj.data.materials.append(mat_face)
    text_obj.data.materials.append(mat_side)
    text_obj.data.materials.append(mat_face)
    
    # Flat face against camera!
    text_obj.rotation_euler = (0, 0, 0)
    
    # Center the text object's origin
    bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
    
    # Offset the text to generate the perspective shadow (Down & Right)
    text_obj.location = (1.5, -1.5, 0)
    
    # Fixed orthographic scale so all text pieces are perfectly proportional to one another
    cam_data.ortho_scale = 3.0
        
    scene.render.filepath = f"/Users/bebrilliant/Documents/antigravity/YA.comwebsite/public/3d_text_{part}.png"
    bpy.ops.render.render(write_still=True)
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
