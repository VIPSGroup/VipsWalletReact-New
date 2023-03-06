import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  billAvenueBrowsePlans,
  getSpecialMobileRechargePlans,
  getMobileRechargePlans,
} from "../../../apiData/services/mobileRecharge";

import "../../../assets/styles/services/mobileRecharge/recharge.css";
import { operartorsUrl } from "../../../constants";
import { Loading } from "../../common";


const BrowsePlans = ({
  number,
  imgurl,
  operator,
  circle,
  activeApiId,
  operatorId,
  circleId,
  setSection,
}) => {
  //const [mPlanObj,setMPlanObj]=({})
  const [activePlans, setActivePlans] = useState([]);
  const [topupPlans, setTopupPlans] = useState([]);
  const [roamingPlans, setRoamingPlans] = useState([]);
  const [rateCutterPlans, setRateCutterPlans] = useState([]);
  const [comboPlans, setComboPlans] = useState([]);
  const [netPlans, setNetPlans] = useState([]);
  const [spPlans, setSpPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedType, setSelectedType] = useState("Special Recharge");

  let navigate = useNavigate();

  const clickMplanType = (e) => {
    e.preventDefault();
    const clickedButton = e.target.value;
    if (clickedButton == "Special Recharge") {
      setActivePlans(spPlans);
      setSelectedType(e.target.value);
    } else {
      // setActivePlans(mPlanObj)
      if (clickedButton == "TOPUP") {
        setActivePlans(topupPlans);
        setSelectedType(e.target.value);
      } else if (clickedButton == "Romaing") {
        setActivePlans(roamingPlans);
        setSelectedType(clickedButton);
      } else if (clickedButton == "RATE CUTTER") {
        setActivePlans(rateCutterPlans);
        setSelectedType(clickedButton);
      } else if (clickedButton == "COMBO") {
        setActivePlans(comboPlans);
        setSelectedType(clickedButton);
      } else if (clickedButton == "3G/4G") {
        setActivePlans(netPlans);
        setSelectedType(clickedButton);
      }
    }
  };

  const clickApply = (e) => {
    e.preventDefault();
    navigate("/services/mobileRecharge/confirm");
  };

  useEffect(() => {
    if (activeApiId == 10) {
      const op =
        operator.substring(0, 1) +
        operator.substring(1, operator.length).toLowerCase();
      getSpecialMobileRechargePlans(op, number).then((response) => {
        if (!response.Data.records.msg) {
          setSpPlans(response.Data.records);
          setActivePlans(response.Data.records);
        } else {
          setLoading(false);
          setError("Something went wrong");
        }
      });

      getMobileRechargePlans(circle, operator).then((response) => {
        if (!response?.Data?.records?.msg) {
          setLoading(false);
          setTopupPlans(response.Data.records.TOPUP);
          setRoamingPlans(response.Data.records.Romaing);
          setRateCutterPlans(response.Data.records["RATE CUTTER"]);
          setComboPlans(response.Data.records.COMBO);
          setNetPlans(response.Data.records["3G/4G"]);
        } else {
          setLoading(false);
          setError("Something went wrong");
        }
      });
    }
  }, []);

  const browsePlansSection = () => (
    <>
      <section class="services-section-align brows-plan">
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
                    +91 {number}{" "}
                    <a onClick={() => setSection(1)} className="">
                      {" "}
                      Edit{" "}
                    </a>{" "}
                  </p>
                  <p class="brows-plans-user-info">
                    {" "}
                    {operator} | {circle}{" "}
                  </p>
                </div>
              </div>
            </div>

            {/*<!-- tab panel start -->*/}
            <div class="col-md-12 brows-plans-head ">
              <h3 class="brows-plans-title">
                Browse plans of {operator} - {circle}
              </h3>
              {/* <div class="input-group search-brows-plan shadow-light ">
                <input
                  class="form-control search-input"
                  type="search"
                  placeholder="Search for plan, eg. 299"
                />
                <span class="input-group-append">
                   class="btn search-btn" type="button">
                    <i class="fa fa-search"></i>
                  </button>
                </span>
              </div> */}
            </div>

            <div class="col-md-12">
              <div class="brows-plans-outer">
                <div class="brows-plans-nav text-nowrap">
                  <ul>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="Special Recharge"
                        style={{
                          borderBottom:
                            selectedType === "Special Recharge"
                              ? `2px solid #ca3060`
                              : `white`,
                          color:
                            selectedType === "Special Recharge"
                              ? `#ca3060`
                              : `Black`,
                        }}
                      >
                        {" "}
                        Special Recharge{" "}
                      </button>{" "}
                    </li>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="TOPUP"
                        style={{
                          borderBottom:
                            selectedType === "TOPUP"
                              ? `2px solid #ca3060`
                              : `white`,
                          color: selectedType === "TOPUP" ? `#ca3060` : `Black`,
                        }}
                      >
                        {" "}
                        Topup{" "}
                      </button>{" "}
                    </li>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="Romaing"
                        style={{
                          borderBottom:
                            selectedType === "Romaing"
                              ? `2px solid #ca3060`
                              : `white`,
                          color:
                            selectedType === "Romaing" ? `#ca3060` : `Black`,
                        }}
                      >
                        {" "}
                        Roaming{" "}
                      </button>{" "}
                    </li>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="RATE CUTTER"
                        style={{
                          borderBottom:
                            selectedType === "RATE CUTTER"
                              ? `2px solid #ca3060`
                              : `white`,
                          color:
                            selectedType === "RATE CUTTER"
                              ? `#ca3060`
                              : `Black`,
                        }}
                      >
                        {" "}
                        Rate Cutter
                      </button>{" "}
                    </li>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="COMBO"
                        style={{
                          borderBottom:
                            selectedType === "COMBO"
                              ? `2px solid #ca3060`
                              : `white`,
                          color: selectedType === "COMBO" ? `#ca3060` : `Black`,
                        }}
                      >
                        {" "}
                        Combo{" "}
                      </button>{" "}
                    </li>
                    <li>
                      {" "}
                      <button
                        onClick={clickMplanType}
                        class=""
                        value="3G/4G"
                        style={{
                          borderBottom:
                            selectedType === "3G/4G"
                              ? `2px solid #ca3060`
                              : `white`,
                          color: selectedType === "3G/4G" ? `#ca3060` : `Black`,
                        }}
                      >
                        {" "}
                        3G/4G
                      </button>{" "}
                    </li>
                  </ul>
                </div>
                {loading ? (
                  <div class="brows-plans-inner brows-plan-loader">
                    <div class="brows-plan-loader-outer">
                      <Loading color="#CA3060" />
                    </div>
                  </div>
                ) : error.length !== 0 ? (
                  <div>{error}</div>
                ) : (
                  <div class="brows-plans-inner">
                    {activePlans &&
                      activePlans.map((p, i) => (
                        <div class="brows-plans-card shadow-light" key={i}>
                          <div class="mob-recharg-info">
                            <div class="recharge-info">
                              <p class="recharge-price">
                                Price :&nbsp; <label> &#x20B9; {p.rs} </label>{" "}
                              </p>
                              <p class="recharge-validity">
                                Validity :&nbsp; <label> {p.validity} </label>{" "}
                              </p>
                            </div>
                            <div class="brows-plan-apply-btn ml-auto">
                              <button
                                onClick={(e) => {
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
                            <p>{p.desc}</p>
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
    </>
  );

  return <div>{browsePlansSection()}</div>;
};

export default BrowsePlans;
