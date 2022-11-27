import React from "react";
import moment from "moment";

const Report = ({ programName, eventDate }) => {
  let date = moment(eventDate);
  date = date.format("MMM D, YYYY");
  return (
    <div>
      <h5>{programName}</h5>
      <h5>{date}</h5>
    </div>
  );
};

export default Report;
