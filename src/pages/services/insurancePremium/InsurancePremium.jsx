import React from "react";
import { insuranceServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const InsurancePremium = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Insurance Premium Online Payment | Fast, Easy & Secure Payment Solutions"
        }
        canonical={"https://www.vipswallet.com/services/insurancepremium"}
        metaDescription={
          "Pay your insurance premiums online with our fast, easy, and secure payment platform. Enjoy hassle-free online transactions for your insurance needs and stay protected with peace of mind."
        }
        keywords={"insurance premium online payment,  pay insurance online"}
      />
      <ServiceFrontCommon
        serviceId={insuranceServiceId}
        serviceName="insurancepremium"
        title="Insurance Premium"
      />
    </>
  );
};

export default InsurancePremium;
