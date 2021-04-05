const formatter = Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
});

export function formatMoney(dollars: number): string {
  return formatter.format(dollars);
}
