type FormSerializable = string | number | boolean | Date | null | undefined;

type FormSerializableObject<T> = {
  [K in keyof T]: T[K] extends FormSerializable ? T[K] : never;
};

export function toFormPayload<T extends object>(
  obj: FormSerializableObject<T>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );
}
