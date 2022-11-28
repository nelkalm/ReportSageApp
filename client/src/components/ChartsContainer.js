import React, { useState } from "react";

import BarChartComponent from "./BarChart";
import AreaChartComponent from "./AreaChart";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);

  const {
    monthlyParticipantsServed: monthlyParticipantsServedData,
    monthlyYouthServed: monthlyYouthServedData,
  } = useAppContext();

  return (
    <Wrapper>
      <div>
        <h4>Monthly Participants Served</h4>
        <button
          type="button"
          onClick={() => {
            setBarChart(!barChart);
          }}
        >
          {barChart ? "Display Area Chart" : "Display Bar Chart"}
        </button>
        {barChart ? (
          <BarChartComponent data={monthlyParticipantsServedData} />
        ) : (
          <AreaChartComponent data={monthlyParticipantsServedData} />
        )}
      </div>
      <br />
      <div>
        <h4>Monthly Youth Served</h4>
        <button
          type="button"
          onClick={() => {
            setBarChart(!barChart);
          }}
        >
          {barChart ? "Display Area Chart" : "Display Bar Chart"}
        </button>
        {barChart ? (
          <BarChartComponent data={monthlyYouthServedData} />
        ) : (
          <AreaChartComponent data={monthlyYouthServedData} />
        )}
      </div>
    </Wrapper>
  );
};

export default ChartsContainer;
