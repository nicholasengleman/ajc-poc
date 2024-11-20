import { useState, useEffect } from 'react';
import useScrollPercentage from './useScrollPercentage';

export default function useAnimation() {
  const [elRef, scrollPercentage] = useScrollPercentage();
  const [animation, setAnimation] = useState();
  const [animationConfig, setAnimationConfig] = useState();

  useEffect(() => {
    let isCancelled = false;

    const loadAnime = async () => {
      const anime = await import('animejs/lib/anime.es.js').then(
        (module) => module.default,
      );

      if (!isCancelled) {
        setAnimation(
          anime({
            autoplay: false,
            easing: 'linear',
            ...animationConfig,
          }),
        );
      }
    };

    loadAnime();

    return () => {
      isCancelled = true;
    };
  }, [animationConfig]);

  useEffect(() => {
    if (animation && scrollPercentage) {
      animation.seek(scrollPercentage * animation.duration);
    }
  }, [animation, scrollPercentage]);

  return [elRef, setAnimationConfig];
}
