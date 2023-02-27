import React from 'react'
import { loanRepaymentServiceId } from '../../../constants'
import ServiceFrontCommon from '../ServiceFrontCommon'

const LoanRepayment = () => {
  return (
    <ServiceFrontCommon serviceId={loanRepaymentServiceId} serviceName="loanrepayment" title="Loan Repayment" />
  )
}

export default LoanRepayment