import React from "react";
import StatItem from "./StatItem";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/StatsContainer";
import { FaPaintBrush, FaTree, FaUsers } from "react-icons/fa";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "Art",
      count: stats.art || 0,
      icon: <FaPaintBrush />,
      color: "#f26829",
      bcg: "#FFE7D4",
    },
    {
      title: "Nature",
      count: stats.nature || 0,
      icon: <FaTree />,
      color: "#4b8b40",
      bcg: "#DEF8D6",
    },
    {
      title: "Neighborhood",
      count: stats.neighborhood || 0,
      icon: <FaUsers />,
      color: "#00b2e2",
      bcg: "#C6F8FF",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
