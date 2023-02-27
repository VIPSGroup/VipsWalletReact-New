import { useEffect, useState } from "react";
import { getNewArrivalProducts } from "../../apiData/shopping/product";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";

export const NewArrivalProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getNewArrivalProducts().then((response) => {
      setData(response.Data);
    });
  }, []);

  return (
    <>
      {
        <ProductHorizontal
          title="New"
          subtitle=" Arrival Products"
          products={data}
          description="Fresh, new products releasing and going live everyday!"
        />
      }
    </>
  );
};
