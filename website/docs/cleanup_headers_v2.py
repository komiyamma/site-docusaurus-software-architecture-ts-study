import os
import glob

def remove_leading_blank_lines(filepath):
    """Removes leading blank lines from a file, handling BOM."""
    # Use utf-8-sig to automatically handle BOM
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        lines = f.readlines()

    if not lines:
        return False

    start_index = 0
    # content is already stripped of BOM by utf-8-sig if present at start of file
    while start_index < len(lines) and lines[start_index].strip() == '':
        start_index += 1

    if start_index == 0:
        return False

    new_content = lines[start_index:]
    
    # Write back with utf-8 (no BOM)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_content)
    
    return True

def main():
    base_dir = r"g:\repogitory\site-docusaurus-software-architecture-cs-study\website\docs"
    # Find all *_index.md files recursively
    search_pattern = os.path.join(base_dir, "**", "*_index.md")
    files = glob.glob(search_pattern, recursive=True)

    print(f"Found {len(files)} files.")

    count = 0
    for filepath in files:
        if remove_leading_blank_lines(filepath):
            print(f"Cleaned: {filepath}")
            count += 1
    
    print(f"Total files cleaned: {count}")

if __name__ == "__main__":
    main()
