export function parsePrice(value: string): number {
  return Number(value.replace(/[^\d]/g, ''));
}
