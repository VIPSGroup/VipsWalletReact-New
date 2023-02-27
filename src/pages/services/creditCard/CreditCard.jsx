import { creditCardServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const CreditCard = () => {
  return (
    <ServiceFrontCommon
      serviceId={creditCardServiceId}
      serviceName="creditcard"
      title="Credit card"
    />
  );
};

export default CreditCard;
