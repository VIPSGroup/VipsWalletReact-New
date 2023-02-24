<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceFrontComp from "./ServiceFrontComp";
import CommonTopNav from "../../components/home/CommonTopNav";
import Footer from "../../components/home/Footer";
import { getServiceId } from "../../constants";

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
=======
import React from 'react'

const ServiceFrontCommon = () => {
  return (
    <div>ServiceFrontCommon</div>
  )
}

export default ServiceFrontCommon
>>>>>>> ed09810ff29c7919987aade63b7c45f08e55702a
