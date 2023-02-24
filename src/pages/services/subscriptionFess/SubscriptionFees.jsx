import {  subscriptionServiceId } from '../../../constants';
import ServiceFrontCommon from '../ServiceFrontCommon';

const SubscriptionFees  = () => {
  return (
   <ServiceFrontCommon serviceId={subscriptionServiceId} serviceName="subscriptionfees" title="Subscription Fees" />
  );
};


export default SubscriptionFees