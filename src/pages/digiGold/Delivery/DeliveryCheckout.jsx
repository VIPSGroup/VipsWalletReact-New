import { Card, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import "../../../assets/styles/digigold/digigold-shopping-cart.css";

const DeliveryCheckout = () => {
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
                        <Form class="card-body">
                          <Card>
                            <Row>
                              <div class="col-lg-12">
                                <Form.Item>
                                  <Input placeholder="Enter Full Name" />
                                </Form.Item>
                              </div>
                              <div class="col-lg-12">
                                <Form.Item>
                                  <TextArea
                                    placeholder="Enter Full Address"
                                    rows={5}
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Select
                                    placeholder="Select City"
                                    size="large"
                                  >
                                    <Select.Option>Select City</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Select
                                    placeholder="Select State"
                                    size="large"
                                  >
                                    <Select.Option>Select State</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Input placeholder="Enter ZIP Code" />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Input placeholder="Enter Mobile Number" />
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
                        <Form class="card-body">
                          <Card>
                            <Row>
                              <div class="col-lg-12">
                                <Form.Item>
                                  <Input placeholder="Enter Full Name" />
                                </Form.Item>
                              </div>
                              <div class="col-lg-12">
                                <Form.Item>
                                  <TextArea
                                    placeholder="Enter Full Address"
                                    rows={5}
                                  />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Select
                                    placeholder="Select City"
                                    size="large"
                                  >
                                    <Select.Option>Select City</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Select
                                    placeholder="Select State"
                                    size="large"
                                  >
                                    <Select.Option>Select State</Select.Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Input placeholder="Enter ZIP Code" />
                                </Form.Item>
                              </div>
                              <div class="col-lg-6 col-md-6">
                                <Form.Item>
                                  <Input placeholder="Enter Mobile Number" />
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
                                  &#x20B9; 99.00{" "}
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
                                  &#x20B9; 0.00{" "}
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
                        <div class="row flex-nowrap p-2">
                          <div class="">
                            <span>
                              {" "}
                              <img
                                src="images/digigold-images/digi-gold-coin.svg"
                                class="img img-fluid digigold-checkout-coin-img"
                              />{" "}
                            </span>
                          </div>
                          <div class="">
                            <p class="digigold-cart-summery-title mb-1">
                              {" "}
                              Augmont 1Gm Gold Coin (999 Purity){" "}
                            </p>
                            <p class="mb-0">SFKU : AU999GC01G</p>
                          </div>
                        </div>

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
                              &#x20B9; 705.60{" "}
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
