import React, { useEffect } from 'react'

const FAQ = ({setIsBottomTopNav}) => {
  useEffect(()=>{
    setIsBottomTopNav(true)
    return ()=>{setIsBottomTopNav(false)}
},[])
  return (
    <div>FAQ</div>
  )
}

export default FAQ