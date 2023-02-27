import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceFrontComp from "./ServiceFrontComp";
// import CommonTopNav from "../../components/home/CommonTopNav";
// import Footer from "../../components/home/Footer";
import { getServiceId } from "../../constants";
import Footer from "../../components/layout/Footer/Footer";

const ServiceFrontCommon = ({ title, serviceName, serviceId }) => {
  return (
    <div className="color-body">
      <ServiceFrontComp
        title={title}
        serviceId={serviceId}
        serviceName={serviceName}
      />
      <Footer />
    </div>
  );
};

export default ServiceFrontCommon;
