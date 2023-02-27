import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../apiData/shopping/product";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";

export const ShoppingCategoryProduct = ({
  title,
  categoryId,
  subtitle = "",
  description = "",
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductsByCategory(categoryId).then((response) => {
      setData(response.Data);
    });
  }, []);

  return (
    <>
      {
        <ProductHorizontal
          title={title}
          subtitle={subtitle}
          products={data}
          description={description}
        />
      }
    </>
  );
};
