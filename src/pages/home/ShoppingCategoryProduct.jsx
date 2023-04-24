import { useEffect, useState } from "react";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { getProductsByCategory } from "../../redux/slices/shopping/productSlice";

export const ShoppingCategoryProduct = ({
  title,
  categoryId,
  subtitle = "",
  description = "",
}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getProductsByCategory(categoryId).then(response=>{
      setLoading(false)
      setProducts(response.Data.filter(product=>product.Quantity!==0))
    })
  }, []);
  
  return (
    <>
        <ProductHorizontal
          title={title}
          subtitle={subtitle}
          products={products?.filter(product=>product.Quantity!==0)}
          loading={loading}
          description={description}
        />
    </>
  );
};
