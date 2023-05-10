import { useEffect, useState } from "react";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { getProductsByCategory } from "../../redux/slices/shopping/productSlice";

export const ShoppingCategoryProduct = ({
  title,
  categoryId,
  subtitle = "",
  description = "",
  recomType,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)

    getProductsByCategory(categoryId).then((response) => {
      setLoading(false);
      // setProducts(response.Data);
      setProducts(response.Data.filter(item=>item.Quantity>0));
    });
  }, []);
  return (
    <>
      <ProductHorizontal
        recomType={recomType}
        title={title}
        subtitle={subtitle}
        products={products}
        loading={loading}
        description={description}
      />
    </>
  );
};
