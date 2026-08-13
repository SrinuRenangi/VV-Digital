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
        'crop_edge': 5,
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
    },
    {
        'file_index': 5,
        'name': 'qb-quality-beverages.png',
        'is_black_bg': True,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': None
    },
    {
        'file_index': 6,
        'name': 'dr-mobiles.png',
        'is_black_bg': True,
        'crop_edge': 0,
        'thresh': 50,
        'upscale': None,
        'custom_dr': True
    },
    {
        'file_index': 7,
        'name': 'srimannarayana-school.png',
        'is_black_bg': False,
        'crop_edge': 0,
        'thresh': 35,
        'upscale': None
    }
]

def process_logo(src_path, cfg):
    print(f"Processing {os.path.basename(src_path)} -> {cfg['name']}")
    img = cv2.imread(src_path, cv2.IMREAD_COLOR)
    
    edge = cfg['crop_edge']
    if edge > 0:
        h, w, _ = img.shape
        img = img[edge:h-edge, edge:w-edge]
        
    if cfg.get('upscale'):
        target_w, target_h = cfg['upscale']
        img = cv2.resize(img, (target_w, target_h), interpolation=cv2.INTER_CUBIC)
        
    h, w, _ = img.shape
    
    if cfg.get('custom_dr'):
        # For DR Mobiles: combine saturation mask & floodfill for crystal clear 3D logo extraction
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        s_channel = hsv[:, :, 1]
        v_channel = hsv[:, :, 2]
        
        # Color elements (blue, red, cyan) have high saturation > 60 or high value on metallic edges
        logo_mask = np.zeros((h, w), dtype=np.uint8)
        logo_mask[(s_channel > 45) | (v_channel > 140)] = 255
        
        # Morphological clean up
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
        logo_mask = cv2.morphologyEx(logo_mask, cv2.MORPH_CLOSE, kernel)
        
        alpha_blurred = cv2.GaussianBlur(logo_mask, (3, 3), 0)
    else:
        mask = np.zeros((h + 2, w + 2), np.uint8)
        flood_img = img.copy()
        
        lo_diff = (cfg['thresh'], cfg['thresh'], cfg['thresh'])
        up_diff = (cfg['thresh'], cfg['thresh'], cfg['thresh'])
            
        flags = 4 | cv2.FLOODFILL_MASK_ONLY | cv2.FLOODFILL_FIXED_RANGE | (255 << 8)
        
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
                if b < 50 and g < 50 and r < 50:
                    is_bg_seed = True
            else:
                if b > 200 and g > 200 and r > 200:
                    is_bg_seed = True
                    
            if is_bg_seed:
                cv2.floodFill(flood_img, mask, seed, (0, 0, 0), lo_diff, up_diff, flags)
                
        bg_mask = mask[1:h+1, 1:w+1]
        alpha = 255 - bg_mask
        alpha_blurred = cv2.GaussianBlur(alpha, (3, 3), 0)
    
    # Sharpening & Enhancement
    gaussian = cv2.GaussianBlur(img, (0, 0), 2.0)
    sharpened = cv2.addWeighted(img, 1.45, gaussian, -0.45, 0)
    
    bgra = cv2.merge([sharpened[:, :, 0], sharpened[:, :, 1], sharpened[:, :, 2], alpha_blurred])
    pil_img = Image.fromarray(cv2.cvtColor(bgra, cv2.COLOR_BGRA2RGBA))
    
    bbox = pil_img.getbbox()
    if bbox:
        pad = 8
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        pil_img = pil_img.crop((left, top, right, bottom))
        
    enh_col = ImageEnhance.Color(pil_img)
    pil_img = enh_col.enhance(1.08)
    
    out_path = os.path.join(output_dir, cfg['name'])
    pil_img.save(out_path, 'PNG', optimize=True)
    print(f"Saved {cfg['name']} ({pil_img.size[0]}x{pil_img.size[1]}) -> {out_path}")

if __name__ == '__main__':
    print(f"Total media files found: {len(files)}")
    for cfg in configs:
        if cfg['file_index'] < len(files):
            fpath = files[cfg['file_index']]
            process_logo(fpath, cfg)
