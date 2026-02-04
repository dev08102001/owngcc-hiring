export function ensure<T>(value: T | null | undefined, fallback: T): T {
  return value ?? fallback;
}

