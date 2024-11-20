const getSessionStorageItem = (lsIndex) => {
  if (typeof window !== 'undefined' && window.sessionStorage !== 'undefined') {
    return window.sessionStorage.getItem(lsIndex);
  }
  return null;
};

const setSessionStorageItem = (lsIndex, lsValue) => {
  if (typeof window !== 'undefined' && window.sessionStorage !== 'undefined') {
    return window.sessionStorage.setItem(lsIndex, lsValue);
  }
  return null;
};

export { getSessionStorageItem, setSessionStorageItem };
