import os
import sys
import site
sys.path.append(site.getusersitepackages())

from PIL import Image, ImageDraw, ImageFont, ImageFilter

def main():
    """
    Programmatically creates a custom PM monogram logo:
    - Deep space dark background (#06020f)
    - Glowing neon fuchsia/magenta outer circle
    - Elegant interlocking serif 'P' and 'M' in Georgia font
    - Beautiful vertical purple-to-lavender gradient on the letters
    - Saves directly to public/assets/logo.png and regenerates favicons
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, "public", "assets", "logo.png")
    
    # 1. Canvas settings
    size = (1024, 1024)
    img = Image.new("RGBA", size, (6, 2, 15, 255)) # #06020f
    
    # 2. Draw glowing circle
    # Create a separate layer for the outer ring glow
    glow_layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw_glow = ImageDraw.Draw(glow_layer)
    
    center = (512, 512)
    radius = 430
    
    # Draw thicker neon fuchsia outline for the glow base
    fuchsia_color = (217, 70, 239, 255) # #d946ef
    draw_glow.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        outline=fuchsia_color,
        width=16
    )
    # Apply Gaussian blur to create neon glow
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(16))
    
    # Composite glow onto main canvas
    img = Image.alpha_composite(img, glow_layer)
    
    # Draw sharp overlay circle
    draw = ImageDraw.Draw(img)
    lavender_light = (244, 114, 182, 255) # soft light pink/lavender
    draw.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        outline=lavender_light,
        width=6
    )
    
    # 3. Create vertical gradient image for the text
    gradient = Image.new("RGBA", size)
    draw_grad = ImageDraw.Draw(gradient)
    
    # Gradient colors: Deep Purple -> Light Lavender
    c1 = (138, 43, 226)   # #8a2be2 (Blue Violet)
    c2 = (230, 230, 250)  # #e6e6fa (Lavender)
    
    for y in range(size[1]):
        ratio = y / size[1]
        r = int(c1[0] + (c2[0] - c1[0]) * ratio)
        g = int(c1[1] + (c2[1] - c1[1]) * ratio)
        b = int(c1[2] + (c2[2] - c1[2]) * ratio)
        draw_grad.line([(0, y), (size[0], y)], fill=(r, g, b, 255))
        
    # 4. Draw interlocking letters "P" and "M"
    text_mask = Image.new("L", size, 0)
    draw_mask = ImageDraw.Draw(text_mask)
    
    # Load Georgia serif font (standard on Windows)
    font_path = "georgia.ttf"
    try:
        font = ImageFont.truetype(font_path, 490)
    except IOError:
        # Fallback to default if Georgia is not found
        font = ImageFont.load_default()
        print("Warning: Georgia font not found. Using default font.")
        
    # Position the letters to overlap elegantly
    # 'P' shifted slightly left/up, 'M' shifted slightly right/down
    draw_mask.text((230, 180), "P", fill=255, font=font)
    draw_mask.text((450, 260), "M", fill=255, font=font)
    
    # Paste the gradient onto the logo canvas using the text mask
    img.paste(gradient, (0, 0), mask=text_mask)
    
    # 5. Make background transparent (excluding the monogram and outer circle)
    data = np.array(img) if 'np' in sys.modules else None
    if data is None:
        try:
            import numpy as np
            data = np.array(img)
        except ImportError:
            pass
            
    if data is not None:
        r, g, b = data[:,:,0].astype(int), data[:,:,1].astype(int), data[:,:,2].astype(int)
        bg_r, bg_g, bg_b = 6, 2, 15
        dist = np.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
        # Match background color pixels and clear alpha channel
        mask = dist < 45
        data[mask, 3] = 0
        img = Image.fromarray(data)
        print("Logo background made transparent.")
        
    # Save logo file
    os.makedirs(os.path.dirname(logo_path), exist_ok=True)
    img.save(logo_path, format="PNG")
    print(f"Saved custom logo to: {logo_path}")
    
    # 6. Auto-run favicon generator to sync changes
    fav_gen_path = os.path.join(base_dir, "scripts", "generate-favicons.py")
    if os.path.exists(fav_gen_path):
        print("Running favicon generator script to synchronize favicon sizes...")
        import subprocess
        try:
            subprocess.run([sys.executable, fav_gen_path], check=True)
            print("Favicons synchronized successfully!")
        except Exception as e:
            print(f"Failed to auto-run favicon generator: {e}")
            
if __name__ == "__main__":
    main()
