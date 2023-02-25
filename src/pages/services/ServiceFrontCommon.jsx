import React from 'react'
import ServiceFrontComp from './ServiceFrontComp'

const ServiceFrontCommon = ({ title, serviceName, serviceId }) => {
  return (
    <div className="color-body">
      <ServiceFrontComp
        title={title}
        serviceId={serviceId}
        serviceName={serviceName}
      />
    </div>
  )
}

export default ServiceFrontCommon