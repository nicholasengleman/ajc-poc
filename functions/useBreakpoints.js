"use client";

import { useMemo } from "react";
import useMediaQuery from "./useMediaQuery";

export default function useBreakpoints() {
  const isMobileSm = useMediaQuery("(max-width: 480px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isMobileXL = useMediaQuery("(max-width: 850px");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isDesktopMd = useMediaQuery("(min-width: 1200px)");
  const isDesktopLg = useMediaQuery("(min-width: 1400px)");

  const breakpoints = useMemo(() => {
    let active = "mobile";

    if (isMobile) {
      active = "mobile";
    } else if (isMobileXL) {
      active = "isMobileXL";
    } else if (isTablet) {
      active = "tablet";
    } else if (isDesktop) {
      active = "desktop";
    }

    return {
      isMobile,
      isMobileXL,
      isTablet,
      isDesktop,
      isDesktopMd,
      isDesktopLg,
      isMobileSm,
      active,
    };
  }, [
    isMobileSm,
    isMobile,
    isMobileXL,
    isTablet,
    isDesktop,
    isDesktopMd,
    isDesktopLg,
  ]);

  return breakpoints;
}
