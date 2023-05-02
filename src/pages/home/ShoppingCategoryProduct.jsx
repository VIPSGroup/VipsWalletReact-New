import { useEffect, useState } from "react";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { getProductsByCategory } from "../../redux/slices/shopping/productSlice";
import { useDispatch, useSelector } from "react-redux";

export const ShoppingCategoryProduct = ({
  title,
  categoryId,
  subtitle = "",
  description = "",
  recomType,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { catProducts,loading } = useSelector(
  //   (state) => state.productSlice.categoryByProduct
  // );
const dispatch= useDispatch()
  useEffect(() => {
    console.log("calee");
    setLoading(true);
    // dispatch(getProductsByCategory(categoryId))
    getProductsByCategory(categoryId).then((response) => {
      setLoading(false);
      setProducts(response.Data.filter((product) => product.Quantity !== 0));
    });
  }, []);
  // useEffect(() => {
  //   if(catProducts?.ResponseStatus===1){
  //     setProducts(catProducts?.Data.filter((product) => product.Quantity !== 0))
  //   }
  // }, [catProducts])
  return (
    <>
      <ProductHorizontal
        recomType={recomType}
        title={title}
        subtitle={subtitle}
        products={products?.filter((product) => product.Quantity !== 0)}
        loading={loading}
        description={description}
      />
    </>
  );
};
