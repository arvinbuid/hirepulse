import {JobsContainer, SearchContainer} from "../components";
import {useLoaderData} from "react-router-dom";

import {IJob as Job} from "../../../models/JobModel";
const AllJobs = () => {
  const {data} = useLoaderData() as {data: Job};
  console.log(data);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
