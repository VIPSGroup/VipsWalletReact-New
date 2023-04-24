import React, { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "../../assets/styles/home/promotional.css";
import "../../assets/styles/styles.css";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";

const InspiredByBrowsingHistory = () => {
  const [products, setProducts] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("recent"));
    setProducts(data);
  }, []);

  return (
    <>
    {products && <ProductHorizontal
        title="Inspired "
        subtitle="By Browsing History"
        products={products}
        description=""
      />}
      
    </>
  );
};

export default InspiredByBrowsingHistory;
