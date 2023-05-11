import React from "react";
import { waterServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const Water = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Water Bill Payment Online: Delhi Jal Board, Kerala Water Authority, BWSSB | Fast & Secure"
        }
        canonical={"https://www.vipswallet.com/services/water"}
        metaDescription={
          "Pay your water bills online with our fast, secure, and user-friendly platform. Effortlessly manage and pay Delhi Jal Board, Kerala Water Authority, and BWSSB bills for a hassle-free experience."
        }
        keywords={
          "water bill online, water bill payment, pay water bill, water bill payment online, delhi jal board bill payment, kerala water authority bill payment, bwssb online payment"
        }
      />
      <ServiceFrontCommon
        serviceId={waterServiceId}
        serviceName="water"
        title="Water"
      />
    </>
  );
};

export default Water;
