import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getProductsByCategory } from "../../apiData/shopping/product";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { getProductsByCategory } from "../../redux/slices/shopping/productSlice";

export const ShoppingCategoryProduct = ({
  title,
  categoryId,
  subtitle = "",
  description = "",
}) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.productSlice.categoryByProduct
  );

  useEffect(() => {
    dispatch(getProductsByCategory(11));
  }, []);

  return (
    <>
      {
        <ProductHorizontal
          title={"VIPS "}
          subtitle={"Promotional"}
          products={data.Data}
          loading={loading}
          description={"Discover all the VIPS merchandise here!"}
        />
      }
    </>
  );
};
