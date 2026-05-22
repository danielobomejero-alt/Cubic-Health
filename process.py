import re
import os

target_dir = r"c:\Users\danny\Downloads\Working For\The School of Daniels anf Esthers"
html_file = os.path.join(target_dir, "index.html")
css_file = os.path.join(target_dir, "style.css")

with open(html_file, "r", encoding="utf-8") as f:
    html_content = f.read()

# 1. Extract CSS
style_start = html_content.find("<style>")
style_end = html_content.find("</style>") + len("</style>")

if style_start != -1 and style_end != -1:
    css_content = html_content[style_start + len("<style>"):style_end - len("</style>")]
    
    # 2. Modify HTML to use link tag instead of inline style
    link_tag = '<link rel="stylesheet" href="style.css">'
    html_content = html_content[:style_start] + link_tag + html_content[style_end:]
    
    # 3. Remove gimmicky elements from HTML
    html_content = re.sub(r'<div class="spk-orb"></div>', '', html_content)
    html_content = re.sub(r'<div class="spk-scanline"></div>', '', html_content)
    
    # 4. Modify CSS for accessibility and sizing
    css_content = re.sub(r'font-size:\s*10px;?', 'font-size: 13px;', css_content)
    css_content = re.sub(r'font-size:\s*11px;?', 'font-size: 14px;', css_content)
    css_content = re.sub(r'font-size:\s*12px;?', 'font-size: 15px;', css_content)
    css_content = re.sub(r'rgba\(255,\s*255,\s*255,\s*0\.4\)', 'rgba(255, 255, 255, 0.65)', css_content)
    css_content = re.sub(r'rgba\(255,\s*255,\s*255,\s*0\.5\)', 'rgba(255, 255, 255, 0.75)', css_content)
    
    with open(css_file, "w", encoding="utf-8") as f:
        f.write(css_content.strip())
        
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    print("Successfully extracted CSS and updated HTML.")
else:
    print("Could not find <style> block.")
