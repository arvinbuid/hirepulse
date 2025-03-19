import {JobsContainer, SearchContainer} from "../components";
import {useLoaderData} from "react-router-dom";

import {Job} from "../types";
import {AllJobsProvider} from "../contexts/AllJobsContext";
const AllJobs = () => {
  const {data} = useLoaderData() as {data: {jobs: Job[]}};
  return (
    <AllJobsProvider data={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsProvider>
  );
};

export default AllJobs;
