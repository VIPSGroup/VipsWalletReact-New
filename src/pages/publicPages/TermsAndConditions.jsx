import React, { useEffect, useState } from "react";
// import { getDynamicContent } from "../../apiData/home_api";
// import { getDynamicContent } from "../apiData/home_api";
import { getTermsConditionsId, googleAnalytics } from "../../constants";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import { getDynamicContent } from "../../redux/slices/public/publicSlice";
ReactGA.initialize(googleAnalytics);

const TermsAndConditions = ({ title, type }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.publicSlice.termscondition);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);

    let value = getTermsConditionsId(type);
    dispatch(getDynamicContent(value));
  }, []);

  const section = () => (
    <section class="inpage-section-align comman-pages">
      <div class="container">
        <div class="container">
          <div class="section-head">
            <h1 class="section-head-title"> {title} </h1>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: data.Content }}></div>
      </div>
    </section>
  );
  return <>{section()}</>;
};

export default TermsAndConditions;
