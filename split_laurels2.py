import cv2
import numpy as np
import os
import sys

def split_image_by_contours(image_path, prefix):
    img = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        return
        
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        rgb = img[:, :, :3]
        gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY)
        mask = cv2.bitwise_and(alpha, cv2.bitwise_not(gray))
        _, thresh = cv2.threshold(mask, 10, 255, cv2.THRESH_BINARY)
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Get bounding boxes
    boxes = [cv2.boundingRect(c) for c in contours]
    
    # Filter small noise
    min_area = 100
    boxes = [b for b in boxes if b[2] * b[3] > min_area]
    
    if not boxes:
        print(f"No laurels found in {image_path}")
        return

    # Merge overlapping or close bounding boxes
    # Two boxes belong to the same laurel if their horizontal distance is less than a threshold
    # Since there are exactly 5 laurels typically, let's cluster by X coordinate using k-means or simple hierarchical clustering
    
    # Sort boxes by x coordinate
    boxes.sort(key=lambda b: b[0])
    
    merged_boxes = []
    current_box = list(boxes[0])
    
    # Distance threshold to merge boxes. Laurel images have text + leaves which might be disconnected.
    # Typical distance between laurels is much larger than gaps inside a laurel.
    # Image width is ~1500-1920. 5 laurels means ~300px per laurel. Gap between them is maybe 50-100px.
    # Gap inside laurel is maybe 10-20px.
    merge_threshold = 40 
    
    for b in boxes[1:]:
        x, y, w, h = b
        cx, cy, cw, ch = current_box
        
        # distance from end of current box to start of next box
        dist = x - (cx + cw)
        
        if dist < merge_threshold:
            # Merge
            new_x = min(cx, x)
            new_y = min(cy, y)
            new_w = max(cx + cw, x + w) - new_x
            new_h = max(cy + ch, y + h) - new_y
            current_box = [new_x, new_y, new_w, new_h]
        else:
            merged_boxes.append(current_box)
            current_box = list(b)
    merged_boxes.append(current_box)

    print(f"Found {len(merged_boxes)} laurels in {image_path}")
    
    for i, (x, y, w, h) in enumerate(merged_boxes):
        pad = 20
        t = max(0, y - pad)
        b = min(img.shape[0], y + h + pad)
        l = max(0, x - pad)
        r = min(img.shape[1], x + w + pad)
        
        cropped = img[t:b, l:r]
        out_path = f"public/projects/laurels_split/{prefix}_{i+1}.png"
        cv2.imwrite(out_path, cropped)
        print(f"Saved {out_path}")

split_image_by_contours("public/projects/bbt_laurels_transparent.png", "bbt")
