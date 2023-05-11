import React from "react";
import { Helmet } from "react-helmet";

const DynamicMeta = ({ title, canonical, metaDescription, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default DynamicMeta;
