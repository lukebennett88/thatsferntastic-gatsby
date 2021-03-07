const formatPrice = (currency, value) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(value);

export { formatPrice };
