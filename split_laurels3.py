import cv2
import os

os.makedirs('public/projects/laurels_split', exist_ok=True)

img = cv2.imread("public/projects/bbt_laurels_transparent.png", cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]
w_part = w // 5

for i in range(5):
    cropped = img[:, i*w_part:(i+1)*w_part]
    cv2.imwrite(f"public/projects/laurels_split/bbt_{i+1}.png", cropped)

