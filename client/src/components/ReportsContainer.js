import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Report from "./Report";
import Wrapper from "../assets/wrappers/ReportsContainer";
import PageNumberButtonContainer from "./PageNumberButtonContainer";

const ReportsContainer = () => {
  const {
    getReports,
    reports,
    isLoading,
    page,
    totalReports,
    search,
    searchProgramSubType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, [search, searchProgramSubType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }

  if (reports.length === 0) {
    return (
      <Wrapper>
        <h4>There are no reports to display.</h4>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalReports} report{reports.length > 1 && "s"} found
      </h5>
      <div className="reports">
        {reports.map((report) => {
          return <Report key={report._id} {...report} />;
        })}
      </div>

      {/* pagination */}
      {numOfPages > 1 && <PageNumberButtonContainer />}
    </Wrapper>
  );
};

export default ReportsContainer;
