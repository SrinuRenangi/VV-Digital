import sys
import site
sys.path.append(site.getusersitepackages())

import os
import glob
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

output_dir = r'c:\Users\Administrator\Desktop\VV-Digital\public\logos'
os.makedirs(output_dir, exist_ok=True)

files = sorted(glob.glob(r'C:\Users\Administrator\.gemini\antigravity-ide\brain\8b88d098-ae8b-4ae5-a426-262a969421d6\media__*'), key=os.path.getmtime)

configs = [
    {
        'file_index': 0,
        'name': 'sri-srinivasa-school.png',
        'is_black_bg': False,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': None
    },
    {
        'file_index': 1,
        'name': 'ssv-junior-college.png',
        'is_black_bg': True,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': None
    },
    {
        'file_index': 2,
        'name': 'srivari-hospital.png',
        'is_black_bg': False,
        'crop_edge': 5,  # remove 1-2px top edge artifact
        'thresh': 35,
        'upscale': None
    },
    {
        'file_index': 3,
        'name': 'iris-premium-water.png',
        'is_black_bg': True,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': None
    },
    {
        'file_index': 4,
        'name': 'kk-enterprises.png',
        'is_black_bg': True,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': (800, 800)
    }
]

def process_logo(src_path, cfg):
    print(f"Processing {os.path.basename(src_path)} -> {cfg['name']}")
    img = cv2.imread(src_path, cv2.IMREAD_COLOR)
    
    # 1. Edge crop if requested
    edge = cfg['crop_edge']
    if edge > 0:
        h, w, _ = img.shape
        img = img[edge:h-edge, edge:w-edge]
        
    # 2. High-quality upscale if requested
    if cfg['upscale']:
        target_w, target_h = cfg['upscale']
        img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_CUBIC)
        
    h, w, _ = img.shape
    
    # Floodfill mask size (h+2, w+2)
    mask = np.zeros((h + 2, w + 2), np.uint8)
    flood_img = img.copy()
    
    lo_diff = (cfg['thresh'], cfg['thresh'], cfg['thresh'])
    up_diff = (cfg['thresh'], cfg['thresh'], cfg['thresh'])
        
    # FIX: Include FLOODFILL_FIXED_RANGE to compare only against seed color!
    flags = 4 | cv2.FLOODFILL_MASK_ONLY | cv2.FLOODFILL_FIXED_RANGE | (255 << 8)
    
    # Seed points along outer edge
    border_seeds = []
    step = 10
    for x in range(0, w, step):
        border_seeds.append((x, 0))
        border_seeds.append((x, h - 1))
    for y in range(0, h, step):
        border_seeds.append((0, y))
        border_seeds.append((w - 1, y))
        
    for seed in border_seeds:
        px_val = flood_img[seed[1], seed[0]]
        b, g, r = int(px_val[0]), int(px_val[1]), int(px_val[2])
        
        is_bg_seed = False
        if cfg['is_black_bg']:
            if b < 45 and g < 45 and r < 45:
                is_bg_seed = True
        else:
            if b > 210 and g > 210 and r > 210:
                is_bg_seed = True
                
        if is_bg_seed:
            cv2.floodFill(flood_img, mask, seed, (0, 0, 0), lo_diff, up_diff, flags)
            
    # Extract background mask (scale 0-255)
    bg_mask = mask[1:h+1, 1:w+1]
    
    # Alpha channel: foreground = 255, background = 0
    alpha = 255 - bg_mask
    
    # Smooth anti-aliased edge feathering
    alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    # 4. Sharpening & Enhancement on BGR image
    gaussian = cv2.GaussianBlur(img, (0, 0), 2.0)
    sharpened = cv2.addWeighted(img, 1.4, gaussian, -0.4, 0)
    
    # Combine BGR + Alpha -> BGRA
    bgra = cv2.merge([sharpened[:, :, 0], sharpened[:, :, 1], sharpened[:, :, 2], alpha_blurred])
    
    # Convert to PIL
    pil_img = Image.fromarray(cv2.cvtColor(bgra, cv2.COLOR_BGRA2RGBA))
    
    bbox = pil_img.getbbox()
    if bbox:
        pad = 8
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        pil_img = pil_img.crop((left, top, right, bottom))
        
    # Additional PIL vibrancy enhancement
    enh_col = ImageEnhance.Color(pil_img)
    pil_img = enh_col.enhance(1.06)
    
    out_path = os.path.join(output_dir, cfg['name'])
    pil_img.save(out_path, 'PNG', optimize=True)
    print(f"Saved {cfg['name']} ({pil_img.size[0]}x{pil_img.size[1]}) -> {out_path}")

if __name__ == '__main__':
    for cfg in configs:
        fpath = files[cfg['file_index']]
        process_logo(fpath, cfg)
