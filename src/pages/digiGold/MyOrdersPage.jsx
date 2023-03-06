import { Card, Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digigold-myorder.css";
import { fetchGoldSilverRates } from "../../redux/slices/digiGold/digiGoldSlice";
import { MyOrders } from "../../redux/slices/digiGold/userProfileSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [tab, setTab] = useState("Buy");
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { ordersList, loading: orderLoad } = useSelector(
    (state) => state.userProfileSlice.myOrders
  );
  console.log(ordersList, "ordersList");
  useEffect(() => {
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    dispatch(MyOrders({ username, password }));
    dispatch(fetchGoldSilverRates());
  }, [dispatch]);
  useEffect(() => {
    setDataSource(ordersList?.Data);
  }, [ordersList]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Transaction ID",
      dataIndex: "transactionID",
      key: "transactionID",
    },
    {
      title: "Narration",
      dataIndex: "narration",
      key: "narration",
    },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      align: "right",
    },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: (_, record) => (
        <button
          className="pdf-down-btn"
          type="button"
          data-toggle="modal"
          data-target="#digigoldorderdetails"
        >
          <img src="/images/digigold-images/pdf-icon.svg" alt="Download PDF" />
        </button>
      ),
    },
  ];

  const data = dataSource
    ?.filter((a) => a.TransactionType === tab)
    .map((item, index) => ({
      key: index,
      date: (
        <>
          <h2 style={{ fontSize: 14 }} className="text-gray-500">
            <Moment format="DD-MM-YYYY">{item.AddDate}</Moment>
          </h2>
        </>
      ),
      // timeOfPurchase: (
      //   <>
      //     <h2 className="text-gray-500">{item.brand}</h2>
      //   </>
      // ),
      transactionID: (
        <>
          <h2 style={{ fontSize: 14 }} className="text-gray-500">
            {item.TransactionId}
          </h2>
        </>
      ),
      narration: (
        <>
          <h2 style={{ fontSize: 14 }} className="text-gray-500">{`${
            item.TransactionType === "Buy"
              ? `${item.MetalType?.toUpperCase()} Bought ${item.Quantity.toFixed(
                  4
                )} gm`
              : `${item.MetalType.toUpperCase()} Sold ${item.Quantity.toFixed(
                  4
                )} gm`
          }`}</h2>
        </>
      ),
      amount: (
        <>
          <h2 style={{ fontSize: 14 }} className="text-gray-500">
            ₹ {item.TotalAmount}
          </h2>
        </>
      ),
      invoice: (
        <>
          <h2 className="text-gray-500">{item.unit}</h2>
        </>
      ),

      // action: (
      //   <ActionButton
      //     view={() => ViewOpenClose(item)}
      //     editFormOpen={() => formOpen(item)}
      //     delete={() => TableItemDelete({ title: "Product" })}
      //   />
      // ),
    }));

  console.log(dataSource, "jkhghf");
  return (
    <>
      <section class="section-align buy-sell-form">
        <div class="container">
          <div class="digital-gold-section-head">
            <h1 class="section-head-title">My Order</h1>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div class="buy-sell-form-outer">
                <div class="current-rate-outer">
                  <div class="current-rate">
                    <span class="current-rate-title mb-3">GOLD</span>
                    <span class="current-rate-amt">
                      &#x20B9;{" "}
                      {!loading && rateData
                        ? rateData.Data?.result?.data?.rates?.gBuy
                        : "Loading..."}
                      / gm
                    </span>
                  </div>
                  <div class="digi-icon">
                    <img src="/images/digigold-images/digi-icon.svg" alt="" />
                  </div>
                  <div class="current-rate">
                    <span class="current-rate-title mb-3">SILVER</span>
                    <span class="current-rate-amt">
                      {" "}
                      &#x20B9;{" "}
                      {!loading && rateData
                        ? rateData.Data?.result?.data?.rates?.sBuy
                        : "Loading..."}{" "}
                      / gm
                    </span>
                  </div>
                </div>

                <div class="buy-sell-tab-outer">
                  {/* <!-- tab content start --> */}
                  <div class="buy-sell-tab-inner">
                    <div class="digigold-order-wrapper">
                      <div class="digigold-order-nav text-nowrap">
                        <ul>
                          <li>
                            {" "}
                            <button
                              style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "black",
                                borderBottomStyle: tab === "Buy" && "solid",
                              }}
                              onClick={() => setTab("Buy")}
                              class=""
                            >
                              {" "}
                              Buy{" "}
                            </button>{" "}
                          </li>
                          <li>
                            {" "}
                            <button
                              style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "black",
                                borderBottomStyle: tab === "Sell" && "solid",
                              }}
                              onClick={() => setTab("Sell")}
                              class=""
                            >
                              {" "}
                              Sell{" "}
                            </button>{" "}
                          </li>
                          <li>
                            {" "}
                            <button class=""> Delivery </button>{" "}
                          </li>
                          <li>
                            {" "}
                            <button class=""> Gift </button>{" "}
                          </li>
                        </ul>
                      </div>

                      <div class="digigold-order-content">
                        <div class="row">
                          {/* <div class="col-md-12 digigold-order-table">
                            <table class="table text-nowrap table-hover table-responsive-xl ">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Time od Purchase</th>
                                  <th scope="col">Transaction ID</th>
                                  <th scope="col">Narration</th>
                                  <th scope="col" class="text-right">
                                    Amount(₹)
                                  </th>
                                  <th scope="col">Invoice</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>20/02/2023</td>
                                  <td>3:06 PM</td>
                                  <td>AG822316769721813158571655</td>
                                  <td>Gold Bought 0.0001 gm</td>
                                  <td class="text-right">11,784.35</td>
                                  <td class="text-center">
                                    <button
                                      class="pdf-down-btn"
                                      type="button"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#digigoldorderdetails"
                                    >
                                      {" "}
                                      <img src="/images/digigold-images/pdf-icon.svg" />{" "}
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <div
                              class="modal fade digigoldorderdetails-modal"
                              id="digigoldorderdetails"
                              tabindex="-1"
                              role="dialog"
                              aria-labelledby="digigoldorderdetails"
                              aria-hidden="true"
                            >
                              <div
                                class="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div class="modal-content">
                                  <button
                                    type="button"
                                    class="close modal-close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">
                                      <i class="fa-sharp fa-solid fa-xmark"></i>
                                    </span>
                                  </button>

                                  <section class="mbTopSpace">
                                    <div class="digigoldorderdetails-outer">
                                      <div class="">
                                        <p class="digigoldorderdetails-title">
                                          Order Details
                                        </p>
                                        <div class="digigoldorderdetails-summery">
                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Transaction ID: </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                AG51211288525985695{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Date: </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                24 Feb 2023{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Narration : </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                Gold Bought 0.0001 gm{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span>
                                                {" "}
                                                Rate per 1 gm (&#x20B9;):{" "}
                                              </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                5768.53{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Amount (&#x20B9;): </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                0.97{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Tax (&#x20B9;): </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                3.00{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span>
                                                {" "}
                                                Total Amount (&#x20B9;):{" "}
                                              </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-amt">
                                                {" "}
                                                1.00{" "}
                                              </span>
                                            </div>
                                          </div>

                                          <div class="row mb-3">
                                            <div class="col-xl-6 col-sm-6">
                                              <span> Invoice (&#x20B9;): </span>
                                            </div>
                                            <div class="col-xl-6 col-sm-6 text-sm-right">
                                              <span class="digigoldorderdetails-down">
                                                {" "}
                                                Download{" "}
                                                <img src="digigold-images/download-icon.svg" />{" "}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                            <table class="table text-nowrap table-hover table-responsive-xl ">
                              <thead>
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Transaction ID</th>
                                  <th scope="col">Narration</th>
                                  <th scope="col" class="text-right">
                                    Amount(₹)
                                  </th>
                                  <th scope="col">Invoice</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>20/02/2023</td>
                                  <td>AG822316769721813158571655</td>
                                  <td>Gold Bought 0.0001 gm</td>
                                  <td class="text-right">11,784.35</td>
                                  <td class="text-center">
                                    {" "}
                                    <button class="sell-status-btn">
                                      {" "}
                                      Status{" "}
                                    </button>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>20/02/2023</td>
                                  <td>AG822316769721813158571655</td>
                                  <td>Gold Bought 0.0001 gm</td>
                                  <td class="text-right">11,784.35</td>
                                  <td class="text-center">
                                    {" "}
                                    <button class="sell-status-btn">
                                      {" "}
                                      Status{" "}
                                    </button>{" "}
                                  </td>
                                </tr>
                                <tr>
                                  <td>20/02/2023</td>
                                  <td>AG822316769721813158571655</td>
                                  <td>Gold Bought 0.0001 gm</td>
                                  <td class="text-right">11,784.35</td>
                                  <td class="text-center">
                                    {" "}
                                    <button class="sell-status-btn">
                                      {" "}
                                      Status{" "}
                                    </button>{" "}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div> */}
                        </div>
                        <Card>
                          <Table
                            loading={orderLoad}
                            columns={columns}
                            dataSource={data}
                          />
                        </Card>
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

export default memo(MyOrdersPage);
