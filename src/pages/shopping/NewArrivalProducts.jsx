import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getNewArrivalProducts } from "../../apiData/shopping/product";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { getNewArrivalProducts } from "../../redux/slices/shopping/productSlice";

export const NewArrivalProducts = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.productSlice.newArrivalProduct);

  useEffect(() => {
    dispatch(getNewArrivalProducts());
  }, []);
  return (
    <> 
      {
        <ProductHorizontal
          title="New"
          subtitle=" Arrival Products"
          products={data && data.Data?.filter(product=>product.Quantity!==0)}
          description="Fresh, new products releasing and going live everyday!"
        />
      }
    </>
  );
};
