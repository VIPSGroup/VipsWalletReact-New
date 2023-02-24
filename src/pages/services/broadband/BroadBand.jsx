import { broadbandServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const BroadBand = () => {
  return (
    <ServiceFrontCommon
      serviceId={broadbandServiceId}
      serviceName="broadband"
      title="Broadband"
    />
  );
};

export default BroadBand;
