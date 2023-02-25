import React from 'react'
import { BannerTopNav, CommonTopNav, HomeTopNav } from './'

const Navigation = ({ isHomeTopNav, isBottomTopNav }) => {
  return (
    <>
    {!isHomeTopNav && !isBottomTopNav && <CommonTopNav />}
    {isHomeTopNav && <HomeTopNav />}
    {isBottomTopNav && <BannerTopNav />}
  </>
  )
}

export default Navigation