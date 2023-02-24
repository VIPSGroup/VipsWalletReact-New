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
import {
  ContactUs,
  Disclaimer,
  FAQ,
  OnlineStores,
  ReferAFriend,
  TermsAndConditions,
} from "../pages/publicPages";
import {
  Broadband,
  ClubAssociation,
  CreditCard,
  DigitalCable,
  DthConfirmation,
  DthFront,
  ElectricityConfirmation,
  ElectricityFront,
  FastagFront,
  FastagOnlineConfirmation,
  Gas,
  HousingSociety,
  InsurancePremium,
  Landline,
  LoanRepayment,
  LpgGasConfirmation,
  LpgGasFront,
  MunicipalServices,
  MunicipalTax,
  Recharge,
  RechargeConfirmation,
  ServiceCommonSuccess,
  ServiceConfirmationCommon,
  ServiceFrontCommon,
  ServiceIndex,
  ServiceSuccess,
  SubscriptionFees,
  Water,
} from "../pages/services";
import HospitalBills from "../pages/services/hospitalBills/HospitalBills";
import {
  Cart,
  Checkout,
  ProductDetails,
  ProductListing,
  ShippingAddress,
  ShoppingHome,
  Wishlist,
} from "../pages/shopping";
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
      <HomeTopNav />

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
