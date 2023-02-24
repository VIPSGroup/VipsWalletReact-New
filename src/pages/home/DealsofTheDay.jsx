import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { baseApiUrl } from "../../constant/Baseurls";
import { getDealsOfTheDay } from "../../redux/slices/dealsSlice";
// export const getDealsOfTheDay = async () => {
//   const formData = new FormData();
//   formData.append("tocken", "XMCNBVGDTE734BCU65DW");
//   formData.append("Categoryid", null);
//   try {
//     const res = await axios.post(
//       `${baseApiUrl}/ECommerceServices/GetDODProduct`,
//       formData
//     );
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const DealsofTheDay = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.dealsSlice);

  useEffect(() => {
    dispatch(getDealsOfTheDay());
  }, []);

  return (
    <>
      <ProductHorizontal
        title="Deals"
        subtitle="of the Day"
        products={data.Data}
        description="Exciting, fresh deals on a daily basis. Buy your wishlist products at low cost!"
      />
    </>
  );
};

export default DealsofTheDay;
