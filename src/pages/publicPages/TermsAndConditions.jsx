import React, { useEffect, useState } from "react";
// import { getDynamicContent } from "../../apiData/home_api";

import ReactGA from "react-ga";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getDynamicContent } from "../../redux/slices/public/publicSlice";
import { getTermsConditionsId, googleAnalytics } from "../../constants";
ReactGA.initialize(googleAnalytics);

const AllTermsAndCondition = ({ title, type }) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, loading } = useSelector(
    (state) => state.publicSlice.termscondition
  );

  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname);
  //   let value = getTermsConditionsId(type);
  //   console.warn(value);
  //   setLoading(true)
  //   getDynamicContent().then((response) => {
  //     setLoading(false)
  //     let collection = response.Data?.find((element) => element.Type === value);
  //     console.log(response.Data);
  //     setData(collection);
  //   });
  // }, []);
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    dispatch(getDynamicContent(type));
  }, []);

  // function htmlDecode(input) {
  //   const parser = new DOMParser();

  //   var doc = parser.parseFromString(input, "text/html");
  //   const errorNode = doc.querySelector("parsererror");
  //   return doc.documentElement.textContent;
  // }
  function htmlDecode(input) {
    const parser = new DOMParser();

    var doc = parser.parseFromString(input, "text/html");
    const errorNode = doc.querySelector("parsererror");
    if (!errorNode) {
      console.error(errorNode);
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
