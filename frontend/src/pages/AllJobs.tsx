import {JobsContainer, SearchContainer} from "../components";
import {useLoaderData} from "react-router-dom";

import {Job} from "../types";
import {AllJobsProvider} from "../contexts/AllJobsContext";

export interface SearchValues {
  jobStatus?: "all" | "pending" | "interview" | "declined";
  jobType?: "all" | "full-time" | "part-time" | "internship";
  search?: string;
  sort?: "newest" | "oldest" | "a-z" | "z-a";
}

interface allJobsLoaderData {
  data: {jobs: Job[]};
  searchValues: SearchValues;
}
const AllJobs = () => {
  const {data, searchValues} = useLoaderData() as allJobsLoaderData;
  return (
    <AllJobsProvider data={data} searchValues={searchValues}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsProvider>
  );
};

export default AllJobs;
