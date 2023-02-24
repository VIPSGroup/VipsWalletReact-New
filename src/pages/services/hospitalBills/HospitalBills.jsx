import {  hospitalBillsServiceId } from '../../../constants';
import ServiceFrontCommon from '../ServiceFrontCommon';

const HospitalBills = () => {
  return (
   <ServiceFrontCommon serviceId={hospitalBillsServiceId} serviceName="hospitalbills" title="Hospital " />
  );
};


export default HospitalBills