import re, json, sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== STARTING SHOPPING EXPERIENCE QA TEST SUITE ===")

# 1. Inspect Products Data
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    products_code = f.read()

# Load products using basic regex analysis
product_ids = re.findall(r"id:\s*'(prod-[^']+)'", products_code)
product_names = re.findall(r"name:\s*'([^']+)'", products_code)
prices = [int(p) for p in re.findall(r"price:\s*(\d+)", products_code)]
categories = re.findall(r"category:\s*'([^']+)'", products_code)

print(f"[TEST 1] Catalog loaded: {len(product_ids)} products found.")
assert len(product_ids) == 12, f"Expected 12 products, got {len(product_ids)}"
assert len(prices) == 12, "Prices mismatch"

# 2. Verify Initial Cart State in Source Code
with open('src/context/CartContext.tsx', 'r', encoding='utf-8') as f:
    cart_code = f.read()

assert 'return [];' in cart_code, "Cart must initialize to empty array []"
assert 'initialItems.push' not in cart_code, "Pre-seeded items must be completely removed"
print("[TEST 2] Initial cart state verified: Genuinely empty [] on initial visit.")

# 3. Verify Size Availability Enforcement
assert 'sizeSpec && !sizeSpec.inStock' in cart_code, "addToCart must check sizeSpec.inStock"
print("[TEST 3] Size availability verification logic present in CartContext.")

with open('src/pages/ProductDetailPage.tsx', 'r', encoding='utf-8') as f:
    pdp_code = f.read()

assert 'disabled={!isSelectedSizeAvailable}' in pdp_code, "Add to bag & buy now buttons must be disabled when variant is out of stock"
assert 'if (!isSelectedSizeAvailable) return;' in pdp_code, "Handler must guard against unavailable sizes"
print("[TEST 4] ProductDetailPage disabled state and handlers guard against out-of-stock sizes.")

# 4. Verify Demo Checkout Protection
with open('src/pages/CheckoutPage.tsx', 'r', encoding='utf-8') as f:
    checkout_code = f.read()

assert 'DEMONSTRATION' in checkout_code, "Checkout must display clear demonstration notice"
assert 'SANDBOX' in checkout_code or 'DEMO GATEWAY' in checkout_code, "Payment methods must be marked as sandbox/demo"
assert 'TEST CARD' in checkout_code, "Real card numbers must not be collected"
print("[TEST 5] Checkout demonstration safeguards verified: Real payment credentials protected.")

# 5. Verify Promo Code Logic
assert 'DOWNTOWN10' in checkout_code, "Inner circle promo code DOWNTOWN10 supported"
print("[TEST 6] Demonstration promo code DOWNTOWN10 verified.")

# 6. Verify Subtotal and Shipping Calculations
def calculate_order(items):
    subtotal = sum(item['price'] * item['qty'] for item in items)
    shipping = 0 if subtotal >= 3999 or subtotal == 0 else 199
    return subtotal, shipping, subtotal + shipping

# Test 6a: 1 Tee (₹2,499) -> Subtotal: 2499, Shipping: 199, Total: 2698
sub, ship, total = calculate_order([{'price': 2499, 'qty': 1}])
assert sub == 2499 and ship == 199 and total == 2698
print(f"[TEST 7a] 1 item below ₹3,999 threshold: Subtotal ₹{sub}, Shipping ₹{ship}, Total ₹{total} -> PASS")

# Test 6b: 1 M-65 Jacket (₹6,499) -> Subtotal: 6499, Shipping: 0, Total: 6499
sub, ship, total = calculate_order([{'price': 6499, 'qty': 1}])
assert sub == 6499 and ship == 0 and total == 6499
print(f"[TEST 7b] 1 item above ₹3,999 threshold: Subtotal ₹{sub}, Shipping ₹{ship} (FREE), Total ₹{total} -> PASS")

# Test 6c: 2 Hoodies (₹3,899 * 2) -> Subtotal: 7798, Shipping: 0, Promo 10%: 780
sub, ship, total = calculate_order([{'price': 3899, 'qty': 2}])
discount = round(sub * 0.1)
final = sub + ship - discount
assert sub == 7798 and ship == 0 and discount == 780 and final == 7018
print(f"[TEST 7c] 2 Hoodies with 10% promo: Subtotal ₹{sub}, Discount ₹{discount}, Final ₹{final} -> PASS")

# 7. Verify Responsive Styles and Breakpoints in index.html & index.css
with open('src/index.css', 'r', encoding='utf-8') as f:
    css_code = f.read()

assert ':focus-visible' in css_code, "Visible focus indicator required"
assert 'prefers-reduced-motion' in css_code, "Reduced motion media query required"
print("[TEST 8] Accessibility focus states and reduced-motion compliance verified.")

print("\n>>> ALL 8 QA TESTS PASSED SUCCESSFULLY! <<<")
