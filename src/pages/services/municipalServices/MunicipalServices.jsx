import React from 'react'
import { municipalServicesServiceId } from '../../../constants'
import ServiceFrontCommon from '../ServiceFrontCommon'

const MunicipalServices = () => {
  return (
    <ServiceFrontCommon serviceId={municipalServicesServiceId} serviceName="municipalservices" title="Municipal Services" />
  )
}

export default MunicipalServices