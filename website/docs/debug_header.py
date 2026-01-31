import os

filepath = r"g:\repogitory\site-docusaurus-software-architecture-cs-study\website\docs\dry_cs\dry_cs_index.md"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"File: {filepath}")
if lines:
    print(f"Line 1 repr: {repr(lines[0])}")
    print(f"Line 1 hex: {lines[0].encode('utf-8').hex()}")
    print(f"Line 1 stripped: {repr(lines[0].strip())}")
else:
    print("File is empty.")
