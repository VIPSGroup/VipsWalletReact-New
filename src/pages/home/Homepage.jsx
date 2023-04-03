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
import { useEffect, useState } from "react";
import { ShoppingCategoryProduct } from "./ShoppingCategoryProduct";
import GameBanner from "./GameBanner";
import { useDispatch, useSelector } from "react-redux";
import { checkPrime } from "../../redux/slices/primeUserSlice";
import { Link } from "react-router-dom";
const Homepage = ({ setIsHomeTopNav }) => {
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
  const [isPrime, setIsPrime] = useState(false);
  useEffect(() => {
    if(loggedInUser){
      console.log(loggedInUser);
    checkPrime({userName:loggedInUser.UserName, password:loggedInUser.TRXNPassword}).then((response) => {
        if (response.ResponseStatus === 1) {
          setIsPrime(true);
        }
      });
    }
    setIsHomeTopNav(true);
    return () => {
      setIsHomeTopNav(false);
    };
  });
  const primeFixed = () => (
    // {<!-- New fixed right button start -->}
    <div class="fixed-right-button">
      <ul>
        <li>
          <Link to="/prime">
            <span class="fixed-prime-icon">
              <img src="/images/crowns_icon.svg" />
            </span>
            <span class="prime-text"> Get Prime Membership </span>
          </Link>
        </li>
      </ul>
    </div>
    // {<!-- New fixed right button end -->}
  );
  return (
    <>
      {!isPrime && loggedInUser ? primeFixed() : null}
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
