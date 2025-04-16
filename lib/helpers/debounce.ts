export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const result = func(...args);

      if (result instanceof Promise) {
        result.catch((error) =>
          console.error("Debounced function error:", error)
        );
      }
    }, delay);
  };
};
