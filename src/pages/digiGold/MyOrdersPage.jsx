import { Button, Modal, Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/digigold/digigold-myorder.css";
import { MuiSnackBar } from "../../components/common";
import { fetchGoldSilverRates } from "../../redux/slices/digiGold/digiGoldSlice";
import { loginDigiGold } from "../../redux/slices/digiGold/registerDigiSlice";
import {
  downloadPdf,
  getSellStatus,
  MyOrders,
} from "../../redux/slices/digiGold/userProfileSlice";
import { CurrentRateSection } from "./MyVault";

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
  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
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
  // const { pdfData } = useSelector((state) => state.userProfileSlice.invoice);

  useEffect(() => {
    if (loggedInUser) {
      const username = loggedInUser.UserName;
      const password = loggedInUser.TRXNPassword;
      dispatch(loginDigiGold({ username, password }));
    }
  }, [dispatch]);
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
      // setErrorMsg("");
      // setIsSnackBar(true);
      // setSuccessMsg(sellStatus.Data.message);
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

  // const convertBase64ToPDF = (base64String) => {
  //   const binaryData = atob(base64String);

  //   // Step 2: Create a new blob object with the binary data
  //   const blob = new Blob([binaryData], { type: "application/pdf" });

  //   // Step 3: Create a URL for the blob object
  //   const url = URL.createObjectURL(blob);

  //   // Step 4: Create a link to download the PDF
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "filename.pdf";
  //   link.click();

  //   // Optional: Clean up the URL object
  //   URL.revokeObjectURL(url);
  // };

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
      title:
        (tab === "Delivery" && "Invoice No") ||
        (tab === "Gift" && "Metal Type") ||
        (tab === "Buy" && "Narration") ||
        (tab === "Sell" && "Narration"),
      dataIndex:
        (tab === "Delivery" && "invoiceno") ||
        (tab === "Gift" && "metaltype") ||
        (tab === "Buy" && "narration") ||
        (tab === "Sell" && "narration"),
      key:
        (tab === "Delivery" && "invoiceno") ||
        (tab === "Gift" && "metaltype") ||
        (tab === "Buy" && "narration") ||
        (tab === "Sell" && "narration"),
    },
    {
      title:
        (tab === "Delivery" && "Ship To") ||
        (tab === "Gift" && "Quantity (gms)") ||
        (tab === "Buy" && "Amount (₹)") ||
        (tab === "Sell" && "Amount (₹)"),

      dataIndex:
        (tab === "Delivery" && "shipto") ||
        (tab === "Gift" && "qty") ||
        (tab === "Buy" && "amount") ||
        (tab === "Sell" && "amount"),
      key:
        (tab === "Delivery" && "shipto") ||
        (tab === "Gift" && "qty") ||
        (tab === "Buy" && "amount") ||
        (tab === "Sell" && "amount"),
      align: "right",
    },
    {
      title:
        (tab === "Delivery" && "Total Paid") ||
        (tab === "Gift" && "Transaction Type"),

      dataIndex:
        (tab === "Delivery" && "totalpaid") ||
        (tab === "Gift" && "transactiontype"),
      key:
        (tab === "Delivery" && "totalpaid") ||
        (tab === "Gift" && "transactiontype"),
    },
    {
      title:
        (tab === "Delivery" && "Order Status") ||
        (tab === "Gift" && "Customer Name"),

      dataIndex:
        (tab === "Delivery" && "orderstatus") ||
        (tab === "Gift" && "customername"),
      key:
        (tab === "Delivery" && "orderstatus") ||
        (tab === "Gift" && "customername"),
    },
    {
      title: tab !== "Gift" && "Action",
      dataIndex: tab !== "Gift" && "invoice",
      key: "invoice",
    },
  ];

  const handleDownloadInvoice = async (TrxnID) => {
    const res = await dispatch(downloadPdf(TrxnID));
    if (res.payload.ResponseStatus === 1) {
      setErrorMsg("");
      setIsSnackBar(true);
      setSuccessMsg(res.payload.Remarks);
      setModal(false);
      const linkSource = `data:application/pdf;base64,${res.payload.Data.InvoiceString}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = res.payload.Data.invoiceNumber;
      downloadLink.click();
    } else if (res.payload.ResponseStatus === 0) {
      setSuccessMsg("");
      setIsSnackBar(true);
      setErrorMsg(res.payload.Remarks);
    }
  };

  // This Function for Diff Color Row Sent to and Recieved From
  const FilterClass = (item) => {
    if (logData?.Data?.UniqueId === item?.SenderUniqueId) {
      return "red";
    } else if (logData?.Data?.UniqueId === item?.ReceiverUniqueId) {
      return "#008000";
    } else {
      return "N/A";
    }
  };
  const data = dataSource
    ?.filter((a) => a?.TransactionType === tab)
    .map((item, index) => ({
      key: index,
      date: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: item?.TransactionType === "Gift" && FilterClass(item),
            }}
            className="text-gray-500 "
          >
            <Moment format="DD-MM-YYYY">{item?.AddDate}</Moment>
          </h2>
        </>
      ),
      transactionID: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",

              color: item?.TransactionType === "Gift" && FilterClass(item),
            }}
            className="text-gray-500"
          >
            {item?.TransactionId}
          </h2>
        </>
      ),
      narration: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",

              color: item?.TransactionType === "Gift" && FilterClass(item),
            }}
            className="text-gray-500"
          >
            {`${
              item?.TransactionType === "Buy"
                ? `${item?.MetalType?.toUpperCase()} Bought ${item.Quantity?.toFixed(
                    4
                  )} gm`
                : `${item?.MetalType?.toUpperCase()} Sold ${item.Quantity?.toFixed(
                    4
                  )} gm`
            }`}
          </h2>
        </>
      ),
      amount: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            ₹ {parseFloat(item?.TotalAmount)?.toLocaleString()}
          </h2>
        </>
      ),
      metaltype: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            {item?.MetalType}
          </h2>
        </>
      ),
      qty: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            {item?.Quantity?.toFixed(4)}
          </h2>
        </>
      ),
      transactiontype: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            {(() => {
              if (logData?.Data?.UniqueId === item?.SenderUniqueId) {
                return "Gift Sent To";
              } else if (logData?.Data?.UniqueId === item?.ReceiverUniqueId) {
                return "Gift Received From";
              } else {
                return "N/A";
              }
            })()}
          </h2>
        </>
      ),
      customername: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            {(() => {
              if (logData?.Data?.UniqueId === item?.SenderUniqueId) {
                return item?.ReceiverName;
              } else if (logData?.Data?.UniqueId === item?.ReceiverUniqueId) {
                return item?.SenderName;
              } else {
                return "N/A";
              }
            })()}
          </h2>
        </>
      ),
      invoice: (
        <>
          {item?.TransactionType === "Buy" ? (
            <img
              style={{ cursor: "pointer", color: FilterClass(item) }}
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
              {item?.TransactionType === "Buy" ? "Invoice" : "Status"}
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
                <CurrentRateSection active={tab === "Buy" ? 0 : 1} />

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
                            <button onClick={() => setTab("Delivery")} class="">
                              {" "}
                              Delivery{" "}
                            </button>{" "}
                          </li> */}
                          <li>
                            {" "}
                            <button
                              style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "black",
                                borderBottomStyle: tab === "Gift" && "solid",
                              }}
                              onClick={() => setTab("Gift")}
                              class=""
                            >
                              {" "}
                              Gift{" "}
                            </button>{" "}
                          </li>
                        </ul>
                      </div>

                      <div class="digigold-order-content">
                        <div class="row"></div>
                        {/* <Card> */}
                        <Table
                          className="text-nowrap"
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
                        modalData?.TransactionType?.toLowerCase() === "buy"
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
                      {parseFloat(modalData?.PreTaxAmount)?.toLocaleString()}{" "}
                    </span>
                  </div>
                </div>

                {tab === "Buy" && (
                  <div class="row mb-3">
                    <div class="col-xl-6 col-sm-6">
                      <span> Tax (&#x20B9;): </span>
                    </div>
                    <div class="col-xl-6 col-sm-6 text-sm-right">
                      <span class="digigoldorderdetails-amt">
                        {" "}
                        {parseFloat(
                          modalData?.TaxAmount
                        )?.toLocaleString()}{" "}
                      </span>
                    </div>
                  </div>
                )}

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span> Total Amount (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {parseFloat(
                        modalData?.TotalAmount
                      )?.toLocaleString()}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-6">
                    <span>
                      {" "}
                      {tab === "Buy" ? "Invoice" : "Status"} (&#x20B9;):{" "}
                    </span>
                  </div>
                  <div
                    class="col-xl-6 col-sm-6 text-sm-right"
                    onClick={() => {
                      tab === "Buy" &&
                        handleDownloadInvoice(modalData.TransactionId);
                    }}
                  >
                    {modalData.TransactionType?.toLowerCase() === "buy" ? (
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
