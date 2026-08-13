import os
import glob
from collections import deque
from PIL import Image, ImageEnhance, ImageFilter

output_dir = r'c:\Users\Administrator\Desktop\VV-Digital\public\logos'
os.makedirs(output_dir, exist_ok=True)

files = sorted(glob.glob(r'C:\Users\Administrator\.gemini\antigravity-ide\brain\8b88d098-ae8b-4ae5-a426-262a969421d6\media__*'), key=os.path.getmtime)

targets = [
    {
        'name': 'sri-srinivasa-school.png',
        'is_black_bg': False,
        'tol': 45,
        'upscale': None,
        'label': 'Sri Srinivasa Concept EM High School',
        'category': 'Personal Branding'
    },
    {
        'name': 'ssv-junior-college.png',
        'is_black_bg': True,
        'tol': 45,
        'upscale': None,
        'label': 'SSV Junior College',
        'category': 'Personal Branding'
    },
    {
        'name': 'srivari-hospital.png',
        'is_black_bg': False,
        'tol': 40,
        'upscale': None,
        'label': 'Srivari Hospital',
        'category': 'Personal Branding'
    },
    {
        'name': 'iris-premium-water.png',
        'is_black_bg': True,
        'tol': 45,
        'upscale': None,
        'label': 'IRIS Premium Water',
        'category': 'Digital Marketing (Collab with GMS)'
    },
    {
        'name': 'kk-enterprises.png',
        'is_black_bg': True,
        'tol': 45,
        'upscale': (800, 800),
        'label': 'KK Enterprises',
        'category': 'Authorized Distributor Oceana'
    }
]

def process_image(src_path, config):
    img = Image.open(src_path)
    
    if config['upscale']:
        img = img.resize(config['upscale'], Image.Resampling.LANCZOS)
        
    img = img.convert('RGBA')
    w, h = img.size
    px = img.load()
    
    visited = set()
    queue = deque()
    
    tol = config['tol']
    is_black = config['is_black_bg']
    
    def check_bg(r, g, b):
        if is_black:
            return r < tol and g < tol and b < tol
        else:
            return r > (255 - tol) and g > (255 - tol) and b > (255 - tol)

    # Multi-inset seed points around outer edges to bypass corner artifacts (like at 0,0)
    seed_insets = [2, 5, 10, 15, 20, 25, 30]
    for inset in seed_insets:
        seed_coords = [
            (inset, inset), (w - 1 - inset, inset),
            (inset, h - 1 - inset), (w - 1 - inset, h - 1 - inset),
            (w // 2, inset), (inset, h // 2),
            (w - 1 - inset, h // 2), (w // 2, h - 1 - inset)
        ]
        for sx, sy in seed_coords:
            if 0 <= sx < w and 0 <= sy < h:
                r, g, b, a = px[sx, sy]
                if check_bg(r, g, b) and (sx, sy) not in visited:
                    visited.add((sx, sy))
                    queue.append((sx, sy))

    bg_mask = Image.new('L', (w, h), 255)
    bg_px = bg_mask.load()
    
    while queue:
        x, y = queue.popleft()
        bg_px[x, y] = 0
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                r, g, b, a = px[nx, ny]
                if check_bg(r, g, b):
                    visited.add((nx, ny))
                    queue.append((nx, ny))

    # Anti-alias mask edge using Gaussian blur
    bg_mask_blurred = bg_mask.filter(ImageFilter.GaussianBlur(radius=1.2))
    
    img.putalpha(bg_mask_blurred)
    
    # Trim transparent borders around visible logo bounds
    bbox = img.getbbox()
    if bbox:
        pad = 10
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        img = img.crop((left, top, right, bottom))
    
    # Enhance quality: UnsharpMask for text & edge sharpness
    img = img.filter(ImageFilter.UnsharpMask(radius=1.6, percent=150, threshold=2))
    
    # Color & Contrast enhancement
    enh_color = ImageEnhance.Color(img)
    img = enh_color.enhance(1.08)
    
    enh_contrast = ImageEnhance.Contrast(img)
    img = enh_contrast.enhance(1.05)
    
    out_path = os.path.join(output_dir, config['name'])
    img.save(out_path, 'PNG', optimize=True)
    print(f"Successfully processed {config['name']} -> {img.size[0]}x{img.size[1]} saved to {out_path}")

if __name__ == '__main__':
    print(f"Found {len(files)} uploaded media images.")
    for i, f in enumerate(files):
        print(f"Processing image {i+1}: {os.path.basename(f)}")
        process_image(f, targets[i])
