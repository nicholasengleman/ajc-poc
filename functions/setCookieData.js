const setCookieData = (cookieName, data, maxAge = 259200) => {
  if (cookieName && data) {
    document.cookie = `${cookieName}=${data};max-age=${maxAge};path=/`;
  }
};

export default setCookieData;
