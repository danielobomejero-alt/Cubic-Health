import re
import os

target_dir = r"c:\Users\danny\Downloads\Working For\The School of Daniels anf Esthers"
css_file = os.path.join(target_dir, "style.css")

with open(css_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

with open("flip_results.txt", "w", encoding="utf-8") as f:
    for i, line in enumerate(lines):
        if "flip" in line.lower() or "spk-" in line.lower():
            f.write(f"{i+1}: {line.strip()}\n")
