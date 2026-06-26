import socket
import json
import sys

blender_code = """
import bpy
import bmesh
import math
import os

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

# Fix light bounces for hair
bpy.context.scene.cycles.max_bounces = 8
bpy.context.scene.cycles.transparent_max_bounces = 8

mat = bpy.data.materials.new(name="FurMaterial")
mat.use_nodes = True
nodes = mat.node_tree.nodes
principled = nodes.get("Principled BSDF")
if principled:
    # Bright, soft pink
    principled.inputs["Base Color"].default_value = (0.9, 0.5, 0.65, 1.0)
    principled.inputs["Roughness"].default_value = 0.6
    # Subsurface scattering to remove harsh black shadows in the roots
    if "Subsurface Weight" in principled.inputs:
        principled.inputs["Subsurface Weight"].default_value = 1.0
        principled.inputs["Subsurface Radius"].default_value = (1.0, 0.2, 0.1)
        principled.inputs["Subsurface Color"].default_value = (1.0, 0.4, 0.6, 1.0)

bpy.ops.object.text_add(location=(0, 0, 0))
text_obj = bpy.context.active_object
text_obj.data.body = "S"
text_obj.data.align_x = 'CENTER'
text_obj.data.align_y = 'CENTER'

font_path = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
if os.path.exists(font_path):
    fnt = bpy.data.fonts.load(font_path)
    text_obj.data.font = fnt

text_obj.data.extrude = 0.1
text_obj.data.bevel_depth = 0.02
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
psettings.hair_length = 0.12
psettings.count = 20000
psettings.render_type = 'PATH'
psettings.child_type = 'INTERPOLATED'
psettings.rendered_child_count = 35
psettings.child_radius = 0.2
psettings.clump_factor = 0.3  # Less clumping so roots don't pinch into black spikes
psettings.clump_shape = -0.2
psettings.hair_step = 5

# KEEP emitter rendering, so we don't see through the gaps to black
text_obj.show_instancer_for_render = True

# Add massive front light to blast away shadows
bpy.ops.object.light_add(type='AREA', location=(0, 0, 4))
light_front = bpy.context.active_object
light_front.data.energy = 1500
light_front.data.size = 5

bpy.ops.object.light_add(type='AREA', location=(2, -2, 2))
light1 = bpy.context.active_object
light1.data.energy = 800
light1.data.size = 3

bpy.ops.object.light_add(type='AREA', location=(-2, 2, 2))
light2 = bpy.context.active_object
light2.data.energy = 500
light2.data.size = 3

bpy.ops.object.camera_add(location=(0, 0, 3.4), rotation=(0, 0, 0))
cam = bpy.context.active_object
bpy.context.scene.camera = cam

out_path = "/Users/bebrilliant/Documents/antigravity/YA.comwebsite/public/test_fur_bright_S.png"
bpy.context.scene.render.filepath = out_path
bpy.ops.render.render(write_still=True)
print("Rendered bright test to", out_path)
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
