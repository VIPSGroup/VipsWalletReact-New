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
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.productSlice.categoryByProduct
  );

  useEffect(() => {
    dispatch(getProductsByCategory(categoryId));
    console.log(data);
  }, []);

  useEffect(() => {
    console.log("UseEffect");
setProducts(data.Data)
  }, [data])
  
  return (
    <>
        <ProductHorizontal
          title={title}
          subtitle={subtitle}
          products={products}
          loading={loading}
          description={description}
        />
    </>
  );
};
