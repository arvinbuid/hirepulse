import {useLoaderData} from "react-router-dom";
import Wrapper from "../assets/wrappers/StatsContainer";

interface adminLoaderData {
  userCount: number;
  jobCount: number;
}

const Admin = () => {
  // const {userCount, jobCount} = useLoaderData() as adminLoaderData;
  return <Wrapper>Admin</Wrapper>;
};

export default Admin;
