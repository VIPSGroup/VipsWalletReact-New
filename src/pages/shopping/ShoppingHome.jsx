import React, { useState, useEffect } from "react";
import "../../assets/styles/shopping/shoppingHome.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fashionCategoryId, electronicCategoryId } from "../../constants";
import { Link } from "react-router-dom";
import TopSlider from "../../components/Sliders/shopping/TopSlider";
import DealsofTheDay from "../home/DealsofTheDay";
import { NewArrivalProducts } from "./NewArrivalProducts";
import DiscountBanner from "../home/DiscountBanner";
import { ShoppingCategoryProduct } from "../home/ShoppingCategoryProduct";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getRecomId,
} from "../../redux/slices/shopping/productSlice";
import { getSliderBannerImage } from "../../redux/slices/bannerSlice";
import { Loading } from "../../components/common";

const ShoppingHome = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.productSlice.AllCat);
  const { SliderBanners } = useSelector((state) => state.bannerSlice);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getSliderBannerImage());
  }, []);

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

  const shoppingCategoryBar = () => {
    return (
      <>
        <div class="section shopping-catagory-nav">
          <div class="container-fluid">
            <div class="row d-none d-sm-block">
              <div class="col-md-12">
                <div class="shopping-catagory-nav-outer">
                  {data ? (
                    <Carousel
                      swipeable={false}
                      draggable={false}
                      responsive={responsive}
                      infinite={true}
                      className="container"
                    >
                      {data &&
                        data.Data.Categories?.map((c, i) =>
                          c.Name == "Exclusive/Membership" ? null : (
                            <div class="shopping-catagory-box">
                              <Link
                                onClick={() => {
                                  const data = {
                                    type: "category",
                                    id: c.Id,
                                  };
                                  dispatch(getRecomId(data));
                                }}
                                to={`/shopping/${c.Name}/${c.Id}`}
                              >
                                <img
                                  src={
                                    `http://shopadmin.vipswallet.com/Content/Images/categories/` +
                                    c.ImageUrl
                                  }
                                />
                                <span class="shopping-catagory-box-title">
                                  {c.Name}
                                </span>
                              </Link>
                            </div>
                          )
                        )}
                    </Carousel>
                  ) : (
                    // <LatestLoading />
                    <Loading />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {shoppingCategoryBar()}

      <TopSlider banners={SliderBanners.Data} id={5} />
      <DealsofTheDay />
      <ShoppingCategoryProduct
        title="VIPS"
        subtitle=" Promotional"
        recomType={"promotional"}
        categoryId={11}
        description="Discover all the VIPS merchandise here!"
      />
      <NewArrivalProducts />
      <DiscountBanner />
      <ShoppingCategoryProduct
        recomType={"fashion"}
        title={"Fashion"}
        categoryId={fashionCategoryId}
        description="Select your shopping product from a variety of categories and goods."
      />
      <ShoppingCategoryProduct
        recomType={"electronics"}
        title={"Electronics"}
        categoryId={electronicCategoryId}
        description="Best electronic devices at affordable prices with great offers."
      />
    </>
  );
};

export default ShoppingHome;
