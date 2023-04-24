import React, { useEffect, useState } from "react";
import { getDynamicContent } from "../../apiData/home_api";
import { getTermsConditionsId, googleAnalytics } from "../../constant/Constants";
import ReactGA from "react-ga";
import { Spin } from "antd";
ReactGA.initialize(googleAnalytics);

const AllTermsAndCondition = ({ title, type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    let value = getTermsConditionsId(type);
    setLoading(true)
    getDynamicContent().then((response) => {
      setLoading(false)
      let collection = response.Data?.find((element) => element.Type === value);
      setData(collection);
    });
  }, []);

  function htmlDecode(input) {
    const parser = new DOMParser();

    var doc = parser.parseFromString(input, "text/html");
    const errorNode = doc.querySelector("parsererror");
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
  return (
    <>
      {section()}
    </>
  );
};

export default AllTermsAndCondition;
