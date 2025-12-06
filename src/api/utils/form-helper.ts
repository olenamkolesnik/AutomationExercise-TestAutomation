export function toFormPayload(
  obj: Record<string, any>
): Record<string, string | number | boolean> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value ?? ''])
  );
}
