import urllib.request
import json
import re

BASE_URL = 'http://localhost:4173'

def test_routes():
    routes = [
        ('/', 'DOWNTOWN ORIGINALS'),
        ('/shop', 'SHOP ALL COLLECTION'),
        ('/product/metro-surplus-m65-jacket', 'METRO SURPLUS M-65 JACKET'),
        ('/cart', 'SHOPPING BAG'),
        ('/checkout', 'CHECKOUT ARCHITECTURE')
    ]
    
    print('=== TESTING ROUTES ===')
    for route, expected_string in routes:
        url = f'{BASE_URL}{route}'
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as response:
                status = response.status
                body = response.read().decode('utf-8')
                has_root = '<div id="root">' in body
                print(f'Route {route:35} -> HTTP {status} | Root container: {has_root}')
        except Exception as e:
            print(f'Route {route:35} -> FAILED: {e}')

def test_images():
    print('\n=== TESTING CATALOG IMAGES ===')
    # Load products.ts to extract image URLs
    with open('src/data/products.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    image_urls = re.findall(r'https?://[^\s\'"]+\.(?:jpg|jpeg|png|webp)|https://lh3\.googleusercontent\.com/[^\s\'"]+', content)
    unique_urls = list(set(image_urls))
    print(f'Found {len(unique_urls)} unique asset URLs')
    
    success_count = 0
    for i, url in enumerate(unique_urls[:15]): # test first 15 in detail
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status == 200:
                    success_count += 1
        except Exception as e:
            print(f'Image failed: {url[:50]}... -> {e}')
            
    print(f'Sample images tested: 15/15 -> {success_count} passed')

def test_css_and_build():
    print('\n=== TESTING BUILD ASSETS ===')
    with open('dist/index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    css_match = re.search(r'href="([^"]+\.css)"', html)
    js_match = re.search(r'src="([^"]+\.js)"', html)
    
    if css_match:
        css_path = 'dist' + css_match.group(1)
        with open(css_path, 'r', encoding='utf-8') as f:
            css = f.read()
        print(f'CSS Bundle size: {len(css)} bytes')
        print(f'Contains electric blue (#265cff): {"#265cff" in css or "#0043d9" in css}')
        print(f'Contains Oswald font: {"Oswald" in css}')
        print(f'Contains marquee animation: {"marquee" in css}')
        print(f'Contains media queries: {"@media" in css}')
        
    if js_match:
        js_path = 'dist' + js_match.group(1)
        with open(js_path, 'r', encoding='utf-8') as f:
            js = f.read()
        print(f'JS Bundle size: {len(js)} bytes')
        print(f'Contains products data: {"METRO SURPLUS M-65 JACKET" in js}')
        print(f'Contains INR currency: {"₹" in js}')

if __name__ == '__main__':
    test_routes();
    test_images();
    test_css_and_build();
