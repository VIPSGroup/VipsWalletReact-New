import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { HomeTopNav } from "../components/layout/Header";
import { Login } from "../pages/authentication";
import Homepage from "../pages/home/Homepage";
// import { Homepage } from "../pages/home";
import { AddAmount, PaymentOptions, SendMoney } from "../pages/Money";
import { AccountWireframe, MyOrder, Passbook } from "../pages/myAccount";
import { PrimeConfirmation, PrimeIndex } from "../pages/primeMember";
import { ContactUs, Disclaimer, FAQ, OnlineStores, ReferAFriend, TermsAndConditions } from "../pages/publicPages";
import { Broadband, ClubAssociation, CreditCard, DigitalCable, DthConfirmation, DthFront, ElectricityConfirmation, ElectricityFront, FastagFront, FastagOnlineConfirmation, Gas, HousingSociety, InsurancePremium, Landline, LoanRepayment, LpgGasConfirmation, LpgGasFront, MunicipalServices, MunicipalTax, Recharge, RechargeConfirmation, ServiceCommonSuccess, ServiceConfirmationCommon, ServiceFrontCommon, ServiceIndex, ServiceSuccess, SubscriptionFees, Water } from "../pages/services";
import HospitalBills from "../pages/services/hospitalBills/HospitalBills";
import { Cart, Checkout, ProductDetails, ProductListing, ShippingAddress, ShoppingHome, Wishlist } from "../pages/shopping";
import Footer from "../components/layout/Footer/Footer";
import CommonTopNav from "../components/layout/Header/CommonTopNav";
import HomeTopNav from "../components/layout/Header/HomeTopNav";
import AddAmount from "../pages/addMoney/AddAmount";
import PaymentOptions from "../pages/addMoney/PaymentOptions";
import AllServicePage from "../pages/AllServicePage";
import Login from "../pages/authentication/Login";
import SignUp from "../pages/authentication/Signup";
import Homepage from "../pages/home/Homepage";
import PrimeIndex from "../pages/primeMember/PrimeIndex";
import SendMoney from "../pages/sendMoney/SendMoney";
import BroadBand from "../pages/services/broadband/BroadBand";
import ClubAssociation from "../pages/services/clubAssociation/ClubAssociation";
import CreditCard from "../pages/services/creditCard/CreditCard";
import DigitalCable from "../pages/services/digitalCable/DigitalCable";
import DthConfirmation from "../pages/services/dthRecharge/DthConfirmation";
import DthFront from "../pages/services/dthRecharge/DthFront";
import ElectricityConfirmation from "../pages/services/electricity/ElectricityConfirmation";
import ElectricityFront from "../pages/services/electricity/ElectricityFront";
import FastagConfirmation from "../pages/services/fastagRecharge/FastagConfirmation";
import FastagFront from "../pages/services/fastagRecharge/FastagFront";
import Gas from "../pages/services/gasLine/Gas";
import HospitalBills from "../pages/services/hospitalBills/HospitalBills";
import HousingSociety from "../pages/services/housingSociety/HousingSociety";
import InsurancePremium from "../pages/services/insurancePremium/InsurancePremium";
import Landline from "../pages/services/landline/Landline";
import Loanrepayment from "../pages/services/loanRepayment/Loanrepayment";
import LPGGasConfirmation from "../pages/services/lpgGas/LpgGasConfirmation";
import LpgGasFront from "../pages/services/lpgGas/LpgGasFront";
import Recharge from "../pages/services/mobileRecharge/Recharge";
import RechargeConfirmation from "../pages/services/mobileRecharge/RechargeConfirmation";
import MunicipalServices from "../pages/services/municipalServices/MunicipalServices";
import MunicipalTax from "../pages/services/municipalTax/MunicipalTax";
import ServiceCommonSuccess from "../pages/services/ServiceCommonSuccess";
import ServiceConfirmationCommon from "../pages/services/ServiceConfirmationCommon";
import ServiceFrontCommon from "../pages/services/ServiceFrontCommon";
import ServiceSuccess from "../pages/services/ServiceSuccess";
import SubscriptionFees from "../pages/services/subscriptionFess/SubscriptionFees";
import Water from "../pages/services/water/Water";
import ShoppingHome from "../pages/shopping/ShoppingHome";

const Router = () => {
  return (
    <>
    <HomeTopNav/>
     <Routes>
     <Route element={<Homepage />} path="/" >

</Route>
<Route path="/login" element={<Login />} />
          <Route path="/addMoney/options" element={<PaymentOptions />} />
          <Route
            path="/addMoney/:option/amount"
            element={
              <ProtectedRoute>
                {" "}
                <AddAmount />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/sendMoney"
            element={
              <ProtectedRoute>
                {" "}
                <SendMoney />{" "}
              </ProtectedRoute>
            }
          />

          {/** Mobile Recharge */}
          <Route
            path="/services/mobileRecharge"
            element={
              <ProtectedRoute>
                {" "}
                <Recharge />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/mobileRecharge/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <RechargeConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/services" element={<ServiceIndex />} />
          {/*.................... */}
          {/** DTH */}
          <Route
            path="/services/dth"
            element={
              <ProtectedRoute>
                {" "}
                <DthFront />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/dth/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <DthConfirmation />{" "}
              </ProtectedRoute>
            }
          />

          {/**................... */}

          {/* Electricity */}
          <Route
            path="/services/electricity"
            element={
              <ProtectedRoute>
                {" "}
                <ElectricityFront />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/electricity/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <ElectricityConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          {/**..................... */}

          {/** Fastag */}
          <Route
            path="/services/fastag"
            element={
              <ProtectedRoute>
                {" "}
                <FastagFront />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/fastag/online/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <FastagOnlineConfirmation />{" "}
              </ProtectedRoute>
            }
          />
          {/**...................... */}

          {/** LPG Gas */}
          <Route
            path="/services/lpggas"
            element={
              <ProtectedRoute>
                {" "}
                <LpgGasFront />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/LPG/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <LpgGasConfirmation />{" "}
              </ProtectedRoute>
            }
          />

          {/**...................... */}

          <Route
            path="/services/digitalCable"
            element={
              <ProtectedRoute>
                {" "}
                <DigitalCable />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/BroadBand"
            element={
              <ProtectedRoute>
                {" "}
                <Broadband />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/gas"
            element={
              <ProtectedRoute>
                {" "}
                <Gas />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/insurancepremium"
            element={
              <ProtectedRoute>
                {" "}
                <InsurancePremium />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/services/landline"
            element={
              <ProtectedRoute>
                {" "}
                <Landline />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/water"
            element={
              <ProtectedRoute>
                {" "}
                <Water />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/loanrepayment"
            element={
              <ProtectedRoute>
                {" "}
                <LoanRepayment />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/creditcard"
            element={
              <ProtectedRoute>
                {" "}
                <CreditCard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/housingsociety"
            element={
              <ProtectedRoute>
                {" "}
                <HousingSociety />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/hospitalbills"
            element={
              <ProtectedRoute>
                {" "}
                <HospitalBills />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/subscriptionfees"
            element={
              <ProtectedRoute>
                {" "}
                <SubscriptionFees />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/clubassociation"
            element={
              <ProtectedRoute>
                {" "}
                <ClubAssociation />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/municipaltax"
            element={
              <ProtectedRoute>
                {" "}
                <MunicipalTax />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/municipalservices"
            element={
              <ProtectedRoute>
                {" "}
                <MunicipalServices />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/services/common/:serviceName"
            element={
              <ProtectedRoute>
                {" "}
                <ServiceFrontCommon />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/common/:serviceName/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <ServiceConfirmationCommon />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/services/status"
            element={
              <ProtectedRoute>
                {" "}
                <ServiceSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/success"
            element={
              <ProtectedRoute>
                {" "}
                <ServiceCommonSuccess />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/prime"
            element={
              <ProtectedRoute>
                {" "}
                <PrimeIndex />
                {/* <PrimeIndex setIsBottomTopNav={setIsBottomTopNav} /> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/prime/confirm"
            element={
              <ProtectedRoute>
                {" "}
                <PrimeConfirmation />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/refer"
            element={
              <ProtectedRoute>
                {" "}
                <ReferAFriend />{" "}
                {/* <ReferAFriend setIsBottomTopNav={setIsBottomTopNav} />{" "} */}
              </ProtectedRoute>
            }
          />

          <Route
            path="/myaccount"
            element={
              <ProtectedRoute>
                {" "}
                <AccountWireframe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passbook"
            element={
              <ProtectedRoute>
                {" "}
                <Passbook />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorder"
            element={
              <ProtectedRoute>
                {" "}
                <MyOrder />{" "}
              </ProtectedRoute>
            }
          />

          {/* Shopping */}

          <Route path="/shopping" element={<ShoppingHome />} />
          <Route
            path="/shopping/:categoryName/:categoryId"
            element={
              <ProtectedRoute>
                {" "}
                <ProductListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping/product/:productId/:productName"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping/wishlist"
            element={
              <ProtectedRoute>
                {" "}
                <Wishlist />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping/cart"
            element={
              <ProtectedRoute>
                {" "}
                <Cart />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping/address"
            element={
              <ProtectedRoute>
                {" "}
                <ShippingAddress />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping/checkout"
            element={
              <ProtectedRoute>
                {" "}
                <Checkout />{" "}
              </ProtectedRoute>
            }
          />

          {/*......................................................... */}

          {/* TERMS & CONDITIONs */}
          <Route
            path="/privacypolicy"
            element={
              <TermsAndConditions
                title="Privacy Policy"
                type="privacypolicy"
              />
            }
          />
          <Route
            path="/aboutus"
            element={<TermsAndConditions title="About Us" type="aboutus" />}
          />
          <Route
            path="/termscondtion"
            element={
              <TermsAndConditions
                title="Terms & Conditions"
                type="termscondtion"
              />
            }
          />
          <Route
            path="/faq"
            element={<TermsAndConditions title="FAQ" type="faq" />}
          />

          <Route
            path="/faqs"
            element={<FAQ  />}
            // element={<FAQ setIsBottomTopNav={setIsBottomTopNav} />}
          />
          <Route
            path="/disclaimer"
            element={<Disclaimer />}
            // element={<Disclaimer setIsBottomTopNav={setIsBottomTopNav} />}
          />
          <Route
            path="/contactus"
            element={<ContactUs  />}
            // element={<ContactUs setIsBottomTopNav={setIsBottomTopNav} />}
          />
          <Route path="/onlinestores" element={<OnlineStores />} />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                {" "}
                {/* <SuccessPage />{" "} */}
              </ProtectedRoute>
            }
          />
        </Routes>
      <Routes>
        <Route element={<Homepage HomeTopNav={HomeTopNav} />} path="/" />
        <Route
          element={<ShoppingHome CommonTopNav={CommonTopNav} />}
          path="/shopping"
        />
        <Route
          element={<AllServicePage CommonTopNav={CommonTopNav} />}
          path="/services"
        />
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<PaymentOptions />} path="/addMoney/options" />
        <Route path="/addMoney/:option/amount" element={<AddAmount />} />
        <Route path="/sendMoney" element={<SendMoney />} />
        <Route path="/services/mobileRecharge" element={<Recharge />} />
        <Route
          path="/services/mobileRecharge/confirm"
          element={<RechargeConfirmation />}
        />
        <Route path="/services/dth" element={<DthFront />} />
        <Route path="/services/dth/confirm" element={<DthConfirmation />} />
        <Route path="/services/electricity" element={<ElectricityFront />} />
        <Route
          path="/services/electricity/confirm"
          element={<ElectricityConfirmation />}
        />
        <Route path="/services/fastag" element={<FastagFront />} />
        <Route
          path="/services/fastag/online/confirm"
          element={<FastagConfirmation />}
        />
        <Route path="/services/lpggas" element={<LpgGasFront />} />
        <Route path="/services/LPG/confirm" element={<LPGGasConfirmation />} />
        <Route path="/services/digitalCable" element={<DigitalCable />} />
        <Route path="/services/BroadBand" element={<BroadBand />} />
        <Route path="/services/gas" element={<Gas />} />
        <Route
          path="/services/insurancepremium"
          element={<InsurancePremium />}
        />
        <Route path="/services/landline" element={<Landline />} />
        <Route path="/services/water" element={<Water />} />
        <Route path="/services/loanrepayment" element={<Loanrepayment />} />
        <Route path="/services/creditcard" element={<CreditCard />} />
        <Route path="/services/housingsociety" element={<HousingSociety />} />
        <Route path="/services/hospitalbills" element={<HospitalBills />} />
        <Route
          path="/services/subscriptionfees"
          element={<SubscriptionFees />}
        />
        <Route path="/services/clubassociation" element={<ClubAssociation />} />
        <Route path="/services/municipaltax" element={<MunicipalTax />} />
        <Route
          path="/services/municipalservices"
          element={<MunicipalServices />}
        />
        <Route
          path="/services/common/:serviceName"
          element={<ServiceFrontCommon />}
        />
        <Route
          path="/services/common/:serviceName/confirm"
          element={<ServiceConfirmationCommon />}
        />
        <Route path="/services/status" element={<ServiceSuccess />} />
        <Route path="/services/success" element={<ServiceCommonSuccess />} />
        <Route path="/prime" element={<PrimeIndex />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
