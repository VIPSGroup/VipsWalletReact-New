import React, { useState, useEffect } from "react";
import QuickViewModal from "../../components/shopping/QuickViewModal";
import "../../assets/styles/shopping/quickViewModal.css";
import { Link } from "react-router-dom";
import AddWishListButton from "../buttons/AddWishListButton";
import { getReplaceSpace } from "../../constant/Constants";
import { MuiSnackBar } from "../common";
import { checkInWishlist } from "../../utils/CommonFunctions";

const CarouselProductCard = ({ product, wishlistCard, recomType }) => {
  const [existInWishlist, setExistInWishlist] = useState(false);
  const [wishlistChange, setWishlistChange] = useState(false);

  useEffect(() => {
    checkInWishlist(product.Id,setExistInWishlist);
  }, [wishlistChange]);

  const quickViewModal = () => (
    <div
      class="modal fade quick-view-modal"
      id="promotionalquickview"
      role="dialog"
      aria-labelledby="promotionalquickview"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document"></div>
    </div>
  );
  const productCardSection = () => (
    <div class="promo-product-card">
      <Link
        state={recomType}
        to={
          product.Quantity !== 0 &&
          `/shopping/product/${product.Id}/${getReplaceSpace(product.Name)}`
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
            {/* <span class="cb-badge"> CB &#x20B9;99.99 </span> */}
          </div>
        ) : null}
        <div class="promo-product-details">
          <h3>{product.Name}</h3>
          <div class="promo-product-price-detail">
            <div class="promo-product-price">
              <span class="promo-product-mrp">
                {" "}
                &#x20B9;{" "}
                {product?.SalePrice.toLocaleString().split(".").length !== 2
                  ? product?.SalePrice && product?.SalePrice.toLocaleString()
                  : product?.SalePrice.toLocaleString().split(".")[0]}
              </span>
              {product.CostPrice !== 0 && (
                <>
                  <span class="promo-product-list-price">
                    <s>
                      {" "}
                      &#x20B9;{" "}
                      {product?.RetailPrice &&
                        product?.RetailPrice.toLocaleString()}
                    </s>
                    ({product.CostPrice}% Off)
                  </span>
                </>
              )}
            </div>
            <div class="promo-product-delivery">
              <p>Delivery by {product.DeliveryEnd}</p>
            </div>
          </div>
        </div>
      </Link>
      <div class="promo-product-action">
        <div class="promo-quick-view">
          <QuickViewModal recomType={recomType} productId={product.Id} />
        </div>
        {wishlistCard ? (
          <div class="promo-wishlist ml-auto">
            <button type="button" class="btn-cta">
              <i class="fa fa-trash fa-danger"></i>
            </button>
          </div>
        ) : (
          <div class="promo-wishlist ml-auto">
            <AddWishListButton
              product={product}
              inWishlist={existInWishlist}
              inWishlistStateChanger={setExistInWishlist}
              stateChanger={setWishlistChange}
              wishlistState={wishlistChange}
            />
          </div>
        )}
      </div>

      {product.Quantity === 0 && (
        <div class="sold-badge-overlay-lft">
          <span class="sold-badge-top-left sold-badge-lft sold-badge-bg-lft">
            SOLD OUT
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div class="">
      {productCardSection()}
      {quickViewModal()}
    </div>
  );
};

export default CarouselProductCard;
