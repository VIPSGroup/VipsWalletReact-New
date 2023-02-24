import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../assets/styles/home/shopByCategory.css";
import "../../assets/styles/styles.css";
import "../../assets/styles/swiper.css";
import { Link } from "react-router-dom";

import "../../assets/styles/home/shopByCategory.css";
import "../../assets/styles/styles.css";

const ShopByCategory = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const [mobileScreen, setMobileScreen] = useState();

  useEffect(() => {
    if (window.innerWidth < 560) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 992 },
      items: 6,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 991, min: 641 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 640, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <section class="section-align shopby-shopping">
        <div class="container-fluid">
          <div class="container">
            <div class="section-head pt-1">
              <h1 class="section-head-title">
                <span>Shop</span> By Shopping Category
              </h1>
              <p className="section-head-subtitle">
                We've got every shopping mood covered!
              </p>
            </div>
          </div>

          <div class="shopby-outer">
            <div class="container-fluid">
              {/* {!mobileScreen ? ( */}
              <div class="row">
                {ShopByCat.map((e, i) => {
                  return (
                    <div key={i} class="col-sm-6 col-md-2 p-1">
                      <div class="shopby-product">
                        <Link to={e.route}>
                          <div class="shopby-img">
                            <img src={e.img} alt="Product" class="img-fluid" />
                          </div>
                          <div class="shopby-text">
                            <div class="shopby-product-title">
                              <h3>{e.title}</h3>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}

                <div class="col-md-11 text-center mt-4">
                  <div class="view-all-btn">
                    <Link to="/shopping" class="btn-cta">
                      {" "}
                      View All{" "}
                    </Link>
                  </div>
                </div>
              </div>
              {/* ) : (
                <div className="row">
                  <Swiper
                    style={{
                      "--swiper-navigation-color": "#CA3060",
                      "--swiper-navigation-background": "green",
                      ".swiper-button-prev": {
                        background: "white",
                      },
                    }}
                
                    navigation={true}
                  
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Fashion/43">
                            <div class="shopby-img">
                              <img
                                src="/images/home/fashion.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Fashion</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Mobiles/70">
                            <div class="shopby-img">
                              <img
                                src="/images/home/mobile.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Mobile</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Electronics/53">
                            <div class="shopby-img">
                              <img
                                src="/images/home/electronics.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Electronics</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Footwear/54">
                            <div class="shopby-img">
                              <img
                                src="/images/home/footwear.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Footwear</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Grocery/50">
                            <div class="shopby-img">
                              <img
                                src="/images/home/grocery.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Grocery</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="col-sm-10 col-md-2 p-1">
                        <div class="shopby-product">
                          <Link to="/shopping/Furniture/7">
                            <div class="shopby-img">
                              <img
                                src="/images/home/furniture.jpg"
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="shopby-text">
                              <div class="shopby-product-title">
                                <h3>Furniture</h3>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                    <div ref={navigationPrevRef} />
                    <div ref={navigationNextRef} />
                  </Swiper>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ShopByCat = [
  {
    img: "/images/home/fashion.jpg",
    title: "Fashion",
    route: "/shopping/Fashion/43",
  },
  {
    img: "/images/home/mobile.jpg",
    title: "Mobile",
    route: "/shopping/Mobiles/70",
  },
  {
    img: "/images/home/electronics.jpg",
    title: "Electronics",
    route: "/shopping/Electronics/53",
  },
  {
    img: "/images/home/footwear.jpg",
    title: "Footwear",
    route: "/shopping/Footwear/54",
  },
  {
    img: "/images/home/grocery.jpg",
    title: "Grocery",
    route: "/shopping/Grocery/50",
  },
  {
    img: "/images/home/furniture.jpg",
    title: "Furniture",
    route: "/shopping/Furniture/7",
  },
];

export default ShopByCategory;
