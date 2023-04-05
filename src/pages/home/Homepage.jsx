import HomeTopBannerSlider from "../../components/Sliders/HomeTopBannerSlider";
import HomeBottomServiceBar from "../../components/layout/Header/HomeBottomServiceBar";
import ShopByCategory from "../home/ShopByCategory";
import ServiceCategory from "../home/ServiceCategory";
import OnlineStore from "../home/OnlineStore";
import PrimeMembership from "./PrimeMembership";
import DealsofTheDay from "./DealsofTheDay";
import DiscountBanner from "./DiscountBanner";
import PaymentApp from "./PaymentApp";
import InspiredByBrowsingHistory from "./InspiredByBrowsingHistory";
import { useEffect } from "react";
import { ShoppingCategoryProduct } from "./ShoppingCategoryProduct";
import GameBanner from "./GameBanner";
const Homepage = ({ setIsHomeTopNav }) => {
  useEffect(() => {
    setIsHomeTopNav(true);
    return () => {
      setIsHomeTopNav(false);
    };
  });

  return (
    <>
      <HomeTopBannerSlider />
      <HomeBottomServiceBar />
      <ShopByCategory />
      <ServiceCategory />
      <GameBanner/>
      <ShoppingCategoryProduct title="VIPS" subtitle=" Promotional"  description="Discover all the VIPS merchandise here!" categoryId={11}/>
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
