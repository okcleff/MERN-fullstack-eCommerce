import React from "react";
import { Helmet } from "react-helmet-async";

interface IMetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: React.FC<IMetaProps> = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "환영합니다 OK몰입니다",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;
