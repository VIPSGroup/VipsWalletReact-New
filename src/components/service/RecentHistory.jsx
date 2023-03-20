import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getRechargeHistory } from "../../apiData/services/mobileRecharge";
import { operartorsUrl } from "../../constants";
import { Loading } from "../common";
import "../../../assets/styles/services/mobileRecharge/recharge.css";

const RecentHistory = ({
  setMobileNo,
  serviceId = 1,
  fetchServiceId,
  fetchOperator,
}) => {
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useSelector(
    (state) => state.loginSlice.loggetInWithOTP
  );
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

  const clickRepeat = (number) => {
    setMobileNo(number);
    if (fetchOperator) {
      fetchOperator(number);
    }
  };
  // const { loggedInUser } = useSelector((state) => state.login);
  useEffect(() => {
    const toDate = getTodaysDate();

    if (!fetchServiceId) {
      fetchServiceId = serviceId;
    }

    setLoading(true);
    if (loggedInUser) {
      getRechargeHistory(
        loggedInUser.Mobile,
        loggedInUser.TRXNPassword,
        toDate,
        fetchServiceId
      ).then((response) => {
        setLoading(false);
        let data = response.Data.filter((item) => {
          return item.ServiceId === serviceId;
        });

        setRechargeHistory(data);
      });
    }
  }, []);

  return (
    // <div class="col-sm-12 col-md-12 col-lg-8 mobile-recharge-right-outer">
    <div class="mobile-recharge-right">
      <div class="mobile-recharge-content box-shadow-1">
        <div class="mobile-recharge-content-inner">
          <div class="row">
            <div class="col-md-12 mobile-recharge-recent-head">
              <h3 class=""> Recent </h3>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 recharge-table-scroll mobile-recharge-table-outer services-page-loader">
              <div class="service-loader-outer">
                {loading ? (
                  <Loading/>
                ) : rechargeHistory.length < 1 ? (
                  <div class="text-center">
                    <img src="/images/No_Data.svg" />
                  </div>
                ) :  <table class="table text-nowrap table-borderless mobile-recharge-table">
                <tbody>
                  {!loading && rechargeHistory &&
                    rechargeHistory.map((r, i) => (
                      <tr>
                        <td class="align-middle">
                          {" "}
                          <img
                            alt=""
                            src={operartorsUrl + `${r.Image}`}
                            class="recharge-operator-img"
                          />{" "}
                        </td>
                        <td>
                          <p class="recharged-mob-no">{r.Number}</p>
                          <p class="recharged-date">{r.RechDate}</p>
                        </td>
                        <td class="align-middle">
                          {" "}
                          <span class="recharged-amount">
                            {" "}
                            ₹ {r.Amount}{" "}
                          </span>{" "}
                        </td>
                        {r.Status === "Failure" ? (
                          <td class="align-middle">
                            {" "}
                            <span class="recharge-faild">
                              {" "}
                              {r.Status}{" "}
                            </span>{" "}
                          </td>
                        ) : null}
                        {r.Status === "Success" ? (
                          <td class="align-middle">
                            {" "}
                            <span class="recharge-success">
                              {" "}
                              {r.Status}{" "}
                            </span>{" "}
                          </td>
                        ) : null}
                        {r.Status === "Reversal" || r.Status === "Pending" ? (
                          <td class="align-middle">
                            {" "}
                            <span class="recharge-success text-warning">
                              {" "}
                              {r.Status}{" "}
                            </span>{" "}
                          </td>
                        ) : null}
                        {setMobileNo && (
                          <td class="align-middle">
                            <button
                              onClick={() => clickRepeat(r.Number)}
                              name="number"
                              value={r.Number}
                              type="button"
                              class="btn-cta reapet-btn"
                            >
                              {" "}
                              Repeat{" "}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>}
              </div>

              {/* {loading ? (
                  <LoadingBar color="#CA3060" />
                ) : rechargeHistory.length < 1 ? (
                  <div class="text-center">
                    <img src="/images/No_Data.svg" />
                  </div>
                ) : null} */}

             
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RecentHistory;
