import React from "react";
import BannerTopNav from "./BannerTopNav";
import CommonTopNav from "./CommonTopNav";
import HomeTopNav from "./HomeTopNav";

const MainNav = ({ isHomeTopNav, isBottomTopNav }) => {
  return (
    <>
      {!isHomeTopNav && !isBottomTopNav && <CommonTopNav />}
      {isHomeTopNav && <HomeTopNav />}
      {isBottomTopNav && <BannerTopNav />}
    </>
  );
};
export default MainNav;
