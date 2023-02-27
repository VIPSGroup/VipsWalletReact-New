import React from "react";
import { digitalCableServiceId } from "../../../constants";
import ServiceFrontCommon from "../ServiceFrontCommon";

const DigitalCable = () => {
  return (
    <ServiceFrontCommon
      serviceId={digitalCableServiceId}
      serviceName="digitalCable"
      title="Digital Cable"
    />
  );
};

export default DigitalCable;
