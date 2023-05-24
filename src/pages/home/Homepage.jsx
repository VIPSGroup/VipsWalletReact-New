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
import DynamicMeta from "../../components/SEO/DynamicMeta";
const Homepage = ({ setIsHomeTopNav }) => {
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const [isPrime, setIsPrime] = useState(false);
  useEffect(() => {
    if (loggedInUser) {
      checkPrime({
        userName: loggedInUser.UserName,
        password: loggedInUser.TRXNPassword,
      }).then((response) => {
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
      <DynamicMeta
        title={
          "VIPS Wallet: UPI Payments, Bill Payments, Recharges, Insurance, DTH & More"
        }
        canonical={"https://www.vipswallet.com/"}
        metaDescription={
          "Discover a seamless experience with our online wallet for UPI payments. Make all your transactions quick, secure, and hassle-free with our user-friendly virtual wallet. Manage your finances at your fingertips."
        }
        keywords={
          "online wallet, payments wallet, virtual wallet, UPI payments"
        }
      />
      {!isPrime && loggedInUser ? primeFixed() : null}
      <HomeTopBannerSlider />
      <HomeBottomServiceBar />
      <ShopByCategory />
      <ServiceCategory />
      <GameBanner />
      <ShoppingCategoryProduct
        title="VIPS"
        subtitle=" Product"
        description="VIPS Wallet shopping portal also offers custom VIPS-labelled products. Shop the look only on VIPS Wallet. Explore the merchandise we offer!"
        categoryId={11}
        subtitleDesc={"Join the trend like others."}
      />
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
