import { useRef, useState, useEffect } from 'react';

export default function useScrollPercentage() {
  const scrollRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState();

  const reportScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const totalContainerHeight =
        el.parentElement.clientHeight - el.clientHeight;
      const scrollDistance = el.offsetTop;
      const percentage =
        scrollDistance > 0
          ? Math.round((scrollDistance / totalContainerHeight) * 100) / 100
          : 0;
      setScrollPercentage(percentage);
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', reportScroll, { passive: true });
      window.addEventListener('DomContentLoaded', reportScroll, {
        passive: true,
      });
      window.addEventListener('load', reportScroll, { passive: true });
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', reportScroll);
        window.removeEventListener('DomContentLoaded', reportScroll);
        window.removeEventListener('load', reportScroll);
      }
    };
  }, []);

  return [scrollRef, scrollPercentage];
}
