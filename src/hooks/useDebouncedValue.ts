import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeOutId = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeOutId);
  }, [value, delay]);

  return debounced;
}
