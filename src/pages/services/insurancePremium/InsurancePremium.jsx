import React from 'react'
import { insuranceServiceId } from '../../../constants'
import ServiceFrontCommon from '../ServiceFrontCommon'

const InsurancePremium = () => {
  return (
    <ServiceFrontCommon serviceId={insuranceServiceId} serviceName="insurancepremium" title="Insurance Premium" />
  )
}

export default InsurancePremium