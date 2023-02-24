import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PrimeMembership from "../../components/banners/primeMember/PrimeMembership";
import HomeBottomServiceBar from "../../components/layout/Header/HomeBottomServiceBar";
import HomeTopBannerSlider from "../../components/Sliders/HomeTopBannerSlider";
import { getDealsOfTheDay } from "../../redux/slices/dealsSlice";
import { checkPrime } from "../../redux/slices/primeUserSlice";
import { getPromotionalProduct } from "../../redux/slices/productSlice";
import DealsofTheDay from "./DealsofTheDay";
import DiscountBanner from "./DiscountBanner";
import InspiredByBrowsingHistory from "./InspiredByBrowsingHistory";
import OnlineStore from "./OnlineStore";
import PaymentApp from "./PaymentApp";
import ServiceCategory from "./ServiceCategory";
import ShopByCategory from "./ShopByCategory";
import ShoppingCategoryProduct from "./ShoppingCategoryProduct";
const Homepage = ({ HomeTopNav }) => {
  return (
    <>
      <HomeTopNav />
      <HomeTopBannerSlider />
      <HomeBottomServiceBar />
      <ShopByCategory />
      <ServiceCategory />
      <ShoppingCategoryProduct />
      <OnlineStore />
      <PrimeMembership />
      <DealsofTheDay />
      <DiscountBanner />
      <PaymentApp />
      <InspiredByBrowsingHistory />
    </>
  );
};

export default Homepage;
