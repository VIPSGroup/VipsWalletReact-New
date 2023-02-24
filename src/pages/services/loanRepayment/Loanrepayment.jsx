import {  loanRepaymentServiceId, waterServiceId } from '../../../constants';
import ServiceFrontCommon from '../ServiceFrontCommon';

const Loanrepayment = () => {
  return (
   <ServiceFrontCommon serviceId={loanRepaymentServiceId} serviceName="loanrepayment" title="Loan Repayment" />
  );
};


export default Loanrepayment