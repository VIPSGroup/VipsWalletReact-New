import React from "react";
import { useResolvedPath } from "react-router-dom";
import { BannerTopNav, CommonTopNav, HomeTopNav } from "./";

const Navigation = ({ isHomeTopNav, isBottomTopNav }) => {
    const path = useResolvedPath().pathname
    console.log(path, "llll")

  return (
    <>
      {!isHomeTopNav && !isBottomTopNav && (path !== '/shopping/cart') && (path !== '/shopping/address') && (path !== '/shopping/checkout') && <CommonTopNav />}
      {isHomeTopNav && <HomeTopNav />}
      {isBottomTopNav && <BannerTopNav />}
    </>
  );
};

export default Navigation;
