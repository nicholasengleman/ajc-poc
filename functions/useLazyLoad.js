import { useEffect } from 'react';

export default (el, cb, customScrollContainerEl) => {
  let fetched = false;

  const lazyLoadImage = () => {
    if (!el.current) {
      return;
    }

    // These get re-assigned each time the function runs
    let imagePosition = el.current.getBoundingClientRect().top; //eslint-disable-line
    let windowHeight = window.innerHeight; //eslint-disable-line

    if (!fetched && imagePosition !== 0 && imagePosition < windowHeight + 300) {
      cb();
      fetched = true;
    }
  };

  useEffect(() => {
    const scrollContainer =
      customScrollContainerEl &&
      document.querySelector(customScrollContainerEl);
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', lazyLoadImage);
      scrollContainer.addEventListener('DOMContentLoaded', lazyLoadImage);
    }
    window.addEventListener('scroll', lazyLoadImage);
    window.addEventListener('DOMContentLoaded', lazyLoadImage);

    return () => {
      window.removeEventListener('scroll', lazyLoadImage);
      window.removeEventListener('DOMContentLoaded', lazyLoadImage);
      scrollContainer.addEventListener('scroll', lazyLoadImage);
      scrollContainer.addEventListener('DOMContentLoaded', lazyLoadImage);
    };
  }, []);
};
