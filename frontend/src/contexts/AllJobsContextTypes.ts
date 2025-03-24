import {createContext} from "react";

import {SearchValues} from "./../pages/AllJobs";
import {Job} from "../types";

interface AllJobsContextType {
  data: {jobs: Job[]};
  searchValues: SearchValues;
}

export const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
