from PIL import Image
import glob
import os

out_dir = "/Users/bebrilliant/Documents/antigravity/YA.comwebsite/public"
for img_path in glob.glob(f"{out_dir}/3d_text_fur_*.png"):
    try:
        img = Image.open(img_path)
        img = img.convert("RGBA")
        bbox = img.getbbox()
        if bbox:
            cropped_img = img.crop(bbox)
            cropped_img.save(img_path)
            print(f"Cropped {os.path.basename(img_path)} to {bbox}")
        else:
            print(f"Warning: Empty bounding box for {img_path}")
    except Exception as e:
        print(f"Error cropping {img_path}: {e}")
