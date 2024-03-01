export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const debounce = (fn: Function, delay: number = 500): Function => {
  let lastFn: Function | null = null;
  let lastTimeout: NodeJS.Timeout;

  return (...args: any) => {
    lastFn = () => fn(...args);

    const timeout = setTimeout(() => {
      if (lastFn && lastTimeout == timeout) {
        lastFn();
        lastFn = null;
      }
      clearTimeout(timeout);
    }, delay);

    lastTimeout = timeout;
  };
};
