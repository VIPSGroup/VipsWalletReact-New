import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";

import "../../assets/styles/home/onlineStore.css";
import { LatestLoading } from "../../components/common/Loading";
import { getAffiliate } from "../../redux/slices/onlineStoreSlice";

const OnlineStore = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.onlineStoreSlice);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1023, min: 540 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 539, min: 0 },
      items: 3,
    },
  };

  useEffect(() => {
    dispatch(getAffiliate());
  }, []);

  return (
    <>
      <section class="section-align online-stores">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">
                <span>Online</span> Stores
              </h1>
              <p className="section-head-subtitle">
                Shop your favourite products from our connected online stores.
              </p>
            </div>
          </div>
          {data.Data && !loading ? (
            <Carousel
              responsive={responsive}
              infinite={true}
              className="online-store-row"
            >
              {/* 
                    <a href="#" class="online-stores-div">
                    <div class="online-stores-box">
                      <div class="online-stores-box-icon"> 
                        <img src={`http://shopadmin.vipswallet.com` + a.Logo} alt="VIPS Services" class="img-fluid online-stores-icon" />
                      </div> 
                    </div>  
                  </a>
                  <div class="online-stores-title">
                    <h3 class="d-none">Get upto <span>{a.Description.substring(9,12)}</span> Cashback!</h3>
                    <h3 class="">{a.Description}</h3>
                  </div>
                    */}

              {data.Data &&
                data.Data?.map((a, i) => (
                  <div key={i} class="online-stores-div">
                    <button
                      class="online-stores-box-button"
                      id="onlinestoretermsmodal"
                      data-toggle="modal"
                      data-target="#onlinestoreterms"
                    >
                      <div class="online-stores-box-icon">
                        <img
                          src={`http://shopadmin.vipswallet.com` + a.Logo}
                          alt="VIPS Services"
                          class="img-fluid online-stores-icon"
                          onClick={(e) => window?.open(a.Url, "_blank")}
                        />
                      </div>

                      <div class="online-stores-title">
                        <h3>{a.Name}</h3>
                      </div>
                    </button>
                  </div>
                ))}
            </Carousel>
          ) : (
            <LatestLoading />
          )}
        </div>
      </section>
    </>
  );
};

export default OnlineStore;
