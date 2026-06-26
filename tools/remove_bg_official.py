from PIL import Image, ImageEnhance
import numpy as np

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    data = np.array(img)
    r, g, b, a = data[:,:,0].astype(float), data[:,:,1].astype(float), data[:,:,2].astype(float), data[:,:,3].astype(float)
    
    # Calculate luminance
    luminance = (0.299 * r + 0.587 * g + 0.114 * b)
    
    # We want dark pixels to be opaque and light pixels to be transparent
    new_alpha = np.clip((255 - luminance) * 2.5, 0, 255).astype(np.uint8)
    
    # Create pure black image with the new alpha
    data[:,:,0] = 0
    data[:,:,1] = 0
    data[:,:,2] = 0
    data[:,:,3] = new_alpha
    
    out_img = Image.fromarray(data)
    out_img.save(output_path, format="PNG")
    print(f"Saved to {output_path}")

process_image("public/projects/official selects 1.png", "public/projects/official_selects_1_nobg.png")
