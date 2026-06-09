import os
from PIL import Image
import site
import sys
# Automatically append user site-packages where pillow is installed on Windows
sys.path.append(site.getusersitepackages())

def main():
    """
    Utility script to automatically generate all required favicon sizes from
    the source logo.png file located in public/assets/logo.png.
    
    Usage:
        python scripts/generate-favicons.py
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, "public", "assets", "logo.png")
    favicons_dir = os.path.join(base_dir, "public", "favicons")
    
    if not os.path.exists(logo_path):
        print(f"Error: Source logo not found at {logo_path}")
        return
        
    print(f"Opening source logo from: {logo_path}")
    img = Image.open(logo_path)
    
    # Explicitly convert to RGBA (required by Next.js's Rust-based image decoder)
    print("Converting image to RGBA format...")
    img_rgba = img.convert("RGBA")
    
    # Standard PNG favicon names and sizes
    targets = {
        "android-chrome-192x192.png": (192, 192),
        "android-chrome-512x512.png": (512, 512),
        "apple-touch-icon-180x180.png": (180, 180),
        "apple-touch-icon.png": (180, 180),
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "favicon-48x48.png": (48, 48)
    }
    
    # Create the favicons output directory if it doesn't exist
    os.makedirs(favicons_dir, exist_ok=True)
    
    # Save resized PNGs
    for filename, size in targets.items():
        out_path = os.path.join(favicons_dir, filename)
        resized = img_rgba.resize(size, Image.Resampling.LANCZOS)
        resized.save(out_path, format="PNG")
        print(f"  -> Generated: {filename} ({size[0]}x{size[1]})")
        
    # Save standard multi-size favicon.ico
    ico_path = os.path.join(favicons_dir, "favicon.ico")
    img_rgba.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"  -> Generated: favicon.ico (multi-size)")
    
    # Also replace standard favicon at root public directory if it exists
    root_ico = os.path.join(base_dir, "public", "favicon.ico")
    if os.path.exists(root_ico) or True: # Force write/refresh root public favicon
        img_rgba.save(root_ico, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
        print(f"  -> Generated: public/favicon.ico")

    print("\nAll favicons generated successfully!")

if __name__ == "__main__":
    main()
