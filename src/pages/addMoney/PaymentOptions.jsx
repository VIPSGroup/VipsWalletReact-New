import React, { useState, useEffect } from "react";
import CommonTopNav from "../../components/home/CommonTopNav";
import Footer from "../../components/home/Footer";
import FinstockModal from "../../components/addMoney/FinstockModal";

// import {
//   checkGABBalance,
//   addMoneyFromGAB,
//   finstocTradePriceCheck,
// } from "../../apiData/payments";

// import { MuiSnackBar } from "../../components/common/snackbars";

import "../../assets/styles/addMoney/addMoney.css";
import "../../assets/styles/styles.css";
import { getDouble } from "../../constants";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetUserDetail } from "../../components/common/GetUserDetail";
import {
  checkGABBalance,
  finstocTradePriceCheck,
} from "../../redux/slices/walletSlice";
// import { finstocTradePriceCheck } from "../../apiData/payments";

const PaymentOptions = () => {
  const dispatch = useDispatch();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("GAB");
  const [GABBalance, setGABBalance] = useState(0);
  const [coinPrice, setCoinPrice] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { data } = useSelector((state) => state.walletSlice.GABBalance);
  const { data: finPrice } = useSelector(
    (state) => state.walletSlice.finstockPrice
  );
  const handleChange = (e) => {
    setSelectedPaymentOption(e.target.value);
  };
  const { loggedInUser } = useSelector(
    (state) => state?.loginSlice?.loggetInWithOTP
  );
  useEffect(() => {
    const FetchGABBalance = async () => {
      await dispatch(
        checkGABBalance(loggedInUser.Mobile, loggedInUser.TRXNPassword)
      );
    };
    const FetchFinStockTradePrice = async () => {
      await dispatch(
        finstocTradePriceCheck(loggedInUser.Mobile, loggedInUser.TRXNPassword)
      );
    };
    FetchGABBalance();
    FetchFinStockTradePrice();
    // checkGABBalance(loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
    //   (response) => {
    //     if (response.ResponseStatus === 1) {
    //       setGABBalance(response.Data);
    //     } else {
    //       setGABBalance(0);
    //     }
    //   }
    // );

    // finstocTradePriceCheck(loggedInUser.Mobile, loggedInUser.TRXNPassword).then(
    //   (response) => {
    //     setCoinPrice(response?.Data?.price);
    //   }
    // );
  }, [dispatch]);
  useEffect(() => {
    if (data.ResponseStatus === 1) {
      setGABBalance(data.Data);
    } else {
      setGABBalance(0);
    }
  }, [data]);
  useEffect(() => {
    setCoinPrice(finPrice?.Data?.price);
  }, [finPrice]);
  return (
    <div className="color-body">
      <section class="inpage-section-align inset-shadhow-top-light addmoney">
        <div class="container ">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title">Add Money to VIPS Wallet</h1>
            </div>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-sm-8 add-money-outer box-shadow-1 border-0 mx-auto">
                <div class="add-money-card">
                  <div class="add-money-body ">
                    <span class="add-money-title"> Select Payment Method </span>
                  </div>
                  <div class="dropdown-divider"></div>

                  <div class="add-money-body select-payment-method">
                    <form>
                      <label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="radio-button"
                          value="GAB"
                          checked={selectedPaymentOption === "GAB"}
                        />
                        <span>
                          {" "}
                          <img
                            src="/images/logos/affiliate_icon.svg"
                            class="img-fluid img1"
                          />{" "}
                          Affiliate (&#x20B9; {GABBalance})
                        </span>
                      </label>
                      <label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="radio-button"
                          value="Payu"
                          checked={selectedPaymentOption === "Payu"}
                        />
                        <span>
                          {" "}
                          <img
                            src="/images/logos/payu-logo.svg"
                            class="img-fluid img2"
                          />{" "}
                          Payu (card / UPI){" "}
                        </span>
                      </label>
                      <label>
                        <input
                          onChange={handleChange}
                          type="radio"
                          name="radio-button"
                          value="Finstock"
                          checked={selectedPaymentOption === "Finstock"}
                        />
                        <span>
                          {" "}
                          <img
                            src="/images/logos/vips-tokan-logo-small.svg"
                            class="img-fluid img3"
                          />{" "}
                          VIPS Token (&#x20B9; {getDouble(coinPrice)}){" "}
                        </span>
                      </label>
                    </form>
                  </div>

                  <div class="dropdown-divider"></div>

                  <div class="add-money-body">
                    <div class="col-md-12">
                      {selectedPaymentOption === "Finstock" ? (
                        <FinstockModal
                          setSnackbarShow={setIsSnackBar}
                          setSuccessMsg={setSuccessMsg}
                        />
                      ) : (
                        <div class="add-money-btn">
                          <Link
                            type="button"
                            to={`/addMoney/${selectedPaymentOption}/amount`}
                            class="btn-primery"
                            style={{ textDecoration: "none" }}
                          >
                            {" "}
                            Add Money{" "}
                          </Link>
                        </div>
                      )}
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentOptions;
