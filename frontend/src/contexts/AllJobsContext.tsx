import {ReactNode} from "react";
import {AllJobsContext} from "./AllJobsContextTypes";
import {SearchValues} from "../pages/AllJobs";
import {Job} from "../types";

interface AllJobsProviderProps {
  children: ReactNode;
  data: {jobs: Job[]; totalJobs: number; numOfPages: number; currentPage: number};
  searchValues: SearchValues;
}

export const AllJobsProvider: React.FC<AllJobsProviderProps> = ({children, data, searchValues}) => {
  const value = {
    data,
    searchValues,
  };

  return <AllJobsContext.Provider value={value}>{children}</AllJobsContext.Provider>;
};
