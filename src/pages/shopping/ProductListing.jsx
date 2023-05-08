import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getNewArrivalProducts,
  // getProductsBySubCategory,
} from "../../apiData/shopping/product";

import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../components/Cards/ProductCard";
import { Card, Row, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByCategory,
  getProductsBySubCategory,
  getRecomId,
  getSubCategory,
} from "../../redux/slices/shopping/productSlice";
import { Loading } from "../../components/common";
import CarouselProductCard from "../../components/Cards/CarouselProductCard";
ReactGA.initialize(googleAnalytics);
const ProductListing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const { data } = useSelector((state) => state.productSlice.GetSubCat);
  const { subCategoryProducts,subLoading } = useSelector(
    (state) => state.productSlice.subCategoryByProduct
  );
  // const { catProducts,loading } = useSelector(
  //   (state) => state.productSlice.categoryByProduct
  // );
  const handleSubCategoryClick = (e) => {
    e.preventDefault();
    if (e.currentTarget.value == "all") {
      setSelectedSubCategoryId("0");
      setActiveProducts(categoryProducts);
    } else {
      setSelectedSubCategoryId(e.currentTarget.value);
      const pro = loadSubCategoryProducts(e.currentTarget.value);
      setActiveProducts(pro);
      const data = {
        type: "subcategory",
        id: parseFloat(e.currentTarget.value),
      };
      dispatch(getRecomId(data));
    }
  };

  const loadSubCategoryProducts = (subCategoryId) => {
    dispatch(getProductsBySubCategory(subCategoryId))
  };

  let { categoryName, categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    ReactGA.pageview(window.location.pathname);
    dispatch(getSubCategory(categoryId));
    setActiveProducts([])
    // dispatch(getProductsByCategory(categoryId))
    getProductsByCategory(categoryId).then((response) => {
      setLoading(false)

      setCategoryProducts(response.Data);
      setActiveProducts(response.Data);
    });
  }, []);
  useEffect(() => {
    if(subCategoryProducts?.ResponseStatus===1){
      setActiveProducts(subCategoryProducts?.Data)
    }
  }, [subCategoryProducts])
  // useEffect(() => {
  //   if(catProducts?.ResponseStatus===1){
  //     setCategoryProducts(catProducts?.Data);
  //     setActiveProducts(catProducts?.Data);
  //   }
  // }, [catProducts])
  
  useEffect(() => {
    setSubCategories(data.Data);
  }, [data]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      partialVisibilityGutter: 10,
    },
  };

  const handleChange = (e) => {
    let newArr = [...activeProducts];
    if (e === "lowtohigh") {
      const sorted = newArr.sort((a, b) => a?.SalePrice - b?.SalePrice);
      setActiveProducts(sorted);
    } else if (e === "hightolow") {
      const sorted = newArr.sort((a, b) => b?.SalePrice - a?.SalePrice);
      setActiveProducts(sorted);
    } else if (e === "new") {
      getNewArrivalProducts().then((response) => {
        setActiveProducts(response.Data);
      });
    }
  };

  const shoppingSubCategoryBar = () => {
    return (
      <>
        <>
          <div class="section shopping-catagory-nav">
            <div class="container-fluid">
              <div class="row d-none d-sm-block">
                <div class="col-md-12">
                  <div class="shopping-catagory-nav-outer">
                    {subCategories && (
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        responsive={responsive}
                        infinite={true}
                        slidesToSlide={2}
                        className="container"
                      >
                        {subCategories &&
                          subCategories.map((c, i) => (
                            <div class="shopping-catagory-box">
                              <button
                                onClick={handleSubCategoryClick}
                                value={c.Id}
                                type="button"
                              >
                                <div>
                                  <img
                                    src={
                                      ` http://shopadmin.vipswallet.com/Content/Images/subcategories/` +
                                      c.ImageUrl
                                    }
                                  />
                                  <span class="shopping-catagory-box-title">
                                    {c.Name}
                                  </span>
                                </div>
                              </button>
                            </div>
                          ))}
                      </Carousel>
                    )}
                  </div>
                </div>
              </div>
              <div className="container">
                <Row align={"middle"}>
                  <Select
                    size="middle"
                    defaultValue="Recommended"
                    style={{ width: 160 }}
                    onChange={handleChange}
                    options={[
                      { value: "lowtohigh", label: "Price : Low to High" },
                      { value: "hightolow", label: "Price : High to Low" },
                      // { value: "new", label: "Newest Arrivals" },
                    ]}
                  />
                </Row>
              </div>
              {/* -- catagorie nav for mobile view start -- */}
              <div class="row d-block d-sm-none">
                <div class="col-md-12">
                  <div class="shopping-catagory-nav-outer catagory-nav-scroller">
                    {subCategories &&
                      subCategories.map((c, i) => (
                        <div class="shopping-catagory-box">
                          <button
                            onClick={handleSubCategoryClick}
                            value={c.Id}
                            type="button"
                          >
                            <div>
                              <img
                                src={
                                  ` http://shopadmin.vipswallet.com/Content/Images/subcategories/` +
                                  c.ImageUrl
                                }
                              />
                              <span class="shopping-catagory-box-title">
                                {c.Name}
                              </span>
                            </div>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* -- catagorie nav for mobile view end -- */}
            </div>
          </div>
        </>
      </>
    );
  };

  const productsDisplay = () => (
    <>
      <section class="shopping-catagory-outer Promotional">
        <div class="container">
          <div class="row">
            {activeProducts &&
              activeProducts
                ?.filter((product) => product.Quantity !== 0)
                .map((product, i) => <ProductCard product={product} />)}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="color-body">
      <Spin spinning={loading}>
      {shoppingSubCategoryBar()}
      <Spin spinning={subLoading}>
      {activeProducts?.length !== 0 && activeProducts?.filter((product) => product.Quantity !== 0).length!==0 && activeProducts !== undefined ? (
        productsDisplay()

      ) : (<div className="row">
        <div className="col-lg-2 offset-1 my-3">{!loading && !subLoading && <h5>No Data Found</h5>} </div>
      </div>)}
      </Spin>
      </Spin>
    </div>
  );
};

export default ProductListing;
