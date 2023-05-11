import React from "react";
import { broadbandServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const Broadband = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Broadband Bill Payment Online: Airtel, BSNL, Netplus & ACT Fibernet | Quick & Secure"
        }
        canonical={"https://www.vipswallet.com/services/BroadBand"}
        metaDescription={
          "Pay your Airtel, BSNL, Netplus, and ACT Fibernet broadband bills online effortlessly. Enjoy a fast, secure, and hassle-free way to manage and pay your broadband bills with our user-friendly platform."
        }
        keywords={
          "airtel broadband bill payment, bsnl broadband bill payment, netplus bill pay, act fibernet bill payment, bsnl wifi bill payment"
        }
      />
      <ServiceFrontCommon
        serviceId={broadbandServiceId}
        serviceName="broadband"
        title="Broadband"
      />
    </>
  );
};

export default Broadband;
