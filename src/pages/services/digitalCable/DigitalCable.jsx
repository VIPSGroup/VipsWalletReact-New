import React from "react";
import { digitalCableServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const DigitalCable = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Digital Cable Bill Payment | Quick, Easy & Secure Online Payments"
        }
        canonical={"https://www.vipswallet.com/services/digitalCable"}
        metaDescription={
          "Pay your digital cable bills online effortlessly. Experience a fast, easy, and secure way to manage and pay your cable bill payments without any hassle."
        }
        keywords={"asianet cable payment, asianet cable bill payment"}
      />
      <ServiceFrontCommon
        serviceId={digitalCableServiceId}
        serviceName="digitalCable"
        title="Digital Cable"
      />
    </>
  );
};

export default DigitalCable;
