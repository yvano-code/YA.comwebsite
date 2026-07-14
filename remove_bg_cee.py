from PIL import Image

filepath = "public/projects/collaborators/CEE_toronto.png"
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
    
    new_filename = "public/projects/collaborators/CEE_toronto_nobg.png"
    img.save(new_filename, "PNG")
    print(f"Processed {filepath} -> {new_filename}")
except Exception as e:
    print(f"Failed on {filepath}: {e}")
