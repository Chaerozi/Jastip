const IDR_LOCALE = 'id-ID';
const IDR_CURRENCY = 'IDR';

export function formatCurrency(
  amount: number,
  options?: Partial<{
    locale: string;
    currency: string;
    showSymbol: boolean;
  }>
): string {
  const { locale = IDR_LOCALE, currency = IDR_CURRENCY, showSymbol = true } = options ?? {};

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? 'currency' : 'decimal',
    currency: showSymbol ? currency : undefined,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d,-]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}
