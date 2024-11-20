const getLocalStorageItem = (lsIndex) => {
  if (typeof window !== 'undefined' && window.localStorage !== 'undefined') {
    return window.localStorage.getItem(lsIndex);
  }
  return null;
};

const setLocalStorageItem = (lsIndex, lsValue) => {
  if (typeof window !== 'undefined' && window.localStorage !== 'undefined') {
    return window.localStorage.setItem(lsIndex, lsValue);
  }
  return null;
};

export { getLocalStorageItem, setLocalStorageItem };
