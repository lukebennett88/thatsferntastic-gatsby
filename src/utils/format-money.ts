const formatter = Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

export function formatMoney(cents: number) {
  return formatter.format(cents / 100);
}
