from PIL import Image
import colorsys

img = Image.open('public/rocket-icon-nobg.png').convert('RGBA')
data = img.getdata()

new_data = []
for item in data:
    r, g, b, a = item
    h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
    
    # Orange/peach hue is roughly 0.05 to 0.15
    # Let's target the flame colors:
    # High red, medium green, lower blue
    if a > 0 and r > 180 and g > 100 and b < 180 and r > b + 30:
        new_data.append((255, 255, 255, 0)) # Make transparent
    else:
        new_data.append(item)

img.putdata(new_data)
img.save('public/rocket-icon-noflame.png')
print("Saved public/rocket-icon-noflame.png")
