from PIL import Image

files = [
    "CCSAI_Thumbnail.png",
    "POV+White.webp",
    "centennial-college-logo-vector.png",
    "images.png"
]

def remove_white_bg(filepath):
    try:
        img = Image.open(filepath).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for r, g, b, a in datas:
            # If it's very close to white, make it transparent
            if r > 240 and g > 240 and b > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append((r, g, b, a))
                
        img.putdata(newData)
        
        # Determine new filename
        base = filepath.split('.')[0]
        # Handle the '+' in POV+White
        base = base.replace('+', '_')
        new_filename = f"{base}_nobg.png"
        
        img.save(new_filename, "PNG")
        print(f"Processed {filepath} -> {new_filename}")
    except Exception as e:
        print(f"Failed on {filepath}: {e}")

for f in files:
    remove_white_bg(f)
