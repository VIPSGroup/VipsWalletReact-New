import React from "react";
import { loanRepaymentServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";
import DynamicMeta from "../../../components/SEO/DynamicMeta";

const LoanRepayment = () => {
  return (
    <>
      <DynamicMeta
        title={
          "Online Loan Repayment: HDFC, Bajaj Finance, Hero Fincorp | Fast, Secure Payments"
        }
        canonical={"https://www.vipswallet.com/services/loanrepayment"}
        metaDescription={
          "Streamline your loan repayments online with us. Fast, secure HDFC home loan payments, Bajaj Finance EMI payments, and Hero Fincorp online payments. Experience the ease of managing your loans effectively."
        }
        keywords={
          "loan repayment online, hdfc loan repayment online, hdfc home loan online payment, hdfc loan payment, bajaj finance emi payment, hdfc loan payment online, hero fincorp online payment, bajaj emi payment"
        }
      />
      <ServiceFrontCommon
        serviceId={loanRepaymentServiceId}
        serviceName="loanrepayment"
        title="Loan Repayment"
      />
    </>
  );
};

export default LoanRepayment;
