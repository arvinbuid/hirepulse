import {useLoaderData} from "react-router-dom";
import {ChartsContainer, StatsContainer} from "../components";

interface LoaderData {
  defaultStats: {pending: number; interview: number; declined: number};
  monthlyApplications: Array<{date: string; count: number}>;
}
const Stats = () => {
  const {defaultStats, monthlyApplications} = useLoaderData() as LoaderData;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && <ChartsContainer data={monthlyApplications} />}
    </>
  );
};

export default Stats;
