import {FaBug, FaCalendarCheck, FaSuitcaseRolling} from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

interface StatsContainerProps {
  defaultStats: {pending: number; interview: number; declined: number};
}

const StatsContainer = ({defaultStats}: StatsContainerProps) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "interviews scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {stats.map((stat) => {
        return <StatItem key={stat.title} {...stat} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
