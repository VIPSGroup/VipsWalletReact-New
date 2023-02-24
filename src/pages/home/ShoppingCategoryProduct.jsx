import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { baseApiUrl } from "../../constant/Baseurls";
import { getPromotionalProduct } from "../../redux/slices/productSlice";

const ShoppingCategoryProduct = () => {
  const dispatch = useDispatch();
  const { promotionProduct, loading } = useSelector(
    (state) => state.productSlice.promotionData
  );
  useEffect(() => {
    dispatch(getPromotionalProduct(11));
  }, []);

  return (
    <>
      {
        <ProductHorizontal
          title="VIPS"
          products={promotionProduct.Data}
          subtitle=" Promotional"
          description="Discover all the VIPS merchandise here!"
        />
      }
    </>
  );
};

export default ShoppingCategoryProduct;
