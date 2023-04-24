import React from "react";

const DigiKYC = () => {
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">COMPLETE YOUR KYC TO BEGIN</h1>
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

                      <link
                        href="digigold-css/bootstrap-datepicker.css"
                        rel="stylesheet"
                      />
                      <script src="digigold-js/bootstrap-datepicker.min.js"></script>

                      <div class="col-lg-6 col-md-6">
                        <div class="floating-input-wrapper">
                          <input
                            class="floating-input-box"
                            type="text"
                            placeholder=" "
                          />
                          <label class="floating-label-name">
                            PAN Number *
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="order-proceed-btn">
                  <button class="btn btn-primery"> Submit </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DigiKYC;
