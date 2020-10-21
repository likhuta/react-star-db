import React, { Component } from "react";
import Row from "../row";
import { withRouter } from "react-router-dom";
import { StarshipList } from "../sw-components";

const StarshipPage = ({ history }) => {
  return (
    <StarshipList
      onItemSelected={(itemId) => {
        history.push(`/starships/${itemId}`);
      }}
    />
  );
};

export default withRouter(StarshipPage);
