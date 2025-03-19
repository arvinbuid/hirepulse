import {JobsContainer, SearchContainer} from "../components";
import {useLoaderData} from "react-router-dom";

import {IJob as Job} from "../../../models/JobModel";
import {AllJobsProvider} from "../contexts/AllJobsContext";
const AllJobs = () => {
  const {data} = useLoaderData() as {data: Job[]};
  return (
    <AllJobsProvider data={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsProvider>
  );
};

export default AllJobs;
