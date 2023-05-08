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
        recomType={"dod"}
        title="Deals "
        loading={loading}
        subtitle="of the Day"
        products={data?.Data?.filter((product) => product.Quantity !== 0)}
        description="Exciting, fresh deals on a daily basis. Buy your wishlist products at low cost!"
      />
    </>
  );
};

export default DealsofTheDay;
