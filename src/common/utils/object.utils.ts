export function omitField<T, K extends keyof T>(
  obj: T,
  key: K,
): Omit<T, K> {
  const copy = { ...obj };
  delete copy[key];
  return copy;
}