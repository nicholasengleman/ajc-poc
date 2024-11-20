import React from "react";
import PropTypes from "prop-types";
import List from "@/helperComponents/List";
import adConfig from "./adConfig";

const ListEnhanced = ({ customFields = {} }) => (
  <div className="b-margin-bottom-d30-m20">
    <List customFields={customFields} adConfig={adConfig} />
  </div>
);

export default ListEnhanced;
