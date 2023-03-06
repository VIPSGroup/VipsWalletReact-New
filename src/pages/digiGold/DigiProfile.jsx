import React, { memo } from "react";
import "../../assets/styles/digigold/digi-gold-profile.css";

const DigiProfile = () => {
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">MY PROFILE</h1>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="buy-sell-form-outer">
                <div class="digigold-profile-wrapper">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="floating-input-wrapper">
                          <input
                            class="floating-input-box"
                            type="text"
                            placeholder=" "
                          />
                          <label class="floating-label-name">
                            First Name *
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
                          <label class="floating-label-name">Last Name *</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
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

                      <div class="col-lg-6 col-md-6">
                        <div class="floating-input-wrapper">
                          <input
                            class="floating-input-box"
                            type="text"
                            placeholder=" "
                          />
                          <label class="floating-label-name">Email ID *</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group mb-4">
                          <div class="datepicker date input-group p-0 ">
                            <input
                              type="text"
                              placeholder="Date of Birth *"
                              class="form-control datepicker-formcontrol px-4"
                              id="reservationDate"
                            />
                            <div class="input-group-append">
                              <span class="input-group-text px-4">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <script>
                                    $(function () {
                                        $('.datepicker').datepicker({
                                            clearBtn: true,
                                            format: "dd/mm/yyyy"
                                        });
                                        
                                        });
                                </script> */}
                      <link
                        href="digigold-css/bootstrap-datepicker.css"
                        rel="stylesheet"
                      />
                      <script src="digigold-js/bootstrap-datepicker.min.js"></script>

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
                          <label class="floating-label-name">Gender *</label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-12 col-md-6">
                        <div class="row">
                          <div class="col-lg-12 col-md-12">
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
                                Select State *
                              </label>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-12 col-md-12">
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
                                City / Town *
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-12 col-md-6">
                        <div class="row">
                          <div class="col-lg-12 col-md-12">
                            <div class="floating-input-wrapper">
                              <textarea
                                class="floating-input-box floating-textarea-box"
                                type="textarea"
                                rows="4"
                                placeholder=" "
                              ></textarea>
                              <label class="floating-label-name">
                                Address *
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="floating-input-wrapper">
                          <input
                            class="floating-input-box"
                            type="text"
                            placeholder=" "
                          />
                          <label class="floating-label-name">Pincode *</label>
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
                            Nominee Name *
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6 col-md-6">
                        <div class="form-group mb-4">
                          <div class="datepicker date input-group p-0 ">
                            <input
                              type="text"
                              placeholder="Nominee DOB *"
                              class="form-control datepicker-formcontrol px-4"
                              id="reservationDate"
                            />
                            <div class="input-group-append">
                              <span class="input-group-text px-4">
                                <i
                                  class="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </div>
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
                            Nominee Relation *
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="order-proceed-btn">
                  <button class="btn btn-primery"> Update </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(DigiProfile);
