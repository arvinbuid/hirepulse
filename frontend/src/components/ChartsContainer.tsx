import {useState} from "react";

import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

interface ChartsContainerProps {
  data: Array<{date: string; count: number}>;
}

const ChartsContainer = ({data}: ChartsContainerProps) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Application</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? "Bar Chart" : "Area Chart"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
