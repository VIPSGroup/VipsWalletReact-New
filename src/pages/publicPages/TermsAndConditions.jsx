import React, { useEffect, useState } from "react";
import { getDynamicContent } from "../../apiData/home_api";
// import { getDynamicContent } from "../apiData/home_api";
import { getTermsConditionsId, googleAnalytics } from "../../constants";
import ReactGA from "react-ga";
ReactGA.initialize(googleAnalytics);

const TermsAndConditions = ({ title, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);

    let value = getTermsConditionsId(type);
    getDynamicContent().then((response) => {
      let collection = response.Data.find((element) => element.Type === value);
      setData(collection);
    });
  }, []);

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
  return (
    <>
    {section()}
  </>
  )
}

export default TermsAndConditions