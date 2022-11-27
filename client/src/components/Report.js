import React from "react";
import moment from "moment";
import { FaInfoCircle, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Report";
import ReportInfo from "./ReportInfo";

const Report = ({
  _id,
  programName,
  eventName,
  eventDate,
  reportProgramType,
  programSubType,
  programStatus,
  totalParticipantsServed,
}) => {
  const { setEditReport, deleteReport } = useAppContext();

  let date = moment(eventDate);
  date = date.format("MMM D, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {reportProgramType.charAt(0) + reportProgramType.charAt(1)}
        </div>
        <div className="info">
          <h5>{programName}</h5>
          <p>
            {eventName} - {programSubType}
          </p>
        </div>
      </header>
      <div className="content">
        {/* content center later */}
        <footer>
          <div className="actions">
            <Link
              to="/add-report"
              className="btn edit-btn"
              onClick={() => {
                setEditReport(_id);
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteReport(_id);
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Report;
