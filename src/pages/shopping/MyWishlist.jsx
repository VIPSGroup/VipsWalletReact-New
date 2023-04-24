import React, { useState, useEffect } from "react";
import QuickViewModal from "../../components/shopping/QuickViewModal";

import "../../assets/styles/shopping/quickViewModal.css";
import { getReplaceSpace, googleAnalytics } from "../../constants";
import ReactGA from "react-ga";
import { Link } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { removeWish } from "../../redux/slices/shopping/wishlistSlice";
ReactGA.initialize(googleAnalytics);

const MyWishlist = () => {
  const dispatch = useDispatch();
  const [productsList, setProductsList] = useState([]);

  const { wishCount } = useSelector((state) => state.wishlistSlice);

  const clickRemove = (id) => {
    dispatch(removeWish(id));
    setProductsList(wishCount);
    const allWish = JSON.parse(localStorage.getItem("wishlist"));
    const filteredWish = allWish.filter((a) => a.Id !== id);
    localStorage.setItem("wishlist", JSON.stringify(filteredWish));

    setProductsList([...filteredWish]);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const data = JSON.parse(localStorage.getItem("wishlist"));
    if (data) {
      setProductsList(data);
    }
  }, []);

  const wishlistSection = () => (
    <>
      <section class="shopping-catagory-outer Promotional">
        <div class="container">
          <div class="section-head py-4">
            <h1 class="section-head-title mb-3">My Wishlist</h1>
          </div>
        </div>

        <div class="container">
          <div class="row">
            {productsList && productsList.length < 1 ? (
              <div class="text-center m-auto cart-no-data">
                <h3 class="nodata-title py-4">Your Wishlist is Empty</h3>
                <img src="/images/empty_cart.svg" />
              </div>
            ) : null}

            {productsList &&
              productsList.map((product, i) => (
                <div className="col-sm-6 col-md-6 col-lg-3 mb-4">
                  <div class="promo-product-card">
                    <Link
                      to={
                        product.Quantity !== 0 &&
                        `/shopping/product/${product.Id}/${getReplaceSpace(
                          product.Name
                        )}`
                      }
                      class="promo-product"
                    >
                      <div class="promo-product-image">
                        <img
                          src={`http://shopadmin.vipswallet.com/${product.ImageThumbURL1}`}
                          class="img-fluid shopping-catagory-img"
                          alt="..."
                        />
                      </div>
                      {product.SalePrice >= 500 ? (
                        <div class="product-badge-outer">
                          <span class="promo-offer"> Free Delivery </span>
                        </div>
                      ) : null}
                      <div class="promo-product-details">
                        <h3>{product.Name}</h3>
                        <div class="promo-product-price-detail">
                          <div class="promo-product-price">
                            <span class="promo-product-mrp">
                              {" "}
                              &#x20B9;{" "}
                              {product.SalePrice &&
                                product.SalePrice.toLocaleString()}
                            </span>
                            {product.CostPrice!==0 && <> <span class="promo-product-list-price">
                              <s>
                                {" "}
                                &#x20B9;{" "}
                                {product.RetailPrice &&
                                  product.RetailPrice.toLocaleString()}
                              </s>
                              ({product.CostPrice}% Off)
                            </span></>}
                           
                          </div>
                          <div class="promo-product-delivery">
                            <p>Delivery by {product.DeliveryEnd}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div class="promo-product-action">
                      <div class="promo-quick-view">
                        <QuickViewModal productId={product.Id} />
                      </div>

                      <div class="promo-wishlist ml-auto">
                        <button
                          onClick={() => clickRemove(product.Id)}
                          value={i}
                          type="button"
                          class="btn-cta"
                        >
                          <i class="fa fa-trash fa-danger"></i>
                        </button>
                      </div>
                    </div>
                    {product.Quantity === 0 && (
                      <div class="sold-badge-overlay-lft">
                        <span class="sold-badge-top-left sold-badge-lft sold-badge-bg-lft">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <>
      {/* <CommonTopNav /> */}
      {wishlistSection()}
      {/* <Footer /> */}
    </>
  );
};

export default MyWishlist;
