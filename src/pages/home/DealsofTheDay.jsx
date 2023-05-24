// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
// import { baseApiUrl } from "../../constant/Baseurls";
import { getDealsOfTheDay } from "../../redux/slices/dealsSlice";

const DealsofTheDay = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dealsSlice);

  useEffect(() => {
    dispatch(getDealsOfTheDay());
  }, []);

  return (
    <>
      <ProductHorizontal
        title="Deals "
        loading={loading}
        subtitle="of the Day"
        products={data?.Data?.filter((product) => product.Quantity !== 0)}
        description="Exclusive deals only for VIPS Wallet users. VIPS Wallet offers competitive deals and low prices on selected products each day. For a better shopping experience, check the section daily to shop for your most awaited product at a low cost as compared to other shopping portals.
        "
      />
    </>
  );
};

export default DealsofTheDay;
