import React from 'react'
import { broadbandServiceId } from '../../../constants'
import ServiceFrontCommon from '../ServiceFrontCommon'

const Broadband = () => {
  return (
    <ServiceFrontCommon serviceId={broadbandServiceId} serviceName="broadband" title="Broadband" />
  )
}

export default Broadband