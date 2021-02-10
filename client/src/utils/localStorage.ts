export const setLocalStorageItem = (key: string, value: string) =>
  window.localStorage.setItem(key, value);

export const getLocalStorageItem = (key: string) =>
  window.localStorage.getItem(key);

export const removeLocalStorageItem = (key: string) =>
  window.localStorage.removeItem(key);

export const clearLocalStorage = () => window.localStorage.clear();
