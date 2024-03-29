import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useNavigate, useResolvedPath } from "react-router-dom";

import "../../assets/styles/shopping/quickViewModal.css";
import { useDispatch, useSelector } from "react-redux";
import PincodeCheck from "./PincodeCheck";
import AddToCartButton from "../buttons/AddToCartButton";
import { shopadminUrl } from "../../constant/Baseurls";
import { getReplaceSpace } from "../../constant/Constants";
import { getSingleProductData } from "../../redux/slices/shopping/productSlice";
import { MuiSnackBar, ThemeButton } from "../common";
import { Spin } from "antd";
import { getProductImages } from "../../utils/CommonFunctions";

const QuickViewModal = ({ productId, recomType }) => {
  const { pathname } = useResolvedPath();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [product, setProduct] = useState([]);

  const [productObj, setProductObj] = useState();
  const [productImages, setProductImages] = useState([]);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [existInCart, setExistInCart] = useState(false);
  const [wishlistChange, setWishlistChange] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { data, loading } = useSelector(
    (state) => state.productSlice.singleProduct
  );

  const imgArray = [];
  let navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };

  const getSizes = (sizeString) => {
    const sizeSplit = sizeString?.split(",").filter(function (str) {
      return /\S/.test(str);
    });

    setSizes(sizeSplit);
    setSelectedSize(sizeSplit[0]);
  };
  const getColors = (colorString) => {
    const colorSplit = colorString?.split(",");

    setColors(colorSplit);
    setSelectedColor(colorSplit[0]);
  };
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleWishList = (e) => {
    const d = localStorage.getItem("test");

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    localStorage.setItem("test", arr);
  };

  const checkInCart = (pro) => {
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    cartProducts &&
      cartProducts.map((c, i) => {
        if (c?.product?.Id == pro?.ProductDetails?.Id) {
          setExistInCart(true);
        }
      });
  };

  const clickBuyNow = (e) => {
    e.preventDefault();
    const buyNowProductDeatils = {
      product: product,
      charges: productObj.ProductTax,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      qty: qty,
    };
    let buyNowProductsArray = [];
    buyNowProductsArray.push(buyNowProductDeatils);

    setProducts(buyNowProductsArray);
    if (loggedInUser) {
      navigate("/shopping/address", {
        state: {
          products: buyNowProductsArray,
          totalAmount: product.SalePrice * qty,
        },
      });
    } else {
      navigateToLogin();
    }
  };

  const navigateToLogin = () => {
    handleClose();
    navigate("/login");
  };

  useEffect(() => {
    var p = {};
    p = data?.response?.Data?.ProductDetails;
    setProduct(data?.response?.Data?.ProductDetails);
    setProductObj(data?.response?.Data);
    setQty(data?.response?.Data?.ProductDetails?.Quantity>=0 ?1 :0)
    checkInCart(data?.response?.Data);
    if (p?.Size) {
      getSizes(data?.response?.Data?.ProductDetails?.Size);
    }
    if (p?.Color) {
      getColors(data.response?.Data.ProductDetails.Color);
    }
    getProductImages(data?.response?.Data?.ProductDetails,setProductImages);
    const buyNowProductDeatils = {
      product: data.response?.Data?.ProductDetails,
      charges: data.response?.Data?.ProductTax,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      qty: qty,
    };
    let buyNowProductsArray = [];
    buyNowProductsArray.push(buyNowProductDeatils);

    setProducts(buyNowProductsArray);

    return () => {
      setExistInCart(false);
    };
  }, [data]);
  useEffect(() => {
  }, [wishlistChange]);

  let wish = "wishlist";

  const quickModal = () => (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        keyboard={false}
        className="modal fade quick-view-modal"
        id="exampleModal"
        data-backdrop="false"
      >
        {modalContentSection()}
      </Modal>
    </>
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 993 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 992, min: 414 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 414, min: 0 },
      items: 1,
    },
  };

  const onQtyIncrease = () => {
    if (qty < product.Quantity) {
      setQty(qty + 1);
    } else {
      setIsSnackBar(true);
      setErrorMsg("Sorry you can't add more item");
    }
  };

  const modalContentSection = () => (
    <Spin spinning={loading}>
      <button
        onClick={() => handleClose()}
        type="button"
        class="close quick-view-close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="true">
          {" "}
          <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
        </span>
      </button>

      {/* {<!-- quick view content start -->} */}
      <div class="row">
        <div class="col-lg-6">
          <div class="quick-view-product">
            <>
              <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                className="quick-view-product-img-outer"
              >
                {productImages &&
                  productImages.map((image, i) => (
                    <div class="quick-view-product-img">
                      <img
                        onError={(e) => {
                          productImages.splice(i, 1);
                          setProductImages([...productImages]);
                        }}
                        class="img-thumbnail "
                        src={shopadminUrl + image.original}
                        alt="Slide Image"
                      />
                    </div>
                  ))}
              </Carousel>
            </>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="quick-view-product-info-outer">
            <h1 class="quick-view-title">{product?.Name}</h1>
            <div class="quick-view-info-box">
              <div class="price">
                <span class="mr-2">
                  {" "}
                  &#x20B9;{" "}
                  {product?.SalePrice && product?.SalePrice?.toLocaleString()}
                </span>
                <span class="mr-2 cut">
                  {" "}
                  &#x20B9;{" "}
                  {product?.RetailPrice &&
                    product?.RetailPrice?.toLocaleString()}
                </span>
                <span class="quick-view-discount">
                  {" "}
                  ({product?.CostPrice}% off){" "}
                </span>
              </div>
              <div class="product-status">
                <span> In stock </span>
              </div>
            </div>

            {product && product?.Color ? (
              <div class="quick-view-info-box">
                <div class="block-choose-color">
                  <h3 class="quick-view-box-title">Select Colour :</h3>
                  <div class="block-choose-color-allColors">
                    {colors &&
                      colors?.map((s, i) => (
                        <label class="radio">
                          {" "}
                          <input
                            onChange={handleColorChange}
                            type="radio"
                            name="color"
                            value={s}
                            checked={selectedColor == s ? true : false}
                          />{" "}
                          <span>{s}</span>{" "}
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            ) : null}

            {product && product?.Size ? (
              <div class="quick-view-info-box">
                <div class="block-choose-size">
                  <h3 class="quick-view-box-title">Select Size :</h3>
                  <div class="d-flex align-items-center mt-2">
                    {sizes &&
                      sizes.map((s, i) => (
                        <label class="radio">
                          {" "}
                          <input
                            onChange={handleSizeChange}
                            type="radio"
                            name="size"
                            value={s}
                            checked={selectedSize == s ? true : false}
                          />{" "}
                          <span>{s}</span>{" "}
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            ) : null}

            <div class="quick-view-info-box">
              <div>
                <h3 class="quick-view-box-title">Quantity :</h3>
                <div class="block-choose-quantity">
                  <div
                    onClick={() => (qty > 1 ? setQty(qty - 1) : null)}
                    class="value-button decrease-sign"
                    id="decrease"
                  >
                    {" "}
                    <i class="fa-solid fa-minus"></i>{" "}
                  </div>
                  <input
                    type="number"
                    class="quantity-number"
                    id="number"
                    value={qty}
                  />
                  <div
                    onClick={onQtyIncrease}
                    class="value-button increase-sign"
                    id="increase"
                  >
                    {" "}
                    <i class="fa-solid fa-plus"></i>{" "}
                  </div>
                </div>

                <div class="quick-view-wishlist">
                  {/* <AddWishListButton
                    product={product}
                    inWishlist={existInWishlist}
                    inWishlistStateChanger={setExistInWishlist}
                    stateChanger={setWishlistChange}
                    wishlistState={wishlistChange}
                  /> */}
                </div>
              </div>
            </div>

            <div class="quick-view-info-box">
              <div class="quick-view-btn">
                <AddToCartButton
                  product={productObj}
                  selectedColor={selectedColor}
                  selectedSize={selectedSize}
                  quantity={qty}
                  alreadyInCart={existInCart}
                />

                {/* <button
                  onClick={clickBuyNow}
                  class="btn btn-primery"
                  type="button"
                >
                  {" "}
                  Buy Now{" "}
                </button> */}
                <ThemeButton onClick={clickBuyNow} value={"Buy Now"} />

                {/* {<button onClick={(e)=>{e.preventDefault();navigate('/shopping/address',{state:{products:products,totalAmount:product.SalePrice*qty}});}} class="btn btn-primery" type="button"> Buy Now </button>} */}
              </div>
            </div>

            <div class="quick-view-info-box">
              <div class="quick-view-store-info">
                <p>
                  Delivery By <span> {product?.DeliveryEnd} </span>{" "}
                </p>
                <p class="mb-0">
                  Sold By <span>{product?.Soldby} </span>{" "}
                </p>
              </div>
            </div>

            <PincodeCheck
              productId={product?.Id}
              setIsSnackBar={setIsSnackBar}
              setErrorMsg={setErrorMsg}
            />
            <div class="quick-view-all-details mb-4">
              <a
                onClick={() => {
                  if (loggedInUser) {
                    product?.Quantity !== 0 &&
                      navigate(
                        `/shopping/product/${product?.Id}/${getReplaceSpace(
                          product?.Name
                        )}`,
                        {
                          state:
                            pathname === "/shopping/wishlist"
                              ? wish
                              : recomType,
                        }
                      );
                  } else {
                    navigateToLogin();
                  }
                }}
              >
                See Complete Details
              </a>
            </div>
          </div>
        </div>
      </div>

      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      />
    </Spin>
  );

  return (
    <div>
      <button
        onClick={() => {
          product?.Quantity !== 0 && setShowModal(true);
          dispatch(getSingleProductData({ productId }));
        }}
        type="button"
        class="btn-cta"
      >
        Quick View
      </button>
      {quickModal()}
    </div>
  );
};
export default QuickViewModal;
