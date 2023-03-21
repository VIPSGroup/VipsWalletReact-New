import React from "react";
import { useResolvedPath } from "react-router-dom";
import { BannerTopNav, CommonTopNav, HomeTopNav } from "./";

const Navigation = ({
  isHomeTopNav,
  isBottomTopNav,
  isCommonTopNav,
  title,
}) => {
  const path = useResolvedPath().pathname;

  return (
    <>
      {!isHomeTopNav &&
        !isBottomTopNav &&
        path !== "/shopping/cart" &&
        path !== "/shopping/address" &&
        // path !== "/shopping/checkout" && isCommonTopNav && <CommonTopNav setActive={setActive}/>}
        path !== "/shopping/checkout" &&
        isCommonTopNav && <CommonTopNav title={title} />}
      {isHomeTopNav && <HomeTopNav />}
      {isBottomTopNav && <BannerTopNav />}
    </>
  );
};

export default Navigation;
