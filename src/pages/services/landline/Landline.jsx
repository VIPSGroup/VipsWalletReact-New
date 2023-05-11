import React from "react";
import { landlineServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const Landline = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Landline Bill Payment: BSNL, Airtel & MTNL | Easy & Secure Online Payments"
        }
        canonical={"https://www.vipswallet.com/services/landline"}
        metaDescription={
          "Pay your BSNL, Airtel, and MTNL landline bills effortlessly with our online platform. Quick, secure, and hassle-free landline bill payments for a convenient and smooth experience."
        }
        keywords={
          "bsnl bill payment, bsnl landline bill payment, bsnl landline bill, bsnl landline payment, airtel land line bill payment, airtel landline bill payment, mtnl payment bill, mtnl bill payment online"
        }
      />
      <ServiceFrontCommon
        serviceId={landlineServiceId}
        serviceName="landline"
        title="Landline"
      />
    </>
  );
};

export default Landline;
