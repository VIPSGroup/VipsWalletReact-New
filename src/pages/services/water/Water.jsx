import { waterServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const Water = () => {
  return (
    <ServiceFrontCommon
      serviceId={waterServiceId}
      serviceName="water"
      title="Water"
    />
  );
};

export default Water;
