import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getSubCategory } from "../../apiData/shopping/category";
import {
  getNewArrivalProducts,
  getProductsBySubCategory,
} from "../../apiData/shopping/product";

import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../components/Cards/ProductCard";
import Footer from "../../components/layout/Footer/Footer";
import { LatestLoading } from "../../components/common/Loading";
import { Card, Row, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsByCategory,
  getSubCategory,
} from "../../redux/slices/productSlice";
ReactGA.initialize(googleAnalytics);
const ProductListing = () => {
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const { data } = useSelector((state) => state.productSlice.GetSubCat);
  const { data: getproByCat } = useSelector(
    (state) => state.productSlice.categoryByProduct
  );
  const handleSubCategoryClick = (e) => {
    e.preventDefault();

    if (e.currentTarget.value == "all") {
      setSelectedSubCategoryId("0");
      setActiveProducts(categoryProducts);
    } else {
      setSelectedSubCategoryId(e.currentTarget.value);
      const pro = loadSubCategoryProducts(e.currentTarget.value);
      setActiveProducts(pro);
    }
  };

  const loadSubCategoryProducts = (subCategoryId) => {
    getProductsBySubCategory(subCategoryId).then((response) => {
      setActiveProducts(response.Data);
    });
  };

  let { categoryName, categoryId } = useParams();
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    dispatch(getSubCategory(categoryId));
    dispatch(getProductsByCategory(categoryId));
  }, []);
  useEffect(() => {
    setSubCategories(data.Data);
    setCategoryProducts(getproByCat.Data);
    setActiveProducts(getproByCat.Data);
  }, [data, getproByCat]);
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
      // const sorted = newArr.sort((a, b) => b?.SalePrice - a?.SalePrice);
      // setActiveProducts(sorted);
    }
  };

  const shoppingSubCategoryBar = () => (
    <>
      <div class="section shopping-catagory-nav">
        <div class="container-fluid">
          <div class="row d-none d-sm-block">
            <div class="col-md-12">
              <div class="shopping-catagory-nav-outer">
                {subCategories && (
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    slidesToSlide={2}
                    className="container"
                  >
                    {/* { <div class="shopping-catagory-box" >
                            <button onClick={handleSubCategoryClick} value="all"  type="button" >
                              <div>
                              <img  src={`/images/logos/vips-logo-small.png`} />
                              <span class="shopping-catagory-box-title">All Products</span>
                              </div>
                            </button>
                          </div>} */}
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
                  { value: "new", label: "Newest Arrivals" },
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
  );

  const productsDisplay = () => (
    <>
      <section class="shopping-catagory-outer Promotional">
        <div class="container">
          <div class="row">
            {activeProducts &&
              activeProducts?.map((product, i) => (
                <ProductCard product={product} />
                //    {<div class="col-sm-6 col-md-6 col-lg-3 mb-4">
                //    <a href="#" class="promo-product">
                //      <div class="promo-product-card">
                //        <span class="promo-offer"> Free Delivery </span>
                //        <div class="promo-product-image">
                //             <img src={`http://shopadmin.vipswallet.com/${product.ImageThumbURL1}`} class="img-fluid shopping-catagory-img" alt="..." />
                //        </div>
                //        <div class="promo-product-details">
                //            <h3>{product.Name}</h3>
                //            <div class="promo-product-price-detail">
                //              <div class="promo-product-price">
                //                <span class="promo-product-mrp"> &#x20B9; 670.00</span>
                //                <span class="promo-product-list-price"><s> &#x20B9; 1,200.00</s>(35%)</span>
                //              </div>
                //              <div class="promo-product-delivery">
                //                <p>Delivery by Oct 11, 2022</p>
                //              </div>
                //            </div>
                //        </div>

                //        <div class="promo-product-action">
                //          <div class="promo-quick-view">
                //            <button class="btn-cta">Quick View</button>
                //          </div>
                //          <div class="promo-wishlist ml-auto">
                //            <button href="#" class="btn-cta"><i class="fa-regular fa-heart"></i></button>
                //          </div>
                //        </div>

                //      </div>
                //    </a>
                //  </div>}
              ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="color-body">
      {shoppingSubCategoryBar()}
      {activeProducts?.length !== 0 && activeProducts !== undefined ? (
        productsDisplay()
      ) : (
        <LatestLoading />
      )}
      {/* <Footer /> */}
    </div>
  );
};

export default ProductListing;
