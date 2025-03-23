interface ChartsContainerProps {
  data: Array<{date: string; count: number}>;
}

const BarChart = ({data}: ChartsContainerProps) => {
  return <div>Bar Chart</div>;
};

export default BarChart;
