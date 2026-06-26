import cv2

img = cv2.imread("public/projects/official_selects_1_nobg.png", cv2.IMREAD_UNCHANGED)
h, w = img.shape[:2]
w_part = w // 5

for i in range(5):
    cropped = img[:, i*w_part:(i+1)*w_part]
    cv2.imwrite(f"public/projects/laurels_split/os1_{i+1}.png", cropped)

