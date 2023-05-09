import React from "react";
import { Helmet } from "react-helmet";

const DynamicMeta = ({ title, canonical, metaDescription }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
};

export default DynamicMeta;
