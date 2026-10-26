import re, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('stitch_reference/product_desktop.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect Anatomy of the M-65 shell
idx = html.find('ANATOMY OF THE M-65 SHELL')
if idx != -1:
    print('ANATOMY:')
    print(html[idx-100:idx+2500])
