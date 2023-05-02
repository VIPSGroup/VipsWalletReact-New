import React, { useEffect, useState } from "react";
// import { deleteAddress } from "../../apiData/shopping/address";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import UpdateShippingAddressModal from "../../components/Modals/shopping/UpdateShippingAddressModal";
import AddShippingAddressModal from "../../components/Modals/shopping/AddShippingAddressModal";
import { deleteAddress, getAddress } from "../../redux/slices/pincodeSlice";
import { MuiSnackBar, ThemeButton } from "../../components/common";

ReactGA.initialize(googleAnalytics);

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const [addressList, setAddressList] = useState([]);
  const [lastShippingAddress, setLastShippingAddress] = useState({});
  const [del, setDel] = useState();

  const [selectedAddress, setSelectedAddress] = useState({});

  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { Mobile, TRXNPassword } = loggedInUser;
  const { data: addressGetData } = useSelector(
    (state) => state.pincodeSlice.AddressGet
  );
  const { data: deleteAddressData } = useSelector(
    (state) => state.pincodeSlice.addressDelete
  );
  let navigate = useNavigate();

  const location = useLocation();
  const propsProductsData = location.state;
  const clickDeleteAddress = async (e) => {
    e.preventDefault();
    const addressId = e.currentTarget.value;
    dispatch(deleteAddress({ addressId, Mobile, TRXNPassword }));
  };
  const handleSelectAddress = (e) => {
    const clickedAddress = addressList.find(
      (item) => item.Id == e.target.value
    );
    setSelectedAddress(clickedAddress);
  };
  useEffect(() => {
    ReactGA.pageview(window?.location?.pathname);
    dispatch(getAddress({ Mobile, TRXNPassword }));
  }, [dispatch]);
  useEffect(() => {
    if (addressGetData.ResponseStatus === 1) {
      setAddressList(addressGetData.Data);
      setLastShippingAddress(addressGetData.LastShippingAddress[0]);
      if (addressGetData.Data && addressGetData.LastShippingAddress[0]) {
        setSelectedAddress(addressGetData.LastShippingAddress[0]);
      } else if (
        addressGetData.Data &&
        !addressGetData.LastShippingAddress[0]
      ) {
        setSelectedAddress(addressGetData.Data[0]);
      }
    } else if (addressGetData.ResponseStatus === 0) {
      setSelectedAddress({});
      setAddressList("");
      setLastShippingAddress("");
    }
  }, [addressGetData]);

  const onPlaceOrder = (e) => {
    if (JSON.stringify(selectedAddress) !== "{}") {
      navigate("/shopping/checkout", {
        state: {
          products: propsProductsData.products,
          address: selectedAddress,
        },
      });
    } else {
      setIsSnackBar(true);
      setErrorMsg("Please select address");
    }
  };

  const selectAddressSection = () => (
    <>
      <section class="inpage-section-align">
        <div class="container">
          <div class="cart-top-nav">
            <div class="">
              <div class="payment-head">
                <Link class="" to="/">
                  <img
                    src="/images/VipsLogoMain.png"
                    alt="VIPS Logo"
                    class="img-fluid payment-head-logo"
                  />
                </Link>
              </div>

              <div class="col-md-12 go-back">
                <Link
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i class="fa-solid fa-arrow-left"> </i>Go back{" "}
                </Link>
              </div>
            </div>

            <div class="order-tracking-wrapper">
              <div class="order-tracking-outer">
                <div class="order-tracking order-tracking-cart">
                  <span class=""> Cart </span>
                </div>
                <div class="order-tracking order-tracking-address completed">
                  <span class=""> Address </span>
                </div>
                <div class="order-tracking order-tracking-payment">
                  <span class=""> Payment </span>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            {/* {<!-- shopping-cart start --> } */}

            <div class="col-sm-12 col-md-12 col-lg-8">
              <div class="shopping-cart-left">
                <div class="shopping-cart-box-outer shopping-cart-address-bg box-shadow-1">
                  <div class="">
                    <p class="shopping-cart-address-title">
                      {" "}
                      Select Delivery Address{" "}
                    </p>
                  </div>

                  {JSON.stringify(lastShippingAddress) !== "{}" &&
                  lastShippingAddress ? (
                    <div class="shopping-cart-address-card">
                      <p class="shopping-cart-address-card-title">
                        {" "}
                        Default Address{" "}
                      </p>
                      <div class="shopping-cart-address-outer shopping-default-address">
                        <div class="col-sm-10 col-md-10 col-lg-10 shopping-cart-address-info p-0">
                          <div>
                            <label>
                              <input
                                onChange={handleSelectAddress}
                                type="radio"
                                name="radio-button"
                                value={lastShippingAddress.Id}
                                checked={
                                  selectedAddress.Id === lastShippingAddress.Id
                                }
                              />
                              <span></span>
                            </label>
                          </div>
                          <div class="address-info-inner">
                            <p class="shopping-cart-user-name">
                              {" "}
                              {lastShippingAddress.FirstName +
                                " " +
                                lastShippingAddress.LastName}{" "}
                              <span class="location-badge">
                                {" "}
                                {lastShippingAddress.AddressType}{" "}
                              </span>{" "}
                            </p>
                            <p class="shopping-cart-user-address">
                              {lastShippingAddress.Address1 +
                                ", " +
                                lastShippingAddress.Landmark +
                                ", " +
                                lastShippingAddress.City +
                                ", " +
                                lastShippingAddress.State +
                                ", " +
                                lastShippingAddress.ZipPostal}
                            </p>
                            <p class="shopping-cart-user-mobno">
                              {" "}
                              Mobile :{" "}
                              <span> {lastShippingAddress.Phone} </span>{" "}
                            </p>
                          </div>
                        </div>

                        <div class="shopping-cart-address-btns">
                          <div class="shopping-cart-edit-product-btn p-0">
                            <UpdateShippingAddressModal
                              addressProp={lastShippingAddress}
                            />
                          </div>

                          <div class="shopping-cart-remove-address p-0">
                            <button
                              onClick={clickDeleteAddress}
                              value={lastShippingAddress.Id}
                              class=" remove-address-btn"
                            >
                              {" "}
                              <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {/* { <!-- product card 1 end -->} */}

                  {/* {<!-- product card 2 start -->} */}
                  <div class="shopping-cart-address-card">
                    <p class="shopping-cart-address-card-title">
                      {" "}
                      Other Address{" "}
                    </p>
                    {addressList &&
                      addressList.map((a, i) =>
                        lastShippingAddress &&
                        lastShippingAddress.Id === a.Id ? null : (
                          <div class="shopping-cart-address-outer ">
                            <div class="col-sm-10 col-md-10 col-lg-10 shopping-cart-address-info p-0">
                              <div>
                                <label>
                                  <input
                                    onChange={handleSelectAddress}
                                    type="radio"
                                    name="radio-button"
                                    value={a.Id}
                                    checked={selectedAddress.Id === a.Id}
                                  />
                                  <span></span>
                                </label>
                              </div>
                              <div class="address-info-inner">
                                <p class="shopping-cart-user-name">
                                  {" "}
                                  {a.FirstName + " " + a.LastName}{" "}
                                  <span class="location-badge">
                                    {" "}
                                    {a.AddressType}{" "}
                                  </span>{" "}
                                </p>
                                <p class="shopping-cart-user-address">
                                  {a.Address1 +
                                    ", " +
                                    a.Landmark +
                                    ", " +
                                    a.City +
                                    ", " +
                                    a.State +
                                    ", " +
                                    a.ZipPostal}
                                </p>
                                <p class="shopping-cart-user-mobno">
                                  {" "}
                                  Mobile : <span> {a.Phone} </span>{" "}
                                </p>
                              </div>
                            </div>

                            <div class="shopping-cart-address-btns">
                              <div class="shopping-cart-edit-product-btn p-0">
                                <UpdateShippingAddressModal
                                  getAddress={getAddress}
                                  addressProp={a}
                                />
                              </div>

                              <div class="shopping-cart-remove-address p-0">
                                <button
                                  onClick={clickDeleteAddress}
                                  value={a.Id}
                                  class=" remove-address-btn"
                                >
                                  {" "}
                                  <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                  {/* {<!-- product card 2 end -->} */}
                </div>
                {addressList.length < 3 && (
                  <div class="shopping-cart-add-new-address box-shadow-1">
                    <AddShippingAddressModal getAddress={getAddress} />
                  </div>
                )}
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4 ">
              {/* <div class="shopping-cart-right"> */}
              <div class="shopping-cart-payment-outer box-shadow-1">
                <div class="row">
                  <div class="col-md-12">
                    <h3 class="shopping-cart-payment-head"> Order Summary </h3>
                  </div>
                </div>

                <div class="col-md-12 p-0">
                  <div class="shopping-cart-payment-summery">
                    <div class="row mb-3">
                      <div class="col-7 col-xs-4">
                        <span> Price : </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="shopping-cart-payment-summery-amt">
                          {" "}
                          &#x20B9;{" "}
                          {propsProductsData?.totalAmount &&
                            parseFloat(
                              propsProductsData?.totalAmount
                            ).toLocaleString()}{" "}
                        </span>
                      </div>
                    </div>

                    {/* {<div class="row mb-3">
                                        <div class="col-7 col-xs-4">
                                            <span> Shopping Points : </span>
                                        </div>
                                        <div class="col-5 col-xs-4 text-right">
                                            <span class="shopping-cart-payment-summery-amt"> -&#x20B9; 0.00 </span>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-7 col-xs-4">
                                            <span> Shipping Charges : </span>
                                        </div>
                                        <div class="col-5 col-xs-4 text-right">
                                            <span class="shopping-cart-payment-summery-amt"> -&#x20B9; 50.00 </span>
                                        </div>
                                    </div> */}

                    <div class="dropdown-divider"></div>

                    <div class="row mt-3">
                      <div class="col-7 col-xs-4">
                        <span> Total Amount : </span>
                      </div>
                      <div class="col-5 col-xs-4 text-right">
                        <span class="shopping-cart-payment-summery-amt">
                          {" "}
                          &#x20B9;{" "}
                          {propsProductsData?.totalAmount &&
                            parseFloat(
                              propsProductsData?.totalAmount
                            ).toLocaleString()}{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="shopping-cart-payment-confirm-btn">
                      {/* <button
                          onClick={onPlaceOrder}
                          class="btn-primery"
                          disabled={selectedAddress ? false : true}
                        >
                          {" "}
                          Place Order{" "}
                        </button> */}
                      <ThemeButton
                        onClick={onPlaceOrder}
                        disabled={selectedAddress ? false : true}
                        value={"Place Order"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="shopping-cart-payment-outer box-shadow-1 mt-3">

                            <div class="row">
                                <div class="col-md-12">
                                    <h3 class="shopping-cart-payment-head"> Return / Refund Policy </h3>
                                </div>
                            </div>
    
                            <div class="col-md-12 p-0"> 
                                
                                <div class="shopping-cart-refund-policy"> 
                                    <p> In case of return, we ensure quick refunds. Full amount will be refunded excluding Convenience Fee
                                    </p>
                                    <a href="#">Read Policy</a>  
                                </div> 
    
                            </div>
                        
                        </div> */}
              {/* </div> */}
            </div>
            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            />

            {/* { <!-- shopping-cart end -->} */}
          </div>
        </div>
      </section>
    </>
  );

  return <>{selectAddressSection()}</>;
};

export default ShippingAddress;
