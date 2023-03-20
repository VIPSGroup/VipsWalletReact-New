import { Button, Card, Modal, Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digigold-myorder.css";
import { MuiSnackBar } from "../../components/common";
import { fetchGoldSilverRates } from "../../redux/slices/digiGold/digiGoldSlice";
import {
  downloadPdf,
  getSellStatus,
  MyOrders,
} from "../../redux/slices/digiGold/userProfileSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [tab, setTab] = useState("Buy");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { rateData, loading } = useSelector(
    (state) => state.digiGoldSlice.rates
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { ordersList, loading: orderLoad } = useSelector(
    (state) => state.userProfileSlice.myOrders
  );
  const { data: sellStatus } = useSelector(
    (state) => state.userProfileSlice.sellStatus
  );
  const { pdfData } = useSelector((state) => state.userProfileSlice.invoice);

  useEffect(() => {
    const username = loggedInUser.UserName;
    const password = loggedInUser.TRXNPassword;
    dispatch(MyOrders({ username, password }));
    dispatch(fetchGoldSilverRates());
  }, [dispatch]);
  useEffect(() => {
    setDataSource(ordersList?.Data);
  }, [ordersList]);
  useEffect(() => {
    if (sellStatus.ResponseStatus === 1 && sellStatus.Data.statusCode === 200) {
      setModalData({
        ...modalData,
        TransactionStatus: sellStatus.Data.result.data.status,
      });
    } else if (
      sellStatus.ResponseStatus === 1 &&
      sellStatus.Data.statusCode !== 200
    ) {
      setErrorMsg(sellStatus.Data.message);
      setIsSnackBar(true);
      setSuccessMsg("");
    } else if (sellStatus.ResponseStatus === 0) {
      setSuccessMsg("");
      setIsSnackBar(true);
      setErrorMsg(sellStatus.Remarks);
    }
  }, [sellStatus]);
  useEffect(() => {
    if (pdfData.ResponseStatus === 1) {
      setErrorMsg("");
      setIsSnackBar(true);
      setSuccessMsg(pdfData.Remarks);
      const linkSource = `data:application/pdf;base64,${pdfData.Data.InvoiceString}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = pdfData.Data.invoiceNumber;
      downloadLink.click();
    } else if (pdfData.ResponseStatus === 0) {
      setSuccessMsg("");
      setIsSnackBar(true);
      setErrorMsg(pdfData.Remarks);
    }
  }, [pdfData]);
  const convertBase64ToPDF = (base64String) => {
    const binaryData = atob(base64String);

    // Step 2: Create a new blob object with the binary data
    const blob = new Blob([binaryData], { type: "application/pdf" });

    // Step 3: Create a URL for the blob object
    const url = URL.createObjectURL(blob);

    // Step 4: Create a link to download the PDF
    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.pdf";
    link.click();

    // Optional: Clean up the URL object
    URL.revokeObjectURL(url);
  };

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
      title: "Action",
      dataIndex: "invoice",
      key: "invoice",
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
          <h2 style={{ fontSize: 14 }} className="text-gray-500">
            {`${
              item.TransactionType === "Buy"
                ? `${item.MetalType?.toUpperCase()} Bought ${item.Quantity.toFixed(
                    4
                  )} gm`
                : `${item.MetalType.toUpperCase()} Sold ${item.Quantity.toFixed(
                    4
                  )} gm`
            }`}
          </h2>
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
          {item.TransactionType === "Buy" ? (
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                setModal(true);
                setModalData(item);
              }}
              src="/images/digigold-images/pdf-icon.svg"
              alt="Download PDF"
            />
          ) : (
            <Button
              onClick={() => {
                dispatch(
                  getSellStatus({
                    transactionId: item.TransactionId,
                    Username: loggedInUser.UserName,
                    Password: loggedInUser.TRXNPassword,
                  })
                );
                setModal(true);
                setModalData(item);
              }}
            >
              {item.TransactionType === "Buy" ? "Invoice" : "Status"}
            </Button>
          )}
        </>
      ),
    }));

  return (
    <>
      {/* <CommonTopNav /> */}
      <section class="digi-gold-section-wrapper buy-sell-form">
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
                          {/* <li>
                            {" "}
                            <button class=""> Delivery </button>{" "}
                          </li>
                          <li>
                            {" "}
                            <button class=""> Gift </button>{" "}
                          </li> */}
                        </ul>
                      </div>

                      <div class="digigold-order-content">
                        <div class="row"></div>
                        {/* <Card> */}
                          <Table
                            scroll={{ x: true }}
                            loading={orderLoad}
                            columns={columns}
                            dataSource={data}
                          />
                        {/* </Card> */}
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
        footer={[]}
        onCancel={() => setModal(false)}
        centered
        maskClosable={false}
        open={modal}
      >
        <section class="mbTopSpace">
          {/* <!-- <div class="row no-gutters1"> --> */}
          <div class="digigoldorderdetails-outer">
            <div class="">
              <p class="digigoldorderdetails-title">Order Details</p>
              <div class="digigoldorderdetails-summery">
                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Transaction ID: </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {modalData?.TransactionId}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Date: </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      <Moment format="DD-MM-YYYY">{modalData?.AddDate}</Moment>{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Narration : </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {`${
                        modalData?.TransactionType === "Buy"
                          ? `${modalData?.MetalType?.toUpperCase()} Bought ${modalData?.Quantity?.toFixed(
                              4
                            )} gm`
                          : `${modalData?.MetalType?.toUpperCase()} Sold ${modalData?.Quantity?.toFixed(
                              4
                            )} gm`
                      }`}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Rate per 1 gm (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {modalData?.Rate}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Amount (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {modalData?.PreTaxAmount}{" "}
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
                      {modalData?.TaxAmount}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Total Amount (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {modalData?.TotalAmount}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Invoice (&#x20B9;): </span>
                  </div>
                  <div
                    class="col-xl-6 col-sm-6 text-sm-right"
                    onClick={() => {
                      dispatch(downloadPdf(modalData.TransactionId));
                    }}
                  >
                    {modalData.TransactionStatus === null ? (
                      <span
                        style={{ cursor: "pointer" }}
                        class="digigoldorderdetails-down"
                      >
                        {" "}
                        Download{" "}
                        <img src="/images/digigold-images/download-icon.svg" />{" "}
                      </span>
                    ) : (
                      <span
                        style={{ cursor: "pointer" }}
                        class="digigoldorderdetails-down"
                      >
                        {modalData?.TransactionStatus?.charAt(0).toUpperCase() +
                          modalData?.TransactionStatus?.slice(1)}{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- </div> --> */}
        </section>
      </Modal>
      <MuiSnackBar
        open={isSnackBar}
        setOpen={setIsSnackBar}
        successMsg={successMsg}
        errorMsg={errorMsg}
        setSuccess={setSuccessMsg}
        setError={setErrorMsg}
      />
    </>
  );
};

export default memo(MyOrdersPage);
