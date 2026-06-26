import cv2
import numpy as np
import os
import sys

def split_image(image_path, prefix):
    # Load image with alpha channel
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Could not load {image_path}")
        return

    # If it has an alpha channel, use it as the mask
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        # Also consider pixels that are very close to white as background
        # since sometimes "transparent" images have white backgrounds
        rgb = img[:, :, :3]
        gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)
        
        # We want the ink. The ink is dark.
        # Mask where alpha is high AND pixel is dark enough
        mask = cv2.bitwise_and(alpha, cv2.bitwise_not(gray))
        _, thresh = cv2.threshold(mask, 10, 255, cv2.THRESH_BINARY)
    else:
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Threshold (assuming black laurels on white background)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Get bounding boxes
    boxes = [cv2.boundingRect(c) for c in contours]
    
    # Filter out small noise
    min_area = 500
    boxes = [b for b in boxes if b[2] * b[3] > min_area]
    
    if not boxes:
        print(f"No laurels found in {image_path}")
        return

    # Group boxes that overlap horizontally or are very close (parts of the same laurel)
    # A simpler approach: project pixels vertically to find gaps
    col_sums = np.sum(thresh, axis=0)
    
    # Smooth the column sums to avoid small gaps inside a laurel breaking it
    kernel = np.ones(20)
    col_sums_smoothed = np.convolve(col_sums, kernel, mode='same')
    
    threshold_val = np.max(col_sums_smoothed) * 0.01
    is_content = col_sums_smoothed > threshold_val
    
    # Find start and end indices of content
    diff = np.diff(is_content.astype(int))
    starts = np.where(diff == 1)[0] + 1
    ends = np.where(diff == -1)[0] + 1
    
    if is_content[0]:
        starts = np.insert(starts, 0, 0)
    if is_content[-1]:
        ends = np.append(ends, len(is_content) - 1)
        
    print(f"Found {len(starts)} laurels in {image_path}")
    
    os.makedirs('public/projects/laurels_split', exist_ok=True)
    
    # Also find vertical bounds to crop tight vertically
    row_sums = np.sum(thresh, axis=1)
    row_is_content = row_sums > 0
    row_indices = np.where(row_is_content)[0]
    if len(row_indices) == 0:
        top, bottom = 0, img.shape[0]
    else:
        top, bottom = row_indices[0], row_indices[-1]
    
    for i, (s, e) in enumerate(zip(starts, ends)):
        # Add some padding
        pad_x = 20
        pad_y = 20
        
        s = max(0, s - pad_x)
        e = min(img.shape[1], e + pad_x)
        
        t = max(0, top - pad_y)
        b = min(img.shape[0], bottom + pad_y)
        
        cropped = img[t:b, s:e]
        
        out_path = f"public/projects/laurels_split/{prefix}_{i+1}.png"
        cv2.imwrite(out_path, cropped)
        print(f"Saved {out_path}")

split_image("public/projects/official_selects_1_nobg.png", "os1")
split_image("public/projects/bbt_laurels_transparent.png", "bbt")
