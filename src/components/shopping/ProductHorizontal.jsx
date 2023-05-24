import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/styles/home/promotional.css";
import "../../assets/styles/styles.css";
import CarouselProductCard from "../Cards/CarouselProductCard";
import { Loading } from "../common";

const ProductHorizontal = ({
  products,
  title,
  description,
  subtitle,
  loading,
  subtitleDesc,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 992 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 991, min: 712 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 712, min: 464 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      {!loading && (
        <section class="section-align deals-of-day">
          <div class="container">
            <div class="container">
              <div class="section-head">
                <h2 class="section-head-title">
                  <span>{title}</span>
                  {subtitle}
                </h2>
                <p className="section-head-subtitle">{subtitleDesc}</p>
                <p className="section-head-subtitle">{`${
                  description.split(".")[0]
                }, ${description.split(".")[1]} `}</p>
                <p className="section-head-subtitle">
                  {description.split(".")[2]}
                </p>
              </div>
            </div>
            {!loading ? (
              <div className="deals-center productcard-arrow">
                <Carousel
                  draggable={false}
                  swipeable={false}
                  responsive={responsive}
                  infinite={true}
                >
                  {products && products?.length !== 0 ? (
                    products &&
                    products?.slice(0, 9)?.map((p, i) => (
                      <>
                        <div key={i} className="m-3">
                          <CarouselProductCard product={p} />
                        </div>
                      </>
                    ))
                  ) : (
                    <Loading />
                  )}
                </Carousel>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductHorizontal;
