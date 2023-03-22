import { Card, Checkbox, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../../assets/styles/digigold/digigold-shopping-cart.css";
import {
  calculateTotalPrice,
  validateMobile,
  validateName,
  validatePincode,
} from "../../../constants";

const DeliveryCheckout = () => {
  const { items } = useSelector((state) => state.DeliverySlice);
  const [addCheck, setAddCheck] = useState(false);
  const [billingForm, setBillingForm] = useState({
    fName: "",
    fAdd: "",
    city: "",
    state: "",
    zip: "",
    mob: "",
  });
  const [shippingForm, setShippingForm] = useState({
    fName: "",
    fAdd: "",
    city: "",
    state: "",
    zip: "",
    mob: "",
  });

  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container-fluid">
          <div class="digigold-work-section-head delivery-section-head">
            <h1 class="section-head-title py-2">Shopping Cart</h1>
          </div>

          <div class="col-lg-10 m-auto digigold-shopping-cart-wrapper">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8">
                <div class="digigold-shopping-cart">
                  <div
                    class="accordion digigold-accordion"
                    id="checkout-accordion"
                  >
                    <div class="card">
                      <div class="card-header" id="checkouthead1">
                        <a
                          href="#"
                          class="btn btn-header-link"
                          data-toggle="collapse"
                          data-target="#checkout-box1"
                          aria-expanded="true"
                          aria-controls="checkout-box1"
                        >
                          1. Billing Information
                        </a>
                      </div>

                      <div
                        id="checkout-box1"
                        class="collapse show"
                        aria-labelledby="checkouthead1"
                        data-parent="#checkout-accordion"
                      >
                        <Form
                          fields={[
                            {
                              name: "fName",
                              value: billingForm.fName,
                            },
                            {
                              name: "fAdd",
                              value: billingForm.fAdd,
                            },
                            {
                              name: "city",
                              value: billingForm.city,
                            },
                            {
                              name: "state",
                              value: billingForm.state,
                            },
                            {
                              name: "zip",
                              value: billingForm.zip,
                            },
                            {
                              name: "mob",
                              value: billingForm.mob,
                            },
                          ]}
                          class="card-body"
                        >
                          <Card>
                            <Row>
                              <div class="col-lg-12">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validateName,
                                    },
                                  ]}
                                  name={"fName"}
                                >
                                  <Input
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        fName: e.target.value,
                                      })
                                    }
                                    name="fName"
                                    placeholder="Enter Full Name"
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-12">
                                <Form.Item name={"fAdd"}>
                                  <TextArea
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        fAdd: e.target.value,
                                      })
                                    }
                                    name="fAdd"
                                    placeholder="Enter Full Address"
                                    rows={5}
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item name={"city"}>
                                  <Select
                                    value={billingForm.city}
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        city: e,
                                      })
                                    }
                                    placeholder="Select City"
                                    size="large"
                                  >
                                    <Select.Option value="city">
                                      Select City
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item name={"state"}>
                                  <Select
                                    value={billingForm.state}
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        state: e,
                                      })
                                    }
                                    placeholder="Select State"
                                    size="large"
                                  >
                                    <Select.Option value="state">
                                      Select State
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validatePincode,
                                    },
                                  ]}
                                  name={"zip"}
                                >
                                  <Input
                                    maxLength={6}
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        zip: e.target.value,
                                      })
                                    }
                                    name="zip"
                                    placeholder="Enter ZIP Code"
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validateMobile,
                                    },
                                  ]}
                                  name={"mob"}
                                >
                                  <Input
                                    maxLength={10}
                                    onChange={(e) =>
                                      setBillingForm({
                                        ...billingForm,
                                        mob: e.target.value,
                                      })
                                    }
                                    name="mob"
                                    placeholder="Enter Mobile Number"
                                  />
                                </Form.Item>
                              </div>

                              <div class="col-lg-12 ">
                                <div class="row digigold-checkout-process justify-content-between">
                                  <div class="custom-control custom-checkbox digigold-check-Style">
                                    <input
                                      type="checkbox"
                                      class="custom-control-input"
                                      id="customCheck1"
                                      checked
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      Ship to this address
                                    </label>
                                  </div>

                                  <div class="digigold-checkout-btn">
                                    <button class="btn btn-primery">
                                      Continue
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </Card>
                        </Form>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-header" id="checkouthead2">
                        <a
                          href="#"
                          class="btn btn-header-link collapsed"
                          data-toggle="collapse"
                          data-target="#checkout-box2"
                          aria-expanded="true"
                          aria-controls="checkout-box2"
                        >
                          2. Shipping Information
                        </a>
                      </div>

                      <div
                        id="checkout-box2"
                        class="collapse"
                        aria-labelledby="checkouthead2"
                        data-parent="#checkout-accordion"
                      >
                        {/* <div class="card-body">
                          <div class="row">
                            <div class="col-lg-12 ">
                              <div class="custom-control custom-checkbox digigold-check-Style justify-content-end mb-3">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Ship to billing address
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-12 col-md-12">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  Full Name *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-12">
                              <div class="floating-input-wrapper">
                                <textarea
                                  class="floating-input-box floating-textarea-box"
                                  type="textarea"
                                  rows="2"
                                  placeholder=" "
                                ></textarea>
                                <label class="floating-label-name">
                                  Address *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <select
                                  class="floating-select-wraper"
                                  onclick="this.setAttribute('value', this.value);"
                                  onchange="this.setAttribute('value', this.value);"
                                  value=""
                                >
                                  <option value=""></option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <label class="floating-label-name">
                                  Country *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <select
                                  class="floating-select-wraper"
                                  onclick="this.setAttribute('value', this.value);"
                                  onchange="this.setAttribute('value', this.value);"
                                  value=""
                                >
                                  <option value=""></option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <label class="floating-label-name">
                                  State *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <select
                                  class="floating-select-wraper"
                                  onclick="this.setAttribute('value', this.value);"
                                  onchange="this.setAttribute('value', this.value);"
                                  value=""
                                >
                                  <option value=""></option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <label class="floating-label-name">
                                  City *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  Zip Code *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                              <div class="floating-input-wrapper">
                                <input
                                  class="floating-input-box"
                                  type="text"
                                  placeholder=" "
                                />
                                <label class="floating-label-name">
                                  Mobile Number *
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-12 ">
                              <div class="row digigold-checkout-process justify-content-end">
                                <div class="digigold-checkout-btn mt-0">
                                  <button class="btn btn-primery">
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <Form
                          fields={[
                            {
                              name: "fName",
                              value: addCheck
                                ? billingForm.fName
                                : shippingForm.fName,
                            },
                            {
                              name: "fAdd",
                              value: addCheck
                                ? billingForm.fAdd
                                : shippingForm.fAdd,
                            },
                            {
                              name: "city",
                              value: addCheck
                                ? billingForm.city
                                : shippingForm.city,
                            },
                            {
                              name: "state",
                              value: addCheck
                                ? billingForm.state
                                : shippingForm.state,
                            },
                            {
                              name: "zip",
                              value: addCheck
                                ? billingForm.zip
                                : shippingForm.zip,
                            },
                            {
                              name: "mob",
                              value: addCheck
                                ? billingForm.mob
                                : shippingForm.mob,
                            },
                          ]}
                          class="card-body"
                        >
                          <Card>
                            <Row>
                              <div class="col-lg-12">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validateName,
                                    },
                                  ]}
                                  name={"fName"}
                                >
                                  <Input
                                    value={
                                      addCheck
                                        ? billingForm.fName
                                        : shippingForm.fName
                                    }
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        fName: e.target.value,
                                      })
                                    }
                                    name="fName"
                                    placeholder="Enter Full Name"
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-12">
                                <Form.Item name={"fAdd"}>
                                  <TextArea
                                    value={
                                      addCheck
                                        ? billingForm.fAdd
                                        : shippingForm.fAdd
                                    }
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        fAdd: e.target.value,
                                      })
                                    }
                                    name="fAdd"
                                    placeholder="Enter Full Address"
                                    rows={5}
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item name={"city"}>
                                  <Select
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        city: e,
                                      })
                                    }
                                    value={
                                      addCheck
                                        ? billingForm.city
                                        : shippingForm.city
                                    }
                                    placeholder="Select City"
                                    size="large"
                                  >
                                    <Select.Option>Select City</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item name={"state"}>
                                  <Select
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        state: e,
                                      })
                                    }
                                    value={
                                      addCheck
                                        ? billingForm.state
                                        : shippingForm.state
                                    }
                                    placeholder="Select State"
                                    size="large"
                                  >
                                    <Select.Option>Select State</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validatePincode,
                                    },
                                  ]}
                                  name={"zip"}
                                >
                                  <Input
                                    maxLength={6}
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        zip: e.target.value,
                                      })
                                    }
                                    value={
                                      addCheck
                                        ? billingForm.zip
                                        : shippingForm.zip
                                    }
                                    name="zip"
                                    placeholder="Enter ZIP Code"
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item
                                  rules={[
                                    {
                                      validator: validateMobile,
                                    },
                                  ]}
                                  name={"mob"}
                                >
                                  <Input
                                    maxLength={10}
                                    onChange={(e) =>
                                      setShippingForm({
                                        ...shippingForm,
                                        mob: e.target.value,
                                      })
                                    }
                                    value={
                                      addCheck
                                        ? billingForm.mob
                                        : shippingForm.mob
                                    }
                                    name="mob"
                                    placeholder="Enter Mobile Number"
                                  />
                                </Form.Item>
                              </div>

                              <div class="col-lg-12 ">
                                <div class="row digigold-checkout-process justify-content-between">
                                  <div class="custom-control">
                                    <Checkbox
                                      checked={addCheck}
                                      onChange={() => setAddCheck(!addCheck)}
                                    />
                                    <label
                                      //   class="custom-control-label"
                                      for="customCheck1"
                                    >
                                      Ship to billing address
                                    </label>
                                  </div>

                                  <div class="digigold-checkout-btn">
                                    <button class="btn btn-primery">
                                      Continue
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Row>
                          </Card>
                        </Form>
                      </div>
                    </div>
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
                        class="collapse"
                        aria-labelledby="checkouthead3"
                        data-parent="#checkout-accordion"
                      >
                        <div class="card-body">
                          <div class="">
                            <div class="digigold-paymet-discount-info mb-4">
                              <div class="col-lg-8 p-0">
                                <div class="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    class="custom-control-input"
                                    id="vips-wallet"
                                  />
                                  <label
                                    class="custom-control-label"
                                    for="vips-wallet"
                                  >
                                    <img
                                      src="images/digigold-images/Vipslogo.png"
                                      class="img-fluid digigold-payment-debit-vips"
                                    />{" "}
                                    VIPS Wallet (₹ 5,72,93,773.35)
                                  </label>
                                </div>
                              </div>
                              <div class="col-lg-4 p-0">
                                <p class="digigold-paymet-discount-amt">
                                  {" "}
                                  &#x20B9;{" "}
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div>

                            <div class="digigold-paymet-discount-info">
                              <div class="col-lg-8 p-0">
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
                              <div class="col-lg-4 p-0">
                                <p class="digigold-paymet-Prime-amt">
                                  {" "}
                                  &#x20B9;
                                  {calculateTotalPrice(items, "basePrice")}
                                </p>
                              </div>
                            </div>
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
                              <div class="">
                                <span>
                                  {" "}
                                  <img
                                    src={e.productImages}
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
    </>
  );
};

export default DeliveryCheckout;
