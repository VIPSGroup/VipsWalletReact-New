import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { getWalletBalance } from "../../apiData/user/userDetails";
// import { becomePrime } from "../../apiData/user/primeMembership";
import "../../assets/styles/prime/primeConfirmation.css";
import { needHelpUrl, googleAnalytics } from "../../constants";
import Modal from "react-bootstrap/Modal";
import ReactGA from "react-ga";
import { Loading, MuiSnackBar, ThemeButton } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import {  becomePrime, getWalletBalance } from "../../redux/slices/payment/walletSlice";
ReactGA.initialize(googleAnalytics);

const PrimeConfirmation = ({setIsHomeTopNav}) => {
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { data } = useSelector((state) => state.walletSlice.walletBalance);
  const location = useLocation();
  const props = location.state;
  var amt = 1995;

  const [balance, setBalance] = useState("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("wallet");
  const [payuAmt, setPayuAmt] = useState("0");
  const [walletAmt, setWalletAmt] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  let navigate = useNavigate();
 const dispatch= useDispatch()

  const handleClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleClickConfirm = (e) => {
    e.preventDefault();

    setLoading(true);
    becomePrime(loggedInUser.UserName, loggedInUser.TRXNPassword).then((response) => {
      setLoading(false);
      if (response.ResponseStatus == 1) {
        setShowSuccessModal(true);
      } else {
        setIsSnackBar(true);
        setErrorMsg(response.Remarks);
      }
    });
  };

  const handlePaymentMethod = (e) => {
    if (data?.Data?.Balance  < amt) {
      if (selectedPaymentMethod == "both" && e.target.value == "wallet") {
        setSelectedPaymentMethod("payu");
        setPayuAmt(amt);
        setWalletAmt(0);
      } else if (
        selectedPaymentMethod != "both" &&
        e.target.value == "wallet"
      ) {
        setSelectedPaymentMethod("both");
        setWalletAmt(data?.Data?.Balance );
        setPayuAmt(amt - data?.Data?.Balance );
      }
    } else {
      if (e.target.value == "wallet") {
        setSelectedPaymentMethod(e.target.value);
        setWalletAmt(amt);
        setPayuAmt(0);
      } else if (e.target.value == "payu") {
        setSelectedPaymentMethod(e.target.value);
        setPayuAmt(amt);
        setWalletAmt(0);
      }
    }
  };

  const manageInitialPaymentMethod = (balance) => {
    if (balance >= amt) {
      setSelectedPaymentMethod("wallet");
    } else if (balance < amt) {
      setSelectedPaymentMethod("both");
    }
  };

  useEffect(() => {
    setIsHomeTopNav(false)
    ReactGA.pageview(window.location.pathname);
    setLoading(false);
    const username = loggedInUser && loggedInUser.UserName;
    const password = loggedInUser && loggedInUser.TRXNPassword;
    if (loggedInUser) {
        dispatch(getWalletBalance({ username, password }));
    }
  }, []);
useEffect(() => {
  if (data.Data) {
    manageInitialPaymentMethod(data?.Data?.Balance);
  }
}, [data.Data])

  const successModal = () => (
    <>
      <Modal
        show={showSuccessModal}
        centered
        keyboard={false}
        className="modal fade payment-confirm-modal"
        id="exampleModal"
        data-backdrop="false"
      >
        <button
          onClick={handleClose}
          type="button"
          class="close login-close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        {sucessModalSection()}
      </Modal>
    </>
  );

  const sucessModalSection = () => (
    <div>
      <script src="/animations/blast-animation.js"></script>

      <div class="payment-confirm-modal-body">
        <div class="col-md-12">
          {/* {<!-- success animation start -->} */}
          <div class="payment-confirm-seccess-box">
            <div class="payment-confirm-success-inner">
              <img
                src="/images/primePage/prime-member-success.svg"
                class="img-fluid prime-member-success-img"
              />

              <p class="payment-confirm-success-msg"> Congratulation </p>
              <p class="payment-confirm-success-text">
                You are a <span> VIPS prime </span> member Now
              </p>
              <p class="payment-confirm-success-text">Membership Benefits</p>
            </div>
          </div>
        </div>

        <div class="payment-confirm-success-summery">
          <div class="row mb-3">
            <div class="col-12 col-xs-12">
              <span> Shopping Points : </span>
              <span class="payment-confirm-success-right-text">
                {" "}
                1995 Point{" "}
              </span>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12 col-xs-12">
              <span> Prime Points : </span>
              <span class="payment-confirm-success-right-text">
                {" "}
                100 Point{" "}
              </span>
            </div>
          </div>
        </div>

        <div class="payment-confirm-success-help text-center mb-4">
          <a href={needHelpUrl} target="_blank">
            {" "}
            Need help?{" "}
          </a>
        </div>

        <div class="payment-confirm-success-btn">
          <button onClick={() => navigate("/")} class="btn-primery">
            {" "}
            Done{" "}
          </button>
        </div>
      </div>

      {/* { <!-- modal body end -->} */}
    </div>
  );

  const primeConfirmSection = () => (
    <div>
      <section class="section-align payment-confirmation">
        <div class="container">
          <div class="payment-head">
            <a class="" href="/">
              <img
                src="/images/VipsLogoMain.png"
                alt="VIPS Logo"
                class="img-fluid payment-head-logo"
              />
            </a>
          </div>

          <div class="col-md-12 go-back">
            <a href="/prime">
              <i class="fa-solid fa-arrow-left"> </i>Go back{" "}
            </a>
          </div>

          <div class="row">
            {/* {                <!-- payment onfirmation start -->  */}

            <div class="col-sm-12 col-md-12 col-lg-8">
              <div class="payment-confirmation-left">
                <div class="payment-confirmation-content">
                  <div class="payment-confirmation-card shadow-light">
                    <div class="row">
                      <div class="col-md-12 payment-confirmation-content-head">
                        <h3 class="payment-confirmation-content-title">
                          {" "}
                          Debit From{" "}
                        </h3>
                      </div>
                    </div>
                    <div class="payment-confirmation-info-outer">
                      <div class="payment-confirmation-discount">
                        <form>
                          <div class="payment-confirmation-discount-info ">
                            <div class="col-lg-8 p-0">
                              <div class="custom-control custom-checkbox ">
                                <input
                                  onChange={handlePaymentMethod}
                                  class="custom-control-input"
                                  id="vips-wallet"
                                  type="checkbox"
                                  name="radio-button"
                                  value="wallet"
                                  checked="true"
                                />
                                <label
                                  class="custom-control-label"
                                  for="vips-wallet"
                                >
                                  <img
                                    src="/images/logos/vips-logo-small.png"
                                    class="img-fluid payment-confirmation-debit-vips"
                                  />{" "}
                                  VIPS Wallet (₹ {data?.Data?.Balance})
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 p-0">
                              <p class="mob-paymet-discount-amt ml-auto">
                                {" "}
                                &#x20B9; {amt}{" "}
                              </p>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-4">
              <div class="payment-confirmation-right">
                <div class="payment-confirmation-right-sticky shadow-light">
                  <div class="row">
                    <div class="col-md-12 payment-confirmation-content-head">
                      <h3 class="payment-confirmation-content-title">
                        {" "}
                        Order Summary{" "}
                      </h3>
                    </div>
                  </div>

                  <div class="col-md-12 p-0">
                    <div class="payment-confirmation-summery">
                      <div class="row mb-3">
                        <div class="col-7 col-xs-4">
                          <span> Amount : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          <span class="payment-confirmation-summery-amt">
                            {" "}
                            &#x20B9; {amt}{" "}
                          </span>
                        </div>
                      </div>

                      <div class="dropdown-divider"></div>

                      <div class="row mt-3">
                        <div class="col-7 col-xs-4">
                          <span> Total Amount : </span>
                        </div>
                        <div class="col-5 col-xs-4 text-right">
                          <span class="payment-confirmation-summery-amt">
                            {" "}
                            &#x20B9;{amt}{" "}
                          </span>
                        </div>
                      </div>
                    </div>

                    {amt > data?.Data?.Balance ? (
                      <div className="alert alert-danger d-block mt-4">
                        Wallet Balance less than the Amount.{" "}
                        <a
                          href="/addMoney/options"
                          className="text-decoration-none text-primery"
                          style={{ textDecoration: "none" }}
                        >
                          Add Money
                        </a>
                      </div>
                    ) : null}

                    <div class="col-md-12">
                      <div class="payment-confirmation-btn">
                        {/* <button
                          onClick={!loading ? handleClickConfirm : undefined}
                          type="button"
                          class="btn-primery"
                          id="paymentconfirmmodal"
                        >
                          {loading ? <Loading /> : "Confirm Payment"}
                        </button> */}
                        <ThemeButton onClick={handleClickConfirm} loading={loading} value={"Confirm Payment"}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* {   <!-- payment confirmation end -->} */}
            <MuiSnackBar
              open={isSnackBar}
              setOpen={setIsSnackBar}
              successMsg={successMsg}
              errorMsg={errorMsg}
              setSuccess={setSuccessMsg}
              setError={setErrorMsg}
            />
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="color-body">
    {primeConfirmSection()}
    {successModal()}
  </div>
  )
}

export default PrimeConfirmation