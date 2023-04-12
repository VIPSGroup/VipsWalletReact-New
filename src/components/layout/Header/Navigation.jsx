import React from "react";
import { useResolvedPath } from "react-router-dom";
import { BannerTopNav, CommonTopNav, HomeTopNav } from "./";

const Navigation = ({
  isHomeTopNav,
  isBottomTopNav,
  isCommonTopNav,
  title,
  setActive,
  setGrams,
  grams,
  setAmount,
  amount,
  setStep,
  step,
}) => {
  const path = useResolvedPath().pathname;

  return (
    <>
      {!isHomeTopNav &&
        !isBottomTopNav &&
        path !== "/shopping/cart" &&
        path !== "/shopping/address" &&

        path !== "/shopping/checkout" &&
        isCommonTopNav && (
          <CommonTopNav
            setActive={setActive}
            title={title}
            setAmount={setAmount}
            amount={amount}
            setGrams={setGrams}
            grams={grams}
            setStep={setStep}
            step={step}
          />
        )}

      {isHomeTopNav && <HomeTopNav />}
      {isBottomTopNav && <BannerTopNav />}
    </>
  );
};

export default Navigation;
