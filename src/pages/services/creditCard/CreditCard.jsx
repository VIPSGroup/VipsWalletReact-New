import React from "react";
import { creditCardServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const CreditCard = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Credit Card Bill Payment Online: HDFC, SBI, RBL, Yes Bank, Kotak, IndusInd & Citibank | Secure & Instant"
        }
        canonical={"https://www.vipswallet.com/services/creditcard"}
        metaDescription={
          "Pay your credit card bills online with our secure, user-friendly platform. Hassle-free payments for HDFC, SBI, RBL, Yes Bank, Kotak, IndusInd, and Citibank credit cards. Manage your bills effectively and effortlessly."
        }
        keywords={
          "hdfc credit card payment, sbi credit card payment,  rbl credit card payment,  sbi card payment online, hdfc credit card payment online, credit card bill payment,  yes bank credit card payment, kotak credit card payment, indusind bank credit card payment, sbi card payment online, citibank credit card payment"
        }
      />
      <ServiceFrontCommon
        serviceId={creditCardServiceId}
        serviceName="creditcard"
        title="Credit card"
      />
    </>
  );
};

export default CreditCard;
