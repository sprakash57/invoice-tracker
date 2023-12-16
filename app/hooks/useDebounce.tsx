import { useMemo } from 'react';

const debounce = <T,>(fn: (arg: T) => void, delay: number) => {
  let timeoutId: number;
  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(fn, delay, ...args);
  };
};

const useDebounce = <T,>(fn: (arg: T) => void, delay = 500) => {
  const debouncedFn = useMemo(() => {
    return debounce<T>(fn, delay);
  }, [fn, delay]);

  return debouncedFn;
};

export default useDebounce;
