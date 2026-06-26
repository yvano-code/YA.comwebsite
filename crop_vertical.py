import cv2
import numpy as np

def crop_vertical(input_path, output_path):
    img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
    if img is None: return
    
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        gray = cv2.cvtColor(img[:, :, :3], cv2.COLOR_BGR2GRAY)
        mask = cv2.bitwise_and(alpha, cv2.bitwise_not(gray))
        _, thresh = cv2.threshold(mask, 10, 255, cv2.THRESH_BINARY)
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        
    row_sums = np.sum(thresh, axis=1)
    row_is_content = row_sums > 0
    row_indices = np.where(row_is_content)[0]
    
    if len(row_indices) > 0:
        top = max(0, row_indices[0] - 20)
        bottom = min(img.shape[0], row_indices[-1] + 20)
        cropped = img[top:bottom, :]
        cv2.imwrite(output_path, cropped)
        print(f"Cropped {input_path} from {img.shape[0]} to {bottom-top}")
    else:
        print("No content found")

crop_vertical("public/projects/official_selects_1_nobg.png", "public/projects/official_selects_1_cropped.png")
crop_vertical("public/projects/bbt_laurels_nobg.png", "public/projects/bbt_laurels_cropped.png")
