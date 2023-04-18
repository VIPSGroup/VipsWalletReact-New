import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { operartorsUrl } from "../../constants";
import { getRechargeHistory } from "../../redux/slices/services/commonSlice";
import { getCircleAndOperatorByNumber } from "../../redux/slices/services/rechargeSlice";
import { Loading } from "../common";

const RecentHistory = ({
  setMobileNo,
  serviceId,
  fetchServiceId,type
}) => {
const dispatch= useDispatch()
const {loading,rechargeHistoryList}= useSelector(state => state.commonSlice.rechargeHistory)
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
    state => state.loginSlice.loggetInWithOTP);
  useEffect(() => {
    const toDate = getTodaysDate();

if(loggedInUser){
  dispatch(getRechargeHistory({userName:loggedInUser.Mobile,password:loggedInUser.TRXNPassword,to:toDate,serviceId,type}))
}
  }, []);
  return (<div class="mobile-recharge-right">
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
                  <Loading color="#CA3060" class="" />
                ) : rechargeHistoryList?.length===0 ? (
                  <div class="text-center">
                    <img src="/images/No_Data.svg" />
                  </div>
                ) :!loading && <table class="table text-nowrap table-borderless mobile-recharge-table">
                <tbody>
                  
                  {rechargeHistoryList &&
                    rechargeHistoryList.map((r, i) => (
                      <tr>
                        <td class="align-middle text-left">
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
                        {/* {setMobileNo && (
                          <td class="align-middle">
                            <button
onClick={()=>{
  setMobileNo(r.Number)
 dispatch(getCircleAndOperatorByNumber(r.Number))
}}
                              name="number"
                              value={r.Number}
                              type="button"
                              class="btn-cta reapet-btn"
                            >
                              {" "}
                              Repeat{" "}
                            </button>
                          </td>
                        )} */}
                      </tr>
                    ))}
                </tbody>
              </table>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentHistory;
