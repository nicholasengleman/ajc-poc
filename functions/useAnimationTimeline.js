import { useState, useEffect } from 'react';
import useScrollPercentage from './useScrollPercentage';

export default function useAnimationTimeline() {
  const [elRef, scrollPercentage] = useScrollPercentage();
  const [animation, setAnimation] = useState();
  const [animationConfig, setAnimationTimelineConfig] = useState();

  useEffect(() => {
    setAnimation(animationConfig);
  }, [setAnimation, animationConfig]);

  useEffect(() => {
    if (animation && !Number.isNaN(scrollPercentage)) {
      animation.seek(scrollPercentage * animation.duration);
    }
  }, [animation, scrollPercentage]);

  return [elRef, setAnimationTimelineConfig];
}
