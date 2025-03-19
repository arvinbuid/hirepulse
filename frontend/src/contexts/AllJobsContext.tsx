import {ReactNode} from "react";
import {AllJobsContext} from "./AllJobsContextTypes";
import {Job} from "../types";

interface AllJobsProviderProps {
  data: {jobs: Job[]};
  children: ReactNode;
}

export const AllJobsProvider: React.FC<AllJobsProviderProps> = ({children, data}) => {
  const value = {
    data,
  };

  return <AllJobsContext.Provider value={value}>{children}</AllJobsContext.Provider>;
};
