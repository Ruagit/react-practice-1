interface DebouncableFunction {
  (...args: any[]): any;
}

export const debounce = <T extends DebouncableFunction>(
  func: T,
  wait: number,
  immediate: boolean = false
) => {
  let timeout: number | null = null;

  return async (...args: Parameters<T>): Promise<void> => {
    const later = async () => {
      timeout = null;
      if (!immediate) {
        await func(...args);
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      later().catch((error) =>
        console.error("Error in debounced function:", error)
      );
    }, wait);

    if (callNow) {
      try {
        await func(...args);
      } catch (error) {
        console.error("Error in immediate debounced function call:", error);
      }
    }
  };
};
