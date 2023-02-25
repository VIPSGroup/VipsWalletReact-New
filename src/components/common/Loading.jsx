import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading = ({ color = "#fff" }) => {
  return (
    <div className="service-loader">
    <ThreeDots
      height="20"
      width="50"
      radius="7"
      color={color}
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      className="threedots-animation"
      visible={true}
    />
  </div>
  )
}

export default Loading