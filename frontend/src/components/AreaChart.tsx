import {ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area} from "recharts";
interface AreaChartProps {
  data: Array<{date: string; count: number}>;
}

const AreaChartComponent = ({data}: AreaChartProps) => {
  return (
    <ResponsiveContainer width='100%' height={450}>
      <AreaChart data={data} margin={{top: 50}}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
