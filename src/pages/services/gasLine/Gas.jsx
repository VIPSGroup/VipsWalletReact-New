import React from "react";
import { gasServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const Gas = () => {
  return (
    <ServiceFrontCommon
      serviceId={gasServiceId}
      serviceName="gas"
      title="Gas"
    />
  );
};

export default Gas;
