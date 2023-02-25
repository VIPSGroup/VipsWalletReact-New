import React from 'react'
import { municipalTaxServiceId } from '../../../constants'
import ServiceFrontCommon from '../ServiceFrontCommon'

const MunicipalTax = () => {
  return (
    <ServiceFrontCommon serviceId={municipalTaxServiceId} serviceName="municipaltax" title="Municipal Tax" />
  )
}

export default MunicipalTax