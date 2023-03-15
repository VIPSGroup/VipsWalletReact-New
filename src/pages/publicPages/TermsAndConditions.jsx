import React, { useEffect, useState } from "react";
import { getDynamicContent } from "../../apiData/home_api";
import { getTermsConditionsId, googleAnalytics } from "../../constant/Constants";
import ReactGA from "react-ga";
ReactGA.initialize(googleAnalytics);

const AllTermsAndCondition = ({ title, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
console.log(type, "type")
    let value = getTermsConditionsId(type);
    console.log(value, "value")
    getDynamicContent().then((response) => {
      console.log(response, "res hai")
      let collection = response.Data?.find((element) => element.Type === value);
      console.log(collection, "collection")
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
console.log(data, "aa rha hai")
  const section = () => (
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
  );
  return (
    <>
      {section()}
    </>
  );
};

export default AllTermsAndCondition;
