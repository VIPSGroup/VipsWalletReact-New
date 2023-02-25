import React, { useEffect } from 'react'

const Disclaimer = ({setIsBottomTopNav}) => {
  useEffect(()=>{
    setIsBottomTopNav(true)
    return ()=>{setIsBottomTopNav(false)}
},[])
  return (
    <div>Disclaimer</div>
  )
}

export default Disclaimer