import React, { useEffect, useRef, useState } from "react";

import Carousel from "react-multi-carousel";
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
              <div class="row">
            <div class="container-fluid shopby-carousel">
              <Carousel
                responsive={responsive}
                infinite={true}
              >
 {ShopByCat.map((e, i) => {
                  return (
                    <div key={i} class="m-3">
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
              </Carousel>
               

                <div class="col-md-12 text-center mt-4">
                  <div class="view-all-btn">
                    <Link to="/shopping" class="btn-cta">
                      {" "}
                      View All{" "}
                    </Link>
                  </div>
                </div>
              </div>
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
