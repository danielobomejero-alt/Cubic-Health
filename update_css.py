import re
import os

target_dir = r"c:\Users\danny\Downloads\Working For\The School of Daniels anf Esthers"
css_file = os.path.join(target_dir, "style.css")

with open(css_file, "r", encoding="utf-8") as f:
    css_content = f.read()

# 1. Update :root variables
premium_root = """:root {
      --navy: #09122C;
      --royal: #112A6E;
      --royal-mid: #1A3E9C;
      --royal-soft: #F0F4FC;
      --gold: #D4AF37;
      --gold-light: #FBF4E0;
      --white: #FFFFFF;
      --off-white: #FCFCFD;
      --gray-100: #F3F5F9;
      --gray-200: #E4E8F0;
      --gray-400: #7A86A1;
      --gray-700: #2C354D;
      --black: #05070D;
      --ff-display: 'Cormorant Garamond', Georgia, serif;
      --ff-body: 'Outfit', sans-serif;
      --radius: 12px;
      --radius-lg: 24px;
    }"""

css_content = re.sub(r':root\s*\{[^}]+\}', premium_root, css_content, count=1)

# 2. Hide flip toggle and redundant animations
css_content += "\n/* Premium Overrides */\n"
css_content += ".spk-flip-toggle { display: none !important; }\n"
css_content += ".spk-scanline { display: none !important; }\n"
css_content += ".spk-orb { display: none !important; }\n"
css_content += ".spk-title em { animation: none !important; }\n"
css_content += ".spk-label::before { animation: none !important; }\n"

# 3. Enhance component styles with premium shadows and borders
premium_enhancements = """
.course-card, .vision-card, .stat-card, .video-card {
    box-shadow: 0 4px 20px rgba(9, 18, 44, 0.05);
    border: 1px solid rgba(17, 42, 110, 0.08);
}
.course-card:hover, .vision-card:hover, .video-card:hover {
    box-shadow: 0 12px 30px rgba(9, 18, 44, 0.1);
    border-color: rgba(212, 175, 55, 0.4);
}
.btn-primary {
    background: linear-gradient(135deg, var(--royal), var(--navy));
    box-shadow: 0 4px 15px rgba(17, 42, 110, 0.2);
}
.btn-primary:hover {
    box-shadow: 0 8px 25px rgba(17, 42, 110, 0.3);
}
"""
css_content += premium_enhancements

with open(css_file, "w", encoding="utf-8") as f:
    f.write(css_content)

print("Premium CSS updates applied successfully!")
