import {FaCalendarCheck, FaSuitcaseRolling} from "react-icons/fa";
import {useLoaderData} from "react-router-dom";

import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "../components/StatItem";

interface LoaderData {
  userCount: number;
  jobCount: number;
}

const Admin = () => {
  const {userCount, jobCount} = useLoaderData() as LoaderData;

  return (
    <Wrapper>
      <StatItem
        title='Current users'
        count={userCount}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title='Total jobs'
        count={jobCount}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;
