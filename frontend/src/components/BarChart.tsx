import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartContainerProps {
  data: Array<{date: string; count: number}>;
}

const BarChartContainer = ({data}: BarChartContainerProps) => {
  return (
    <ResponsiveContainer width='100%' height={450}>
      <BarChart data={data} margin={{top: 50}}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey='count' fill='#2cb1bc' />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartContainer;
