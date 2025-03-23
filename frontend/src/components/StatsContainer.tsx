import Wrapper from "../assets/wrappers/StatsContainer";

interface StatsContainerProps {
  defaultStats: {pending: number; interview: number; declined: number};
}

const StatsContainer = (defaultStats: StatsContainerProps) => {
  return <Wrapper>Stats Container</Wrapper>;
};

export default StatsContainer;
