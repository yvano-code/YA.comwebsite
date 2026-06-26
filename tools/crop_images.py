import os
from PIL import Image

def main():
    files = [os.path.join("public", f) for f in os.listdir("public") if f.startswith("3d_text_") and f.endswith(".png")]
    
    for file in files:
        img = Image.open(file)
        alpha = img.split()[-1]
        bbox = alpha.getbbox()
        
        if bbox:
            cropped = img.crop(bbox)
            cropped.save(file)
            print(f"Cropped {file} tightly to {bbox}")

if __name__ == "__main__":
    main()
