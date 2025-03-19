import {ReactNode} from "react";
import {AllJobsContext} from "./AllJobsContextTypes";
import {IJob as Job} from "../../../models/JobModel";

interface AllJobsProviderProps {
  data: Job[];
  children: ReactNode;
}

export const AllJobsProvider: React.FC<AllJobsProviderProps> = ({children, data}) => {
  const value = {
    data,
  };

  return <AllJobsContext.Provider value={value}>{children}</AllJobsContext.Provider>;
};
