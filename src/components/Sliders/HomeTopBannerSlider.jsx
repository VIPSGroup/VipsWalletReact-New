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
import { useNavigate } from "react-router-dom";
const HomeTopBannerSlider = () => {
  const dispatch = useDispatch();
  const { SliderBanners ,loading} = useSelector((state) => state.bannerSlice);
 const navigate= useNavigate()
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

  const getServiceId=id=>{
switch (id) {
  case 1 || 4:navigate("/services/mobileRecharge")
    break;
  case 2:navigate("/services/dth")
    break;
  case 5:navigate("/services/insurancepremium")
  break;
  case 6:navigate("/services/electricity")
    break;
  case 7:navigate("/services/gas")
    break;
  case 8:navigate("/services/water")
    break;
  case 10:navigate("/services/BroadBand")
    break;
  case 11:navigate("/services/landline")
    break;
  case 33:navigate("/services/lpggas")
    break;
  case 36:navigate("/services/fastag")
    break;
  case 39:navigate("/services/loanrepayment")
    break;
  case 43:navigate("/services/digitalCable")
    break;
  case 44:navigate("/services/municipaltax")
    break;
  case 45:navigate("/services/municipalservices")
    break;
  case 46:navigate("/services/housingsociety")
    break;
  case 47:navigate("/services/hospitalbills")
    break;
  case 48:navigate("/services/subscriptionfees")
    break;
  case 49:navigate("/services/creditcard")
    break;
  case 50:navigate("/services/clubassociation")
    break;

  default:navigate("/")
    break;
}
  }

  useEffect(() => {
    dispatch(getSliderBannerImage());
  }, []);
  return (
    <>
      <div className="top-banner-outer">
        <Spin spinning={loading}>
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
                  <div key={i} onClick={()=>{
                    getServiceId(banner.ServiceId)
                    }}>
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
        </Spin>
      </div>
    </>
  );
};

export default HomeTopBannerSlider;
