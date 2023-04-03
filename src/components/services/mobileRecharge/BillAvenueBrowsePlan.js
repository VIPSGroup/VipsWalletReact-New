import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { operartorsUrl } from "../../../constants";
import { Loading } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { billAvenueBrowsePlans } from "../../../redux/slices/services/rechargeSlice";

const BillAvenueBrowsePlan = ({
  props,
  number,
  imgurl,
  operator,
  circle,
  activeApiId,
  operatorId,
  circleId,
  setSection,
}) => {
  const [planTypes, setPlanTypes] = useState([]);
  const [activePlans, setActivePlans] = useState([]);
  const [selectedPlanType, setSelectedPlanType] = useState("");
const dispatch= useDispatch()
  let navigate = useNavigate();
  const { loading,billAvenuePlans } = useSelector(state => state.rechargeSlice.billAvenueBrowsePlans );
  const clickPlanType = (e) => {
    e.preventDefault();
    setSelectedPlanType(e.target.value);
    const filtered = billAvenuePlans.filter((p) => {
      return p.planName === e.target.value;
    });
    setActivePlans(filtered);
  };

  useEffect(() => {
    if(billAvenuePlans.length===0){
      dispatch(billAvenueBrowsePlans({circle:"Maharashtra", operator:"AIRTEL"}))
    }
    if(billAvenuePlans){
      const unique = [
        ...new Set(
          billAvenuePlans.map(
            (p) => p.planName
          ) )];
      setPlanTypes(unique);

      setSelectedPlanType(unique[0]);
      const filtered =
      billAvenuePlans.filter(
          (p) => {
            return p.planName === unique[0];
          }
        );
      setActivePlans(filtered);
}
  }, [props,billAvenuePlans]);

  const browsePlansSection = () => (
    <div>
      <section class="inpage-section-align mobile-recharge">
        <div class="container">
          <div class="row">
            <div class="col-md-12 brows-plans-top">
              <div class="brows-plans-user">
                <div class="brows-plans-user-circle">
                  <img src={operartorsUrl + `${imgurl}`} class="" />
                </div>
                <div class="brows-plans-user-name">
                  <p class="brows-plans-user-title">
                    {" "}
                    +91 {number} <a onClick={() => setSection(1)}> Edit </a>{" "}
                  </p>
                  <p class="brows-plans-user-info">
                    {" "}
                    {operator} | {circle}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/*<!-- tab panel start -->*/}
            <div class="col-md-12 brows-plans-head d-flex">
              <h3 class="brows-plans-title">
                Browse plans of {operator} - {circle}
              </h3>
            </div>

            <div class="col-md-12">
              <div class="brows-plans-outer">
                <div class="brows-plans-nav text-nowrap">
                  <ul>
                    {planTypes &&
                      planTypes.map((t, i) => (
                        <li>
                          {" "}
                          <button
                            onClick={clickPlanType}
                            class=""
                            value={t}
                            style={{
                              borderBottom:
                                selectedPlanType === t
                                  ? `3px solid #ca3060`
                                  : `white`,
                              color:
                                selectedPlanType === t ? `#ca3060` : `Black`,
                            }}
                          >
                            {" "}
                            {t}{" "}
                          </button>{" "}
                        </li>
                      ))}
                  </ul>
                </div>

                {loading ? (
                  <div class="brows-plans-inner">
                    <Loading color="#CA3060" />
                  </div>
                ) : (
                  <div class="brows-plans-inner">
                    {activePlans &&
                      activePlans.map((p, i) => (
                        <div class="brows-plans-card shadow-light" key={i}>
                          <div class="mob-recharg-info">
                            <div class="recharge-info">
                              <p class="recharge-price">
                                Price :&nbsp;{" "}
                                <label> &#x20B9; {p.amount} </label>{" "}
                              </p>
                              <p class="recharge-validity">
                                Validity :&nbsp; <label> {p.validity} </label>{" "}
                              </p>
                            </div>
                            <div class="brows-plan-apply-btn ml-auto">
                              <button
                                onClick={(e) => {
                                  console.log(operatorId);
                                  e.preventDefault();
                                  navigate("/services/mobilerecharge/confirm", {
                                    state: {
                                      plan: p,
                                      number: number,
                                      operator: operator,
                                      circle: circle,
                                      operatorId: operatorId,
                                      circleId: circleId,
                                    },
                                  });
                                }}
                                value={p}
                                type="button"
                                class="btn-cta"
                                id="addmoneymodal"
                              >
                                {" "}
                                Apply{" "}
                              </button>
                            </div>
                          </div>
                          <div class="recharge-note">
                            <p>{p.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            {/*<!-- tab panel end -->*/}
          </div>
        </div>
      </section>
    </div>
  );

  return <div>{browsePlansSection()}</div>;
};

export default BillAvenueBrowsePlan;
