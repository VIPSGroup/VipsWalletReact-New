import React, { useState, useEffect } from "react";
import {
  walletReport,
  rechargeBillsReport,
  shoppingReport,
  cashbackReport,
  allCashbackReport,
  shoppingPointReport,
  primePointReport,
} from "../../apiData/user/passbook";
import "../../assets/styles/myAccount/passbook.css";
import ReactGA from "react-ga";
import { googleAnalytics } from "../../constants";
import { useSelector } from "react-redux";
import { Loading } from "../../components/common";
ReactGA.initialize(googleAnalytics);

const Passbook = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const [cashbackHistory, setCashbackHistory] = useState([]);
  const [allCashbackHistory, setAllCashbackHistory] = useState([]);
  const [shoppingPointHistory, setShoppingPointHistory] = useState([]);
  const [primePointHistory, setPrimePointHistory] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");

  const [activeHistory, setActiveHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const handleTabClick = (e) => {
    e.preventDefault();
    setSelectedTab(e.target.value);
    if (e.target.value == "wallet") {
      setActiveHistory(walletHistory);
    } else if (e.target.value == "recharge") {
      setActiveHistory(rechargeHistory);
    } else if (e.target.value == "shopping") {
      setActiveHistory(shoppingHistory);
    } else if (e.target.value == "cashback") {
      setActiveHistory(cashbackHistory);
    } else if (e.target.value == "allCashback") {
      setActiveHistory(allCashbackHistory);
    } else if (e.target.value == "shoppingPoint") {
      setActiveHistory(shoppingPointHistory);
    } else if (e.target.value == "primePoint") {
      setActiveHistory(primePointHistory);
    }
  };

  const getTodaysDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formatedToday = mm + "/" + dd + "/" + yyyy;

    return formatedToday;
  };
  const { loggedInUser } = useSelector(
    state => state.loginSlice.loggetInWithOTP
  );
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const toDate = getTodaysDate();
    setSelectedTab("wallet");
    setLoading(true)
    walletReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then((response) => {
      setLoading(false)
      setWalletHistory(response.Data);
      setActiveHistory(response.Data);
    });
    rechargeBillsReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then(
      (response) => {
        setLoading(false)
        setRechargeHistory(response.Data);
      }
    );
    shoppingReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then((response) => {
      setLoading(false)
      setShoppingHistory(response.Data);
    });
    cashbackReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then((response) => {
      setLoading(false)
      setCashbackHistory(response.CashbackHistory);
    });
    allCashbackReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then(
      (response) => {
        setLoading(false)
        setAllCashbackHistory(response.Data);
      }
    );
    shoppingPointReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then(
      (response) => {
        setLoading(false)
        setShoppingPointHistory(response.Data);
      }
    );
    primePointReport(loggedInUser.Mobile, loggedInUser.TRXNPassword, toDate).then(
      (response) => {
        setLoading(false)
        setPrimePointHistory(response.Data);
      }
    );
  }, []);

  const walletHistoryCard = (a) => (
    <div class="trasanction-history-card shadow-light">
      <div class="col-md-12 trasanction-history-box-head p-0">
        <p class="trasanction-history-order-no">
          Order No : <span> #{a.TranId} </span>{" "}
        </p>
        <p class="trasanction-history-order-date ml-auto"> {a.Date} </p>
      </div>

      <div class="trasanction-history-recharg-info">
        <div class="col-lg-8 recharge-operator-info p-0">
          <img
            src="/images/logos/vips-logo-small.png"
            class="electricity-bill-operator-img"
          />

          <div class="recharge-note">
            <p class="recharge-operator-name"> {a.TranType}</p>
            <p class="description">{a.Remarks}</p>
          </div>
        </div>

        <div class="col-lg-4 trasanction-history-amt-info p-0">
          <p class="trasanction-history-amt">
            Amount :{" "}
            <span
              class={
                a.Status === "Pending"
                  ? "text-yellow"
                  : a.Type === "Credit"
                  ? "text-green"
                  : "text-red"
              }
            >
              {" "}
              ₹ {a.Amount}
            </span>{" "}
          </p>
          <p class="trasanction-history-status">
            {" "}
            <span class={a.Type === "Credit" ? "text-green" : "text-red"}>
              {" "}
              {a.Type}{" "}
            </span>{" "}
            OB {a.OldBal} &nbsp; CB {a.NewBal}
          </p>
        </div>
      </div>
    </div>
  );

  const cashbackHistoryCard = (a) => (
    <div class="trasanction-history-card shadow-light">
      <div class="col-md-12 trasanction-history-box-head p-0">
        <p class="trasanction-history-order-no">
          Order No : <span> #{a.OrderId} </span>{" "}
        </p>
        <p class="trasanction-history-order-date ml-auto"> {a.CashbackDate} </p>
      </div>

      <div class="trasanction-history-recharg-info">
        <div class="col-lg-8 recharge-operator-info p-0">
          <img
            src="/images/logos/vips-logo-small.png"
            class="electricity-bill-operator-img"
          />

          <div class="recharge-note">
            <p class="recharge-operator-name"> {a.ProductName}</p>
            <p class="description">{a.BrandName}</p>
          </div>
        </div>

        <div class="col-lg-4 trasanction-history-amt-info p-0">
          <p class="trasanction-history-amt">
            Amount :{" "}
            <span
              class={
                a.Status === "Pending"
                  ? "text-yellow"
                  : a.Status === "Success"
                  ? "text-green"
                  : "text-red"
              }
            >
              {" "}
              ₹ {a.CashbackAmount}
            </span>{" "}
          </p>
          <p class="trasanction-history-status">
            {" "}
            <span
              class={
                a.Status === "Pending"
                  ? "text-yellow"
                  : a.Status === "Success"
                  ? "text-green"
                  : "text-red"
              }
            >
              {" "}
              {a.Status}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const rechargeHistoryCard = (a) => (
    <div class="trasanction-history-card shadow-light">
      <div class="col-md-12 trasanction-history-box-head p-0">
        <p class="trasanction-history-order-no">
          Order No : <span> #{a.Id} </span>{" "}
        </p>
        <p class="trasanction-history-order-date ml-auto">
          {" "}
          {a.RechDate} | {a.RechTime}{" "}
        </p>
      </div>

      <div class="trasanction-history-recharg-info">
        <div class="col-lg-8 recharge-operator-info p-0">
          <img
            src="/images/logos/vips-logo-small.png"
            class="electricity-bill-operator-img"
          />

          <div class="recharge-note">
            <p class="recharge-operator-name">
              Recharge of {a.Operator} {a.Number}
            </p>
            <p class="description">{a.Reason}</p>
          </div>
        </div>

        <div class="col-lg-4 trasanction-history-amt-info p-0">
          <p class="trasanction-history-amt">
            <span
              class={
                a.Status === "Pending"
                  ? "text-yellow"
                  : a.Status === "Success"
                  ? "text-green"
                  : "text-red"
              }
            >
              {" "}
              ₹ {a.Amount}
            </span>{" "}
          </p>
          <p class="trasanction-history-status">
            {" "}
            <span
              class={
                a.Status === "Pending"
                  ? "text-yellow"
                  : a.Status === "Success"
                  ? "text-green"
                  : "text-red"
              }
            >
              {" "}
              {a.Status}{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );

  const shoppingHistoryCard = (a) => (
    <div class="trasanction-history-card shadow-light">
      <div class="col-md-12 trasanction-history-box-head p-0">
        <p class="trasanction-history-order-no">
          Order No : <span> #{a.Orderid} </span>{" "}
        </p>
        <p class="trasanction-history-order-date ml-auto"> {a.Orderdate}</p>
      </div>

      <div class="trasanction-history-recharg-info">
        <div class="col-lg-8 recharge-operator-info p-0">
          <img
            src="/images/logos/vips-logo-small.png"
            class="electricity-bill-operator-img"
          />

          <div class="recharge-note">
            <p class="recharge-operator-name">{a.Name}</p>
            <p class="description">QTY : {a.Quantity}</p>
          </div>
        </div>

        <div class="col-lg-4 trasanction-history-amt-info p-0">
          <p class="trasanction-history-amt">
            Amount : <span class="text-red"> ₹ {a.Amount}</span>{" "}
          </p>
          <p class="trasanction-history-status">
            {" "}
            <span class="text-red"> Debit </span>
          </p>
        </div>
      </div>
    </div>
  );

  const passbookSection = () => (
    <section class="trasanction-history">
      <div class="container">
        <div class="container">
          <div class="inpage-section-head">
            <h1 class="section-head-title">Passbook</h1>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="trasanction-history-outer">
              <div class="trasanction-history-nav text-nowrap">
                <ul>
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="wallet"
                      style={{
                        borderBottom:
                          selectedTab === "wallet"
                            ? `3px solid #CA3060`
                            : `white`,
                        color: selectedTab === "wallet" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Wallet{" "}
                    </button>{" "}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="recharge"
                      style={{
                        borderBottom:
                          selectedTab === "recharge"
                            ? `3px solid #CA3060`
                            : `white`,
                        color: selectedTab === "recharge" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Recharge & Bills{" "}
                    </button>{" "}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="shopping"
                      style={{
                        borderBottom:
                          selectedTab === "shopping"
                            ? `3px solid #CA3060`
                            : `white`,
                        color: selectedTab === "shopping" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Shopping{" "}
                    </button>{" "}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="cashback"
                      style={{
                        borderBottom:
                          selectedTab === "cashback"
                            ? `3px solid #CA3060`
                            : `white`,
                        color: selectedTab === "cashback" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Cashbacks{" "}
                    </button>{" "}
                  </li>
                  {/* <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="allCashback"
                      style={{
                        borderBottom:
                          selectedTab === "allCashback"
                            ? `3px solid #CA3060`
                            : `white`,
                        color:
                          selectedTab === "allCashback" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      All Cashback{" "}
                    </button>{" "}
                  </li> */}
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="shoppingPoint"
                      style={{
                        borderBottom:
                          selectedTab === "shoppingPoint"
                            ? `3px solid #CA3060`
                            : `white`,
                        color:
                          selectedTab === "shoppingPoint" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Shopping Points{" "}
                    </button>{" "}
                  </li>
                  <li>
                    {" "}
                    <button
                      onClick={handleTabClick}
                      class=""
                      value="primePoint"
                      style={{
                        borderBottom:
                          selectedTab === "primePoint"
                            ? `3px solid #CA3060`
                            : `white`,
                        color:
                          selectedTab === "primePoint" ? `#CA3060` : `Black`,
                      }}
                    >
                      {" "}
                      Prime Points{" "}
                    </button>{" "}
                  </li>
                </ul>
              </div>

              <div class="trasanction-history-inner">
             
{loading ?  <div class="service-loader-outer m-auto"><Loading color="#CA3060" class="" /></div>
: activeHistory && activeHistory .length < 1 || activeHistory==null
?<div class="text-center">
<img src="/images/No_Data.svg" />
</div>
: activeHistory.map((a, i) =>
selectedTab === "wallet" ||
selectedTab === "shoppingPoint" ||
selectedTab === "primePoint"
  ? walletHistoryCard(a)
  : selectedTab === "recharge"
  ? rechargeHistoryCard(a)
  : selectedTab === "shopping"
  ? shoppingHistoryCard(a)
  : selectedTab === "cashback"
  ? cashbackHistoryCard(a)
  : null
)}

                {/* <div class="service-loader-outer">
                  {loading ? (
                    <Loading color="#CA3060" class="" />
                  ) : activeHistory && activeHistory .length < 1 ? (
                    <div class="text-center">
                      <img src="/images/No_Data.svg" />
                    </div>
                  ) : null}
                </div>
                 */}
                {/* {activeHistory &&
                  activeHistory.map((a, i) =>
                    selectedTab === "wallet" ||
                    selectedTab === "shoppingPoint" ||
                    selectedTab === "primePoint"
                      ? walletHistoryCard(a)
                      : selectedTab === "recharge"
                      ? rechargeHistoryCard(a)
                      : selectedTab === "shopping"
                      ? shoppingHistoryCard(a)
                      : selectedTab === "cashback"
                      ? cashbackHistoryCard(a)
                      : null
                  )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <div class="color-body">
      {passbookSection()}
    </div>
  )
}

export default Passbook