import socket
import json
import sys

blender_code = """
import bpy
import bmesh
import math
import os

out_dir = "/Users/bebrilliant/Documents/antigravity/YA.comwebsite/public"
letters = ['S', 'T', 'O', 'R', 'Y', 'E', 'L', 'A']

for char in letters:
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    
    for block in bpy.data.materials:
        bpy.data.materials.remove(block)
    for block in bpy.data.particles:
        bpy.data.particles.remove(block)
        
    bpy.context.scene.render.engine = 'CYCLES'
    bpy.context.scene.cycles.device = 'GPU'
    bpy.context.scene.cycles.samples = 128
    bpy.context.scene.render.film_transparent = True
    bpy.context.scene.render.resolution_x = 1000
    bpy.context.scene.render.resolution_y = 1000
    
    mat = bpy.data.materials.new(name="FurMaterial")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    principled = nodes.get("Principled BSDF")
    if principled:
        principled.inputs["Base Color"].default_value = (0.85, 0.35, 0.5, 1.0)
        principled.inputs["Roughness"].default_value = 0.85
    
    bpy.ops.object.text_add(location=(0, 0, 0))
    text_obj = bpy.context.active_object
    text_obj.data.body = char
    text_obj.data.align_x = 'CENTER'
    text_obj.data.align_y = 'CENTER'
    
    font_path = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
    if os.path.exists(font_path):
        fnt = bpy.data.fonts.load(font_path)
        text_obj.data.font = fnt
    
    text_obj.data.extrude = 0.1
    text_obj.data.bevel_depth = 0.015
    text_obj.data.bevel_resolution = 4
    
    bpy.ops.object.convert(target='MESH')
    bpy.ops.object.modifier_add(type='REMESH')
    remesh = text_obj.modifiers["Remesh"]
    remesh.mode = 'VOXEL'
    remesh.voxel_size = 0.015
    bpy.ops.object.modifier_apply(modifier="Remesh")
    bpy.ops.object.shade_smooth()
    
    text_obj.data.materials.append(mat)
    
    bpy.ops.object.modifier_add(type='PARTICLE_SYSTEM')
    psys = text_obj.particle_systems[0]
    psettings = psys.settings
    psettings.type = 'HAIR'
    psettings.hair_length = 0.18
    psettings.count = 20000
    psettings.render_type = 'PATH'
    psettings.child_type = 'INTERPOLATED'
    psettings.rendered_child_count = 35
    psettings.child_radius = 0.2
    psettings.clump_factor = 0.7
    psettings.clump_shape = -0.3
    psettings.hair_step = 5
    
    # Hide emitter from render to prevent dark shadows inside the mesh
    text_obj.show_instancer_for_render = False
    
    # Enable Hair Dynamics on the particle system itself
    psys.use_hair_dynamics = True
    
    # Add Wind Force Field
    bpy.ops.object.effector_add(type='WIND', location=(-1.5, -0.5, 0), rotation=(math.radians(20), math.radians(90), 0))
    wind = bpy.context.active_object
    wind.modifiers.new(name="Wind", type='COLLISION')
    wind.field.strength = 12.0
    wind.field.noise = 5.0
    
    # Bake dynamics by setting frame
    bpy.context.scene.frame_set(30)
    
    bpy.ops.object.light_add(type='AREA', location=(2, -2, 2))
    light1 = bpy.context.active_object
    light1.data.energy = 800
    light1.data.size = 2
    
    bpy.ops.object.light_add(type='AREA', location=(-2, 2, 2))
    light2 = bpy.context.active_object
    light2.data.energy = 500
    light2.data.size = 2
    
    bpy.ops.object.camera_add(location=(0, 0, 3.4), rotation=(0, 0, 0))
    cam = bpy.context.active_object
    bpy.context.scene.camera = cam
    
    out_path = os.path.join(out_dir, f"3d_text_fur_{char}.png")
    bpy.context.scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered {char} to {out_path}")
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
