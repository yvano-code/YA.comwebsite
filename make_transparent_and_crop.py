import cv2
import numpy as np

def process_image(input_path, output_path):
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None: return
    
    if img.shape[2] == 4:
        # Already has alpha, let's still use it but ensure white is transparent
        alpha = img[:, :, 3]
        rgb = img[:, :, :3]
    else:
        rgb = img
        alpha = np.full((img.shape[0], img.shape[1]), 255, dtype=np.uint8)
        
    # Find all pixels that are close to white
    # e.g., R>240, G>240, B>240
    lower_white = np.array([230, 230, 230])
    upper_white = np.array([255, 255, 255])
    white_mask = cv2.inRange(rgb, lower_white, upper_white)
    
    # Make white pixels transparent
    alpha[white_mask == 255] = 0
    
    # Create RGBA image
    rgba = cv2.cvtColor(rgb, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = alpha
    
    # Now crop based on alpha
    # Sum of alpha across rows and cols
    row_sums = np.sum(alpha, axis=1)
    col_sums = np.sum(alpha, axis=0)
    
    row_indices = np.where(row_sums > 0)[0]
    col_indices = np.where(col_sums > 0)[0]
    
    if len(row_indices) > 0 and len(col_indices) > 0:
        top = max(0, row_indices[0] - 10)
        bottom = min(rgba.shape[0], row_indices[-1] + 10)
        left = max(0, col_indices[0] - 10)
        right = min(rgba.shape[1], col_indices[-1] + 10)
        
        cropped = rgba[top:bottom, left:right]
        cv2.imwrite(output_path, cropped)
        print(f"Processed {input_path}: cropped to {right-left}x{bottom-top} with transparency")
    else:
        print("No content found")

process_image("public/projects/official_selects_1_nobg.png", "public/projects/official_selects_1_final.png")
process_image("public/projects/bbt_laurels_nobg.png", "public/projects/bbt_laurels_final.png")
