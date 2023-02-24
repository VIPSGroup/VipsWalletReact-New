import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
//import AddWishlistButton from "./AddWishlistButton";

import { useNavigate } from "react-router-dom";

// import { MuiSnackBar } from "../common/snackbars";

import { getSingleProductData } from "../../apiData/shopping/product";

import "../../assets/styles/shopping/quickViewModal.css";
import { useSelector } from "react-redux";
import PincodeCheck from "./PincodeCheck";
import AddWishListButton from "../buttons/AddWishListButton";
import AddToCartButton from "../buttons/AddToCartButton";
import { shopadminUrl } from "../../constant/Baseurls";
import { getReplaceSpace } from "../../constant/Constants";
// import "../../assets/styles/styles.css"

const QuickViewModal = ({ productId }) => {
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
  const [existInWishlist, setExistInWishlist] = useState(false);
  const [wishlistChange, setWishlistChange] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loggedInUser, setLoggedInUser] = useState();

  const imgArray = [];
  let navigate = useNavigate();
  // const { loggedInUser } = useSelector(
  //   (state) => state.loginSlice.loggetInWithOTP
  // );

  console.log(loggedInUser, "llll");
  const checkInWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    wishlist &&
      wishlist.map((w, i) => {
        if (w?.Id.toString() === productId) {
          setExistInWishlist(true);
        }
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const getSizes = (sizeString) => {
    const sizeSplit = sizeString.split(",").filter(function (str) {
      return /\S/.test(str);
    });

    setSizes(sizeSplit);
    setSelectedSize(sizeSplit[0]);
  };
  const getColors = (colorString) => {
    const colorSplit = colorString.split(",");

    setColors(colorSplit);
    setSelectedColor(colorSplit[0]);
  };

  const getProductImages = (productData) => {
    if (productData.ImageThumbURL1 != null && productData.ImageURL1 != null) {
      const obj = {
        original: productData.ImageURL1,
        thumbnail: productData.ImageThumbURL1,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL2 != null && productData.ImageURL2 != null) {
      const obj = {
        original: productData.ImageURL2,
        thumbnail: productData.ImageThumbURL2,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL3 != null && productData.ImageURL3 != null) {
      const obj = {
        original: productData.ImageURL3,
        thumbnail: productData.ImageThumbURL3,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL4 != null && productData.ImageURL4 != null) {
      const obj = {
        original: productData.ImageURL4,
        thumbnail: productData.ImageThumbURL4,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL5 != null && productData.ImageURL5 != null) {
      const obj = {
        original: productData.ImageURL5,
        thumbnail: productData.ImageThumbURL5,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL6 != null && productData.ImageURL6 != null) {
      const obj = {
        original: productData.ImageURL6,
        thumbnail: productData.ImageThumbURL6,
      };
      imgArray.push(obj);
    }
    if (productData.ImageThumbURL7 != null && productData.ImageURL7 != null) {
      const obj = {
        original: productData.ImageURL7,
        thumbnail: productData.ImageThumbURL7,
      };
      imgArray.push(obj);
    }

    setProductImages(imgArray);
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
        if (c.product.Id == pro.ProductDetails.Id) {
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
    setLoggedInUser(localStorage.getItem("user"));
    var p = {};
    getSingleProductData(productId).then((response) => {
      p = response.Data.ProductDetails;
      setProduct(response.Data.ProductDetails);
      setProductObj(response.Data);
      checkInCart(response.Data);

      if (p?.Size) {
        getSizes(response?.Data?.ProductDetails?.Size);
      }
      if (p?.Color) {
        getColors(response.Data.ProductDetails.Color);
      }
      getProductImages(response?.Data?.ProductDetails);

      const buyNowProductDeatils = {
        product: response.Data?.ProductDetails,
        charges: response.Data?.ProductTax,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        qty: qty,
      };
      let buyNowProductsArray = [];
      buyNowProductsArray.push(buyNowProductDeatils);

      setProducts(buyNowProductsArray);
      checkInWishlist();
    });
  }, []);

  useEffect(() => {
    checkInWishlist();
  }, [wishlistChange]);

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
        {/* <button
          onClick={handleClose}
          type="button"
          class="close quick-view-close"
          data-dismiss="modal"
          aria-label="Close"
        >

          <span aria-hidden="true"><i class="fa-sharp fa-solid fa-xmark"></i></span>
        </button> */}

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
    <>
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
              {/* {  <div class="quick-view-product-img">
                   
                    <img
                      class="img-thumbnail"
                      src={`http://shopadmin.vipswallet.com`+productImages[0].original}
                      alt="Slide Image"
                    />
                  </div>} */}

              <Carousel
                responsive={responsive}
                infinite={true}
                className="quick-view-product-img-outer"
              >
                {productImages &&
                  productImages.map((image, i) => (
                    <div class="quick-view-product-img">
                      <img
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
            <h1 class="quick-view-title">{product.Name}</h1>
            <div class="quick-view-info-box">
              <div class="price">
                <span class="mr-2">
                  {" "}
                  &#x20B9;{" "}
                  {product.SalePrice && product.SalePrice.toLocaleString()}
                </span>
                <span class="mr-2 cut">
                  {" "}
                  &#x20B9;{" "}
                  {product.RetailPrice && product.RetailPrice.toLocaleString()}
                </span>
                <span class="quick-view-discount">
                  {" "}
                  ({product.CostPrice}% off){" "}
                </span>
              </div>
              <div class="product-status">
                <span> In stock </span>
              </div>
            </div>

            {product && product.Color ? (
              <div class="quick-view-info-box">
                <div class="block-choose-color">
                  <h3 class="quick-view-box-title">Select Colour :</h3>
                  <div class="block-choose-color-allColors">
                    {colors &&
                      colors.map((s, i) => (
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

            {product && product.Size ? (
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
                  <AddWishListButton
                    product={product}
                    inWishlist={existInWishlist}
                    inWishlistStateChanger={setExistInWishlist}
                    stateChanger={setWishlistChange}
                    wishlistState={wishlistChange}
                  />
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

                <button
                  onClick={clickBuyNow}
                  class="btn btn-primery"
                  type="button"
                >
                  {" "}
                  Buy Now{" "}
                </button>

                {/* {<button onClick={(e)=>{e.preventDefault();navigate('/shopping/address',{state:{products:products,totalAmount:product.SalePrice*qty}});}} class="btn btn-primery" type="button"> Buy Now </button>} */}
              </div>
            </div>

            <div class="quick-view-info-box">
              <div class="quick-view-store-info">
                <p>
                  Delivery By <span> {product.DeliveryEnd} </span>{" "}
                </p>
                <p class="mb-0">
                  Sold By <span> Soumik Variety Store </span>{" "}
                </p>
              </div>
            </div>

            <PincodeCheck
              productId={product.Id}
              setIsSnackBar={setIsSnackBar}
              setErrorMsg={setErrorMsg}
            />
            <div class="quick-view-all-details mb-4">
              <a
                onClick={() => {
                  if (loggedInUser) {
                    product.Quantity !== 0 &&
                      navigate(
                        `/shopping/product/${product.Id}/${getReplaceSpace(
                          product.Name
                        )}`
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

      {/* <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      /> */}
    </>
  );

  return (
    <div>
      <button
        onClick={() => {
          product.Quantity !== 0 && setShowModal(true);
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
