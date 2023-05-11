import { Button, Modal, Table } from "antd";
// import Table from "ant-responsive-table";
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
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const [tab, setTab] = useState("Buy");
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const [isSnackBar, setIsSnackBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sellStatus, setSellStatus] = useState("");

  const { logData, loading: digiLogLoading } = useSelector(
    (state) => state.registerDigiSlice.login
  );
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
  const { ordersList, loading: orderLoad } = useSelector(
    (state) => state.userProfileSlice.myOrders
  );
  const { loading: SellLoad } = useSelector(
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

  var columns;
  if (tab === "Buy") {
    columns = [
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
        title: "Discount",
        dataIndex: "Discount",
        key: "Discount",
        align: "right",
      },
      {
        title: "Action",
        dataIndex: "invoice",
        key: "invoice",
      },
    ];
  } else if (tab === "Sell") {
    columns = [
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
  } else if (tab === "Gift") {
    columns = [
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
        title: "Metal Type",
        dataIndex: "metaltype",
        key: "metaltype",
      },
      {
        title: tab === "Gift" && "Quantity (gms)",
        dataIndex: tab === "Gift" && "qty",
        key: tab === "Gift" && "qty",
        align: "right",
      },
    ];
  } else if (tab === "Delivery") {
    columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Merchant ID",
        dataIndex: "merchantID",
        key: "merchantID",
      },
      {
        title: "Quantity (gms)",
        dataIndex: "qty",
        key: "qty",
      },
      {
        title: "Ship To",
        dataIndex: "shipTo",
        key: "shipTo",
      },
      {
        title: "Total Paid",
        dataIndex: "paid",
        key: "paid",
      },
      {
        title: "Action",
        dataIndex: "status",
        key: "status",
      },
    ];
  }

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
      merchantID: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
            }}
            className="text-gray-500 "
          >
            {item?.MerchantTransactionId}
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
      Cashback: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#008000",
            }}
          >
            {item.CouponModel
              ? item?.CouponModel?.CreditType === 1
                ? `${
                    parseFloat(item?.CouponModel?.Amount) === 0
                      ? null
                      : `+ ₹${item?.CouponModel?.Amount}`
                  }`
                : `${
                    parseFloat(item?.CouponModel?.Amount) === 0
                      ? null
                      : `₹${item?.CouponModel?.Amount}`
                  }`
              : ""}
          </h2>
        </>
      ),
      Discount: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#008000",
              textAlign: "center",
            }}
          >
            {item.ShoppingAmount
              ? item?.ShoppingAmount === 1
                ? `${
                    parseFloat(item?.ShoppingAmount) === 0
                      ? null
                      : `+ ₹${item?.ShoppingAmount}`
                  }`
                : `${
                    parseFloat(item?.ShoppingAmount) === 0
                      ? null
                      : `₹${item?.ShoppingAmount}`
                  }`
              : "--"}
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
      shipTo: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              // color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            {item?.DeliveryAddress?.slice(0, 30)}
          </h2>
        </>
      ),
      paid: (
        <>
          <h2
            style={{
              fontSize: 14,
              fontWeight: "400",
              // color: FilterClass(item),
            }}
            className="text-gray-500"
          >
            ₹ {item?.ShippingCharges?.toFixed(2)}
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
                setModal(true);
                setModalData(item);
              }}
            >
              {item?.TransactionType === "Buy" ? "Invoice" : "Status"}
            </Button>
          )}
        </>
      ),
      status: (
        <>
          <Button
            onClick={() => {
              navigate("/vipsgold-order-details", {
                state: item?.MerchantTransactionId,
              });
            }}
          >
            Order Details
          </Button>
        </>
      ),
    }));

  return (
    <>
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
                          <li>
                            <button
                              style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "black",
                                borderBottomStyle:
                                  tab === "Delivery" && "solid",
                              }}
                              onClick={() => setTab("Delivery")}
                              class=""
                            >
                              Delivery
                            </button>
                          </li>
                        </ul>
                      </div>

                      <div class="digigold-order-content">
                        <div class="row"></div>
                        {/* <Card> */}
                        <Table
                          className="text-nowrap responsive-table digigold-order-table"
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
        onCancel={() => {
          setModal(false);
          setSellStatus("");
        }}
        centered
        maskClosable={false}
        open={modal}
      >
        <section class="">
          {/* <!-- <div class="row no-gutters1"> --> */}
          <div class="digigoldorderdetails-outer">
            <div class="">
              <p class="digigoldorderdetails-title">
                {modalData.TransactionType === "Delivery"
                  ? "Delivery Status"
                  : "Order Details"}
              </p>
              <div class="digigoldorderdetails-summery">
                <div class="row mb-3">
                  <div class="col-xl-5 col-sm-6">
                    <span>
                      {" "}
                      {modalData.TransactionType === "Delivery"
                        ? "Merchant"
                        : "Transaction"}{" "}
                      ID:{" "}
                    </span>
                  </div>
                  <div class="col-xl-7 col-sm-6 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {modalData.TransactionType === "Delivery"
                        ? modalData.MerchantTransactionId
                        : modalData?.TransactionId}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-4">
                    <span> Date: </span>
                  </div>
                  <div class="col-xl-6 col-sm-8 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      <Moment format="DD-MM-YYYY">{modalData?.AddDate}</Moment>{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-4">
                    <span>
                      {" "}
                      {modalData.TransactionType === "Delivery"
                        ? "Ship To"
                        : "Narration"}{" "}
                      :{" "}
                    </span>
                  </div>
                  <div class="col-xl-6 col-sm-8 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {modalData.TransactionType === "Delivery"
                        ? modalData.DeliveryAddress
                        : `${
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
                  <div class="col-xl-6 col-sm-4">
                    <span>
                      {" "}
                      {modalData.TransactionType === "Delivery"
                        ? "Quantity"
                        : `Rate per 1 gm `}
                    </span>
                  </div>
                  <div class="col-xl-6 col-sm-8 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {" "}
                      {modalData?.Rate}{" "}
                    </span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-xl-6 col-sm-4">
                    <span> Amount (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-8 text-sm-right">
                    <span class="digigoldorderdetails-amt">
                      {parseFloat(modalData?.PreTaxAmount)?.toLocaleString()}{" "}
                    </span>
                  </div>
                </div>

                {tab === "Buy" && (
                  <div class="row mb-3">
                    <div class="col-xl-6 col-sm-4">
                      <span> Tax (&#x20B9;): </span>
                    </div>
                    <div class="col-xl-6 col-sm-8 text-sm-right">
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
                  <div class="col-xl-6 col-sm-4">
                    <span> Total Amount (&#x20B9;): </span>
                  </div>
                  <div class="col-xl-6 col-sm-8 text-sm-right">
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
                    <span> {tab === "Buy" ? "Invoice" : "Status"}: </span>
                  </div>
                  <div
                    class="col-xl-6 col-sm-8 text-sm-right"
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
                        {/* {modalData?.TransactionStatus?.charAt(0).toUpperCase() +
                          modalData?.TransactionStatus?.slice(1)}{" "} */}
                        <Button
                          loading={SellLoad}
                          type={sellStatus ? "text" : "default"}
                          style={{
                            color: sellStatus ? "red" : "black",
                          }}
                          onClick={async () => {
                            if (!sellStatus) {
                              const res = await dispatch(
                                getSellStatus({
                                  transactionId: modalData?.TransactionId,
                                  Username: loggedInUser?.UserName,
                                  Password: loggedInUser?.TRXNPassword,
                                })
                              );
                              if (
                                res.payload.ResponseStatus === 0 &&
                                res.payload.Data.statusCode !== 200
                              ) {
                                setIsSnackBar(true);
                                setErrorMsg(res.payload.Data.message);
                                setSuccessMsg("");
                              } else if (
                                res.payload.ResponseStatus === 0 &&
                                !res.payload.Data
                              ) {
                                setIsSnackBar(true);
                                setErrorMsg(res.payload.Remarks);
                                setSuccessMsg("");
                              } else if (
                                res.payload.ResponseStatus === 1 &&
                                res.payload.Data.statusCode === 200
                              ) {
                                setSellStatus(
                                  res.payload.Data.result.data.status
                                );
                              }
                            }
                          }}
                          size="small"
                        >
                          {sellStatus
                            ? sellStatus?.toUpperCase()
                            : "Check Status"}
                        </Button>
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
