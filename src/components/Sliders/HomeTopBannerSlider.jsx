import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { getSliderBannerImage } from "../../redux/slices/bannerSlice";
import { Loading } from "../common";
import { LatestLoading } from "../common/Loading";
import { Spin } from "antd";
const HomeTopBannerSlider = () => {
  const dispatch = useDispatch();
  const { SliderBanners } = useSelector((state) => state.bannerSlice);
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
  useEffect(() => {
    dispatch(getSliderBannerImage());
  }, []);
  return (
    <>
      <div className="top-banner-outer">
        {SliderBanners && (
          <Carousel
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
            {SliderBanners ? (
              SliderBanners?.Data?.map((banner, i) =>
                banner?.BannerId == 1 ? (
                  <div key={i}>
                    <img
                      src={
                        `http://shopadmin.vipswallet.com` +
                        banner.BackgroundImage
                      }
                      width="100%"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                ) : null
              )
            ) : (
              <LatestLoading />
            )}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default HomeTopBannerSlider;
