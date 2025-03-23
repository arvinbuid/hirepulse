import Wrapper from "../assets/wrappers/ChartsContainer";

interface ChartsContainerProps {
  data: Array<{date: string; count: number}>;
}

const ChartsContainer = (data: ChartsContainerProps) => {
  return <Wrapper>Charts Container</Wrapper>;
};

export default ChartsContainer;
