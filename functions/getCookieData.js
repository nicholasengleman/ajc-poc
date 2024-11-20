const getCookieData = (cookieName) => {
  if (typeof window !== 'undefined') {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(cookieName))
      ?.split('=')[1];

    if (cookieValue) {
      return JSON.parse(cookieValue);
    }
  }
  return null;
};

export default getCookieData;
