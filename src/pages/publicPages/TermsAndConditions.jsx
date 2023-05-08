import React, { useEffect, useState } from "react";
// import { getDynamicContent } from "../../apiData/home_api";

import ReactGA from "react-ga";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDynamicContent } from "../../redux/slices/public/publicSlice";
import { getTermsConditionsId, googleAnalytics } from "../../constants";
ReactGA.initialize(googleAnalytics);

const AllTermsAndCondition = ({ title, type }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.publicSlice.termscondition
  );
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    dispatch(getDynamicContent(type));
  }, [title]);
  function htmlDecode(input) {
    const parser = new DOMParser();

    var doc = parser.parseFromString(input, "text/html");
    const errorNode = doc.querySelector("parsererror");
    if (!errorNode) {
    }
    return doc.documentElement.textContent;
  }

  const section = () => (
    <Spin spinning={loading}>
      <section class="inpage-section-align my-account">
        <div class="container">
          <div class="container">
            <div class="section-head">
              <h1 class="section-head-title"> {title} </h1>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: data?.Content }}></div>
        </div>
      </section>
    </Spin>
  );
  return <>{section()}</>;
};

export default AllTermsAndCondition;
