import React from "react";
import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="add-report">Add Report</Link>
        <Link to="all-reports">All Reports</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
