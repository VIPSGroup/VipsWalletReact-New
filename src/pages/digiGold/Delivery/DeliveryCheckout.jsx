import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/styles/digigold/digigold-shopping-cart.css";
import {
  calculateTotalPrice,
  handleKeyPressForName,
  handleMobileKeyPress,
  namePattern,
} from "../../../constants";
import {
  checkDigiPinCode,
  createDigiAddress,
  deleteDigiAddress,
  getDigiAddressList,
  removePinData,
} from "../../../redux/slices/digiGold/delivery/DeliverySlice";
import { getWalletBalance } from "../../../redux/slices/payment/walletSlice";

const { Item } = Form;
const DeliveryCheckout = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.DeliverySlice);
  const [selectAdd, setSelectAdd] = useState();
  const { pinCode, pinLoading } = useSelector(
    (state) => state.DeliverySlice.pinCodeCheck
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormdata] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    pincode: "",
  });
  const { address, addLoading } = useSelector(
    (state) => state.DeliverySlice.addressList
  );
  const { AddRes, AddLoading } = useSelector(
    (state) => state.DeliverySlice.createAdd
  );
  const { AddDelete, AddDelLoading } = useSelector(
    (state) => state.DeliverySlice.deleteAdd
  );
  const { data: WalletData, loading: walletLoad } = useSelector(
    (state) => state.walletSlice.walletBalance
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const Username = loggedInUser.UserName;
  const Password = loggedInUser.TRXNPassword;
  useEffect(() => {
    dispatch(getDigiAddressList({ Username, Password }));
    setFormdata({ ...formData, mobileNumber: loggedInUser.Mobile });
    setSelectAdd(address.Data?.result[0]?.userAddressId);
    dispatch(getWalletBalance({ username: Username, password: Password }));
  }, []);
  const handleFinish = async () => {
    const name = formData.name;
    const mobileNumber = formData.mobileNumber;
    const email = formData.email;
    const address = formData.address;
    const pincode = formData.pincode;
    const res = await dispatch(
      createDigiAddress({
        Username,
        Password,
        name,
        mobileNumber,
        email,
        address,
        pincode,
      })
    );
    if (
      res.payload.ResponseStatus === 1 &&
      res.payload.Data.statusCode === 200
    ) {
      setModalOpen(false);
      setFormdata({
        name: "",
        email: "",
        address: "",
        mobileNumber: "",
        pincode: "",
      });
      dispatch(getDigiAddressList({ Username, Password }));
    }
  };
  useEffect(() => {
    if (formData.pincode.length === 6) {
      const pincode = formData.pincode;
      dispatch(checkDigiPinCode({ pincode }));
    } else if (formData.pincode.length < 6) {
      dispatch(removePinData());
    }
  }, [formData.pincode]);

  const clickDeleteAddress = async (id) => {
    const Useraddressid = id;
    const res = await dispatch(
      deleteDigiAddress({ Username, Password, Useraddressid })
    );
    if (
      res.payload.ResponseStatus === 1 &&
      res.payload.Data.statusCode === 200
    ) {
      dispatch(getDigiAddressList({ Username, Password }));
    }
  };

  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container-fluid">
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">VIPS Gold Checkout</h1>
          </div>

          <div class="col-lg-10 m-auto digigold-shopping-cart-wrapper">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="digigold-shopping-cart">
                  <div
                    class="accordion digigold-accordion"
                    id="checkout-accordion"
                  >
                    <Spin spinning={addLoading || AddDelLoading || walletLoad}>
                      <div style={{ marginBottom: 20 }} class="box-shadow-1">
                        <div class="shopping-cart-left">
                          <div class="shopping-cart-box-outer shopping-cart-address-bg ">
                            <div class="d-flex justify-content-between">
                              <p class="shopping-cart-address-title">
                                {address?.Data?.result?.length === 0
                                  ? "You don't have a Address."
                                  : "Select Delivery Address"}
                              </p>
                              {address?.Data?.result.length < 3 && (
                                <Button
                                  onClick={() => setModalOpen(true)}
                                  style={{ marginRight: 16 }}
                                >
                                  Add Address
                                </Button>
                              )}
                            </div>

                            <div class="shopping-cart-address-card">
                              <p class="shopping-cart-address-card-title">
                                {" "}
                                Default Address{" "}
                              </p>
                              {address?.Data?.result?.map((e) => {
                                return (
                                  <div class="shopping-cart-address-outer ">
                                    <div class="col-sm-10 col-md-10 col-lg-10 shopping-cart-address-info p-0">
                                      <div>
                                        <label>
                                          <input
                                            onChange={() =>
                                              setSelectAdd(e.userAddressId)
                                            }
                                            type="radio"
                                            name="radio-button"
                                            value={selectAdd}
                                            checked={
                                              selectAdd === e.userAddressId
                                            }
                                          />
                                          <span></span>
                                        </label>
                                      </div>
                                      <div class="address-info-inner">
                                        <p class="shopping-cart-user-name">
                                          Deepak Rathor{" "}
                                          {/* <span class="location-badge">
                                            {" "}
                                            Home
                                          </span>{" "} */}
                                        </p>
                                        <p class="shopping-cart-user-address">
                                          Shanthi Layout, Rammurthi Nagar,
                                          Bangalore, 560016
                                        </p>
                                        <p class="shopping-cart-user-mobno">
                                          Mobile : +91 7723970629
                                        </p>
                                      </div>
                                    </div>

                                    <div class="shopping-cart-address-btns">
                                      <div class="shopping-cart-remove-address p-0">
                                        <button
                                          onClick={() =>
                                            clickDeleteAddress(e.userAddressId)
                                          }
                                          // value={lastShippingAddress.Id}
                                          class=" remove-address-btn"
                                        >
                                          {" "}
                                          <i class="fa-sharp fa-solid fa-xmark"></i>{" "}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Spin>
                    <div class="card">
                      <div class="card-header" id="checkouthead3">
                        <a
                          href="#"
                          class="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#checkout-box3"
                          aria-expanded="true"
                          aria-controls="checkout-box3"
                        >
                          3. Payment Information
                        </a>
                      </div>

                      <div
                        id="checkout-box3"
                        // class="collapse"
                        aria-labelledby="checkouthead3"
                        data-parent="#checkout-accordion"
                      >
                        <div class="card-body">
                          <div class="">
                            <div class="digigold-paymet-discount-info mb-4">
                              <div class="col-lg-8 col-sm-8 p-0">
                                <div class="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    checked
                                    class="custom-control-input"
                                    id="vips-wallet"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="vips-wallet"
                                  >
                                    <img
                                      src="images/digigold-images/vips-logo-small.png"
                                      class="img-fluid digigold-payment-debit-vips"
                                    />{" "}
                                    VIPS Wallet (₹{" "}
                                    {parseFloat(
                                      WalletData?.Data?.Balance
                                    )?.toLocaleString()}
                                    ){" "}
                                    {/* {`${parseFloat(WalletData?.Data?.Balance)} < ${parseFloat}`} */}
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                <p class="digigold-paymet-discount-amt">
                                  {" "}
                                  &#x20B9;{" "}
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div>

                            {/* <div class="digigold-paymet-discount-info">
                              <div class="col-lg-8 col-sm-8 p-0">
                                <div class="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="payu-card"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="payu-card"
                                  >
                                    <img
                                      src="images/digigold-images/payu-logo.png"
                                      class="img-fluid digigold-payment-debit-payu"
                                    />{" "}
                                    Payu (card / UPI)
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-4 col-sm-4 p-0">
                                <p class="digigold-paymet-discount-amt">
                                  {" "}
                                  &#x20B9;
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div> */}
                          </div>

                          <div class="row digigold-checkout-process justify-content-end">
                            <div class="digigold-checkout-btn mt-4">
                              <button class="btn btn-primery">Pay Now</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-12 col-lg-4">
                <div class="digigold-cart-right">
                  <div class="digigold-cart-payment-outer box-shadow-1">
                    <div class="col-md-12 p-0">
                      <div class="digigold-cart-payment-summery">
                        {items.map((e) => {
                          return (
                            <div class="row flex-nowrap p-2">
                              <div class="mr-2">
                                <span>
                                  {" "}
                                  <img
                                    src={e.productImages[0].url}
                                    class="img img-fluid digigold-checkout-coin-img"
                                  />{" "}
                                </span>
                              </div>
                              <div class="">
                                <p class="digigold-cart-summery-title mb-1">
                                  {e.name}
                                </p>
                                <p class="mb-0">SKU : {e.sku}</p>
                              </div>
                            </div>
                          );
                        })}

                        <div class="dropdown-divider"></div>

                        <div class="row mt-3">
                          <div class="col-7 col-xs-4">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              Total Payable :{" "}
                            </span>
                          </div>
                          <div class="col-5 col-xs-4 text-right">
                            <span class="digigold-cart-summery-dark-text">
                              {" "}
                              &#x20B9; {calculateTotalPrice(items, "basePrice")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        onCancel={() => {
          setModalOpen(false);
          setFormdata({
            name: "",
            email: "",
            address: "",
            mobileNumber: "",
            pincode: "",
          });
          dispatch(removePinData());
        }}
        footer={[]}
        width={500}
        open={modalOpen}
      >
        <h5>Add Address</h5>
        <Form
          onFinish={handleFinish}
          fields={[
            {
              name: "name",
              value: formData.name,
            },
            {
              name: "mobileNumber",
              value: formData.mobileNumber,
            },
            {
              name: "email",
              value: formData.email,
            },
            {
              name: "address",
              value: formData.address,
            },
            {
              name: "pincode",
              value: formData.pincode,
            },
          ]}
          style={{ marginTop: 20 }}
        >
          <Item
            onKeyPress={handleKeyPressForName}
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              {
                pattern: namePattern,
                message: "Please Enter Valid Full Name",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setFormdata({ ...formData, name: e.target.value })
              }
              value={formData.name}
              placeholder="Enter Your Name"
            />
          </Item>
          <Item
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter your mobile number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid mobile number!",
              },
            ]}
          >
            <Input
              onKeyPress={handleMobileKeyPress}
              maxLength={10}
              onChange={(e) =>
                setFormdata({ ...formData, mobileNumber: e.target.value })
              }
              value={formData.mobileNumber}
              placeholder="Enter Mobile Number"
            />
          </Item>
          <Item
            name="email"
            rules={[
              // { required: true, message: "Please enter your email address!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              onChange={(e) =>
                setFormdata({ ...formData, email: e.target.value })
              }
              value={formData.email}
              placeholder="Enter Email Address"
            />
          </Item>
          <Item
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input.TextArea
              onChange={(e) =>
                setFormdata({ ...formData, address: e.target.value })
              }
              value={formData.address}
              placeholder="Enter Address"
            />
          </Item>
          <Spin spinning={pinLoading}>
            <Item
              name="pincode"
              rules={[
                { required: true, message: "Please enter your pincode!" },
                {
                  pattern: /^[0-9]{6}$/,
                  message: "Please enter a valid pincode!",
                },
              ]}
            >
              <Input
                maxLength={6}
                onChange={(e) =>
                  setFormdata({ ...formData, pincode: e.target.value })
                }
                value={formData.pincode}
                placeholder="Enter Pincode"
              />
              {pinCode[0]?.Status === "Success"
                ? pinCode[0]?.PostOffice?.map((e) => {
                    return (
                      <span style={{ marginRight: 10, fontSize: 12 }}>
                        {e.Name},
                      </span>
                    );
                  })
                : pinCode[0]?.Message}
            </Item>
          </Spin>
          <Item>
            <Button loading={AddLoading} htmlType="submit" type="primary">
              Submit
            </Button>
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default DeliveryCheckout;
