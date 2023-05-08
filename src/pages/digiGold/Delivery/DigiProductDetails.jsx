import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../../assets/styles/digigold/digigold-delivery-product-details.css";
import {
  addItem,
  getMetalProductDetails,
  removeItem,
} from "../../../redux/slices/digiGold/delivery/DeliverySlice";
import MyVault from "../MyVault";
import Carousel from "react-multi-carousel";
import { loginDigiGold } from "../../../redux/slices/digiGold/registerDigiSlice";
import { MuiSnackBar } from "../../../components/common";
export function calculateTotal(quantity, price) {
  return quantity * price;
}
const DigiProductDetails = ({ setTitle }) => {
  // const [goldQty, setGoldQty] = useState();
  // const [silverQty, setSilverQty] = useState();
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { items } = useSelector((state) => state.DeliverySlice);
  const { proDetails, qtyMessage } = useSelector(
    (state) => state.DeliverySlice.coinDetails
  );
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser, loading: logLoading } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const location = useLocation();
  const data = location.state;
  const { title } = useParams();
  useEffect(() => {
    setTitle(title);
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    dispatch(loginDigiGold({ username, password }));
  }, []);
  const handleClick = () => {
    const res = items.find((a) => a.sku === data.sku);
    if (!res) {
      const Product = proDetails.Data.result.data;
      dispatch(addItem(Product));
    }
    navigate("/vipsgold-cart");
  };
  useEffect(() => {
    const sku = data.sku;
    dispatch(getMetalProductDetails({ sku }));
  }, [data]);

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

  const addItemCart = () => {
    const Product = proDetails.Data.result.data;
    const GoldBalance = logData.Data.GoldGrams;
    const SilverBalance = logData.Data.SilverGrams;
    let goldQty = 0;
    let silverQty = 0;
    items.forEach((item) => {
      const productWeight = parseFloat(item.productWeight);
      const quantity = parseInt(item.quantity);
      if (item.metalType === "gold") {
        goldQty += quantity * productWeight;
      } else if (item.metalType === "silver") {
        silverQty += quantity * productWeight;
      }
    });
    if (Product.metalType === "silver") {
      console.log(silverQty, "silverQty");
      if (SilverBalance > silverQty) {
        dispatch(addItem(Product));
      } else {
        setIsSnackBar(true);
        setErrorMsg("You don't have a enough silver to add more qty");
      }
    } else if (Product.metalType === "gold") {
      if (GoldBalance > goldQty) {
        console.log(goldQty, "goldQty");

        dispatch(addItem(Product));
      } else {
        setIsSnackBar(true);
        setErrorMsg("You don't have a enough Gold to add more qty");
      }
    }
  };

  console.log(items, "items");

  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container">
          <MyVault />
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">Product Details</h1>
            <p class="col-lg-8 m-auto digigold-section-subtitle">
              The price mentioned here is a nominal fee for manufacturing and
              delivering the article at your doorstep. You need to have
              sufficient quantity of gold and silver to request delivery.
            </p>
          </div>

          <div class="digigold-product-details-wrapper">
            <div class="row digigold-product-details-outer">
              <div class="col-lg-5 col-sm-5">
                <div class="digigold-product-details-left">
                  <div class="digigold-product-details-img-outer">
                    <div class="digigold-product-details-img">
                      {/* <img
                        class="img-thumbnail"
                        src={data.productImages}
                        alt="VIPS Product"
                      /> */}
                      <Carousel
                        swipeable={false}
                        draggable={false}
                        responsive={responsive}
                        infinite={true}
                        className="quick-view-product-img-outer"
                      >
                        {data &&
                          data.productImages.map((image, i) => (
                            <div class="quick-view-product-img">
                              <img
                                // onError={(e) => {
                                //   productImages.splice(i, 1);
                                //   setProductImages([...productImages]);
                                // }}
                                class="img-thumbnail "
                                src={image.url}
                                alt="DigiGold Coin"
                              />
                            </div>
                          ))}
                      </Carousel>
                    </div>
                    {/* 
                        <!-- <div class="digigold-product-details-img">
                          <img class="img-thumbnail" src="digigold-images/digigold-coin-big.svg" alt="VIPS Product">
                        </div>

                        <div class="digigold-product-details-img">
                          <img class="img-thumbnail" src="digigold-images/digigold-coin-big.svg" alt="VIPS Product">
                        </div>

                        <div class="digigold-product-details-img">
                          <img class="img-thumbnail" src="digigold-images/digigold-coin-big.svg" alt="VIPS Product">
                        </div> --> */}
                  </div>
                </div>
              </div>

              <div class="col-lg-7  col-sm-7">
                <div class="digigold-product-details-info-outer">
                  <div class="digigold-product-details-info-box ">
                    <div class="digigold-product-title-info">
                      <div class="">
                        <h1 class="digigold-product-details-title">
                          {data?.name}
                        </h1>
                        <p class="digigold-product-number">SKU : {data?.sku}</p>

                        <span class="mr-2 digigold-product-details-price">
                          {" "}
                          &#x20B9; {data?.basePrice}
                        </span>
                        <span class="digigold-product-details-status">
                          {" "}
                          (Making & Delivery Charges){" "}
                        </span>
                      </div>

                      <div class="">
                        <div class="digigold-product-details-choose-quantity">
                          <div
                            // onClick={() => {
                            //   qty > 1 && setQty(qty - 1);
                            // }}
                            onClick={() => {
                              if (
                                items?.find((a) => a.Id === data.Id)?.quantity >
                                1
                              ) {
                                dispatch(removeItem(data));
                              }
                            }}
                            class="value-button decrease-sign"
                            id="decrease"
                          >
                            {" "}
                            <i class="fa-solid fa-minus"></i>{" "}
                          </div>
                          <h2
                            style={{
                              fontSize: 20,
                              alignSelf: "center",
                              paddingRight: 12,
                              paddingLeft: 12,
                              paddingTop: 5,
                            }}
                          >
                            {items &&
                              (items?.find((a) => a.sku === data.sku)
                                ?.quantity ??
                                0)}
                          </h2>
                          {/* <input
                            type="number"
                            class="quantity-number"
                            id="number"
                            value="0"
                          /> */}
                          <div
                            // onClick={() => {
                            //   setQty(qty + 1);
                            // }}
                            onClick={addItemCart}
                            class="value-button increase-sign"
                            id="increase"
                          >
                            <i class="fa-solid fa-plus"></i>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="digigold-product-details-info-box">
                    <div class="digigold-product-details-store-info">
                      <p class="mb-0">
                        <img
                          alt=""
                          src="digigold-images/delivery-black-icon.svg"
                          class="img-fluid"
                        />{" "}
                        Expected Delivery By <span> Oct, 15 2023 </span>{" "}
                      </p>
                    </div>
                  </div>

                  <div class="digigold-product-details-info-box">
                    <div class="col-lg-9 m-auto digigold-product-details-box">
                      <div class="digigold-product-details-inner ">
                        <div class="row">
                          <div class="col-7">
                            <span> SKU </span>
                          </div>
                          <div class="col-5 text-right">
                            <span class="digigold-product-details-right">
                              {" "}
                              {data?.sku}{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="digigold-product-details-inner ">
                        <div class="row">
                          <div class="col-7">
                            <span> Actual Weight (gms) </span>
                          </div>
                          <div class="col-5 text-right">
                            <span class="digigold-product-details-right">
                              {" "}
                              {data?.productWeight}{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="digigold-product-details-inner ">
                        <div class="row">
                          <div class="col-7 ">
                            <span> Redeem Weight (gms) </span>
                          </div>
                          <div class="col-5 text-right">
                            <span class="digigold-product-details-right">
                              {" "}
                              {data?.productWeight}{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="digigold-product-details-inner ">
                        <div class="row">
                          <div class="col-7">
                            <span> Purity </span>
                          </div>
                          <div class="col-5 text-right">
                            <span class="digigold-product-details-right">
                              {" "}
                              {data.purity}{" "}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="digigold-product-details-inner ">
                        <div class="row">
                          <div class="col-7">
                            <span> Metal Type </span>
                          </div>
                          <div class="col-5 text-right">
                            <span class="digigold-product-details-right">
                              {" "}
                              {data.metalType?.toUpperCase()}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="digigold-product-details-info-box">
                    <div class="digigold-product-details-btn">
                      <button
                        onClick={() => handleClick(data)}
                        class="btn btn-primery"
                        type="button"
                      >
                        {" "}
                        Request Delivery{" "}
                      </button>
                    </div>
                  </div>
                </div>
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
      </section>
    </>
  );
};

export default DigiProductDetails;
