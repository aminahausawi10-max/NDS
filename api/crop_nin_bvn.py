from PIL import Image

try:
    im = Image.open('C:/Users/Ameeynerh/.gemini/antigravity/brain/4ca67fa6-00dd-4e14-90dc-564f277d6869/media__1788039123003.png').convert('RGB')
    w, h = im.size
    
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    
    for x in range(200, 824):
        for y in range(80, 500):
            r, g, b = im.getpixel((x, y))
            # Non-white pixel threshold
            if r < 245 or g < 245 or b < 245:
                if x < min_x: min_x = x
                if y < min_y: min_y = y
                if x > max_x: max_x = x
                if y > max_y: max_y = y
                
    if max_x > min_x and max_y > min_y:
        padding = 10
        x0 = max(0, min_x - padding)
        y0 = max(0, min_y - padding)
        x1 = min(w, max_x + padding)
        y1 = min(h, max_y + padding)
        cropped = im.crop((x0, y0, x1, y1))
        cropped.thumbnail((120, 120))
        cropped.save('c:/Users/Ameeynerh/Desktop/NDS/public/logo_nin_bvn.png')
        print("NIN & BVN Logo cropped successfully!")
except Exception as e:
    print(f"Error: {e}")
