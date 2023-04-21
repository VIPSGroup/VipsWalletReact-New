import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LatestLoading } from "../../common/Loading";
import { Loading } from "../../common";

const TopSlider = ({ banners, id = 1 }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const t = "shopadmin.vipswallet.com";
  return (
    <div class="shopping-home-banner">
      <div class="shopping-home-banner-inner">
        <Carousel swipeable={false} draggable={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={5000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          // showDots={true}
        >
          {banners ? (
            banners.map((banner, i) =>
              banner.BannerId == id ? (
                <>
                  <img
                    src={
                      `http://shopadmin.vipswallet.com` + banner.BackgroundImage
                    }
                    width="100%"
                    className="img-fluid"
                  ></img>
                </>
              ) : null
            )
          ) : (
            // <LatestLoading />
            <Loading/>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default TopSlider;
