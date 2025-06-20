export function formatPrice(price: number) {
  return price.toLocaleString("ko-KR");
}

export function getDiscountRate(price: number, discountedPrice?: number) {
  if (!discountedPrice) return 0;

  const discountRate = ((price - discountedPrice) / price) * 100;
  return discountRate.toFixed(0);
}
