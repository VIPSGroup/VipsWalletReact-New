import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PincodeCheck from "../../components/shopping/PincodeCheck";
import Carousel from "react-multi-carousel";
import { getSingleProductData } from "../../apiData/shopping/product";
import { shopadminUrl } from "../../constants";

import "../../assets/styles/shopping/productDetails.css";
import { googleAnalytics } from "../../constants";
import ReactGA from "react-ga";
import AddToCartButton from "../../components/buttons/AddToCartButton";
import AddWishListButton from "../../components/buttons/AddWishListButton";
import ProductHorizontal from "../../components/shopping/ProductHorizontal";
import { useDispatch } from "react-redux";
import {
  getAllCategories,
  getProductsByCategory,
} from "../../redux/slices/shopping/productSlice";
// import { getAllCategories } from "../../apiData/shopping/category";

ReactGA.initialize(googleAnalytics);

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productObj, setProductObj] = useState();
  const [productImages, setProductImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);

  const [existInCart, setExistInCart] = useState(false);
  const [existInWishlist, setExistInWishlist] = useState(false);
  const [wishlistChange, setWishlistChange] = useState(false);

  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [similar, setSimilar] = useState([]);

  let navigate = useNavigate();
  let { productId, productName } = useParams();
  var imgArray = [];

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

  const checkInWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    wishlist &&
      wishlist.map((w, i) => {
        if (w.Id.toString() === productId) {
          setExistInWishlist(true);
        }
      });
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

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const checkInRecent = (productParam) => {
    const recentProducts = JSON.parse(localStorage.getItem("recent"));
    recentProducts &&
      recentProducts.map((p, i) => {
        if (productParam.Id == p.Id) {
          return true;
        }
        return false;
      });
  };

  const manageRecentlyViewed = (productParam) => {
    const recentProducts = JSON.parse(localStorage.getItem("recent"));
    if (!checkInRecent(productParam)) {
      let recentToBe = [];
      if (recentProducts) {
        recentToBe = [...recentProducts];
      }
      recentToBe.push(productParam);
      localStorage.setItem("recent", JSON.stringify(recentToBe));
    }
  };

  const clearRecentlyViewed = () => {
    const recentProducts = JSON.parse(localStorage.getItem("recent"));
    const unique2 = recentProducts.filter((obj, index) => {
      return index === recentProducts.findIndex((o) => obj.Id === o.Id);
    });

    localStorage.setItem("recent", JSON.stringify(unique2));
  };
  const checkInCart = (pro) => {
    console.log("kkkkkkkkkkk");
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    const getCart = cartProducts.find(
      (a) => a.product.Id === pro.ProductDetails.Id
    );
    if (getCart) {
      setExistInCart(true);
    } else {
      setExistInCart(false);
    }
    // cartProducts &&
    //   cartProducts.map((c, i) => {
    //     if (c.product.Id === pro.ProductDetails.Id) {
    //       console.log(`${c.product.Id} +++ ${pro.ProductDetails.Id}`);
    //       setExistInCart(true);
    //     }
    //     // setExistInCart(false);
    //   });
  };

  const clickBuyNow = (e) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
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
      navigate("/login");
    }
  };

  const getSimilarProduct = async (catNam) => {
    let catId;
    const res = await dispatch(getAllCategories());
    const Allcategories =
      res.payload.Data.Categories && res.payload.Data.Categories;
    for (let index = 0; index < Allcategories.length; index++) {
      const element = Allcategories[index];
      if (catNam === element.Name) {
        catId = element.Id;
      }
    }
    const resSimilar = await dispatch(getProductsByCategory(catId));
    setSimilar(resSimilar.payload.Data && resSimilar.payload.Data);
  };

  useEffect(() => {
    console.log("KOKOKO");
    ReactGA.pageview(window.location.pathname);
    var p = {};
    getSingleProductData(productId).then((response) => {
      p = response.Data.ProductDetails;
      setProduct(response.Data.ProductDetails);
      manageRecentlyViewed(response.Data.ProductDetails);
      clearRecentlyViewed();
      setProductObj(response.Data);

      if (p.Size) {
        getSizes(response.Data.ProductDetails.Size);
      }
      if (p.Color) {
        getColors(response.Data.ProductDetails.Color);
      }
      getProductImages(response.Data.ProductDetails);
      checkInCart(response.Data);
      getSimilarProduct(response.Data.ProductDetails.Category);
    });

    checkInWishlist();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [productId]);

  useEffect(() => {
    checkInWishlist();
  }, [wishlistChange]);

  const onQtyIncrease = () => {
    if (qty < product.Quantity) {
      setQty(qty + 1);
    } else {
      setIsSnackBar(true);
      setErrorMsg("Sorry you can't add more item");
    }
  };

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

  const ProductDetailsSection = () => (
    <>
      <section class="section-align">
        <div class="container">
          <div class="row">
            {/* { <!-- product details start -->} */}
            <div class="col-lg-6">
              <div class="product-details-left">
                <div class="product-details-img-outer">
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
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="product-details-info-outer">
                <h1 class="product-details-title">{product.Name}</h1>
                <div class="product-details-info-box">
                  <div class="product-details-price">
                    <span class="mr-2">
                      {" "}
                      &#x20B9;{" "}
                      {product?.SalePrice &&
                        product?.SalePrice.toLocaleString()}
                    </span>
                    <span class="mr-2 cut">
                      {" "}
                      &#x20B9;{" "}
                      {product?.RetailPrice &&
                        product?.RetailPrice.toLocaleString()}
                    </span>
                    <span class="product-details-discount">
                      {" "}
                      ({product?.CostPrice}% Off){" "}
                    </span>
                    {product.ShoppingAmt > 0 && (
                      <span class="product-details-cb-badge">
                        {" "}
                        CB &#x20B9;{product?.ShoppingAmt}{" "}
                      </span>
                    )}
                  </div>
                  <div class="product-details-status">
                    <span> In stock </span>
                  </div>
                </div>

                {product && product.Color ? (
                  <div class="product-details-info-box">
                    <div class="product-details-choose-color">
                      <h3 class="product-details-box-title">Select Colour :</h3>
                      <div class="product-details-choose-color-allColors">
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
                  <div class="product-details-info-box">
                    <div class="product-details-choose-size">
                      <h3 class="product-details-box-title">Select Size :</h3>
                      <div class="d-flex align-items-center mt-2">
                        {sizes &&
                          sizes?.map((s, i) => (
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

                <div class="product-details-info-box">
                  <h3 class="product-details-box-title">Quantity :</h3>
                  <div class="d-flex">
                    <div class="product-details-choose-quantity">
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

                    <div class="d-flex ml-auto">
                      <div class="product-details-wishlist">
                        <AddWishListButton
                          product={product}
                          inWishlistStateChanger={setExistInWishlist}
                          inWishlist={existInWishlist}
                          stateChanger={setWishlistChange}
                          wishlistState={wishlistChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="product-details-info-box">
                  <div class="product-details-btn">
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
                  </div>
                </div>

                <div class="product-details-info-box">
                  <div class="product-details-store-info">
                    <p>
                      <img
                        src="/images/shopping/delivery-icon.svg"
                        class="img-fluid"
                      />{" "}
                      Delivery By <span> {product.DeliveryEnd} </span>{" "}
                    </p>
                    <p class="mb-0">
                      Sold By <span>{product.Soldby} </span>{" "}
                    </p>
                  </div>
                </div>

                <PincodeCheck
                  productId={product.Id}
                  setIsSnackBar={setIsSnackBar}
                  setErrorMsg={setErrorMsg}
                />

                <div class="product-details-info-box">
                  <h3 class="product-details-box-title">Description :</h3>
                  <div
                    class="product-details-description"
                    dangerouslySetInnerHTML={{ __html: product.Description }}
                  ></div>
                </div>

                <div class="product-details-info-box">
                  <h3 class="product-details-box-title">Specification :</h3>
                  <div
                    class="product-details-description"
                    dangerouslySetInnerHTML={{ __html: product.Specification }}
                  ></div>
                </div>
              </div>
            </div>
            {/* {  <!-- product details end -->} */}
            {/* <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            /> */}
          </div>
          <ProductHorizontal
            title="Similar Product"
            // subtitle="of the Day"
            products={similar}
            description="Exciting, fresh deals on a daily basis. Buy your wishlist products at low cost!"
          />
        </div>
      </section>
    </>
  );

  return (
    <>
      {/* <CommonTopNav /> */}

      <>{ProductDetailsSection()}</>
      {/* <Footer /> */}
    </>
  );
};

export default ProductDetails;
