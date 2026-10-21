/* Carrito simulado en localStorage */
window.OR = window.OR || {};

OR.cart = {
  KEY: 'or_cart',
  COUPON_KEY: 'or_coupon',
  COUPONS: { OPETH10: 0.10, DAMNATION20: 0.20 },

  lines() {
    try { return JSON.parse(OR.storage.get('localStorage', this.KEY)) || []; } catch (e) { return []; }
  },
  save(lines) {
    OR.storage.set('localStorage', this.KEY, JSON.stringify(lines));
    document.dispatchEvent(new CustomEvent('or:cart'));
  },
  add(id, variant, qty) {
    const lines = this.lines();
    const line = lines.find(l => l.id === id && l.variant === variant);
    if (line) line.qty += qty; else lines.push({ id, variant, qty });
    this.save(lines);
  },
  setQty(id, variant, qty) {
    let lines = this.lines();
    const line = lines.find(l => l.id === id && l.variant === variant);
    if (!line) return;
    line.qty = qty;
    lines = lines.filter(l => l.qty > 0);
    this.save(lines);
  },
  remove(id, variant) {
    this.save(this.lines().filter(l => !(l.id === id && l.variant === variant)));
  },
  clear() {
    this.save([]);
    OR.storage.remove('localStorage', this.COUPON_KEY);
  },
  count() {
    return this.lines().reduce((n, l) => n + l.qty, 0);
  },
  // Líneas enriquecidas con datos del álbum
  detailed() {
    return this.lines().map(l => {
      const album = OR.findAlbum(l.id);
      return album ? { ...l, album, unit: OR.priceFor(album, l.variant), total: OR.priceFor(album, l.variant) * l.qty } : null;
    }).filter(Boolean);
  },
  ga4Items() {
    return this.detailed().map((l, i) => OR.toGA4Item(l.album, { variant: l.variant, quantity: l.qty, index: i }));
  },
  coupon() {
    const c = OR.storage.get('localStorage', this.COUPON_KEY);
    return c && this.COUPONS[c] ? c : null;
  },
  setCoupon(code) {
    if (code && this.COUPONS[code]) { OR.storage.set('localStorage', this.COUPON_KEY, code); return true; }
    OR.storage.remove('localStorage', this.COUPON_KEY);
    return false;
  },
  totals(shipping) {
    const subtotal = this.detailed().reduce((s, l) => s + l.total, 0);
    const code = this.coupon();
    const discount = code ? subtotal * this.COUPONS[code] : 0;
    const value = subtotal - discount;
    const tax = value * 0.16;
    shipping = shipping || 0;
    const r = n => +n.toFixed(2);
    return { subtotal: r(subtotal), discount: r(discount), value: r(value), tax: r(tax), shipping: r(shipping), total: r(value + tax + shipping), coupon: code };
  }
};
