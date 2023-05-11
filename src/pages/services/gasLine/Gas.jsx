import React from "react";
import { gasServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const Gas = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Gas Bill Payment Online: IGL, Mahanagar, MNGL, Adani & Guj Gas | Quick & Secure"
        }
        canonical={"https://www.vipswallet.com/services/gas"}
        metaDescription={
          "Pay your IGL, Mahanagar, MNGL, Adani, and Guj Gas bills online with ease. Experience a fast, secure, and hassle-free way to manage and pay your gas bills through our user-friendly platform."
        }
        keywords={
          "igl bill payment, mahanagar gas bill payment, mngl bill payment, adani gas bill payment, igl bill payment online, guj gas bill pay"
        }
      />
      <ServiceFrontCommon
        serviceId={gasServiceId}
        serviceName="gas"
        title="Gas"
      />
    </>
  );
};

export default Gas;
