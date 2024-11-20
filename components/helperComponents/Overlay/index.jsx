import React, { useEffect } from "react";

const Overlay = ({ mobileMenuToggled, setMobileMenuToggled, onClickCb }) => {
  useEffect(() => {
    if (mobileMenuToggled) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else if (!mobileMenuToggled) {
      document.body.style.overflow = "initial";
      document.body.style.height = "initial";
    }
  }, [mobileMenuToggled]);

  const handleOnClick = () => {
    if (onClickCb) {
      onClickCb();
    }

    if (setMobileMenuToggled) {
      setMobileMenuToggled(false);
    }
  };

  return (
    <div
      className={`b-overlay ${mobileMenuToggled ? "isVisible" : ""}`}
      onClick={() => handleOnClick()}
    ></div>
  );
};

export default Overlay;
