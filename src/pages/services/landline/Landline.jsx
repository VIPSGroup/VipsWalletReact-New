import { landlineServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const Landline = () => {
  return (
    <ServiceFrontCommon
      serviceId={landlineServiceId}
      serviceName="landline"
      title="Landline"
    />
  );
};

export default Landline;
