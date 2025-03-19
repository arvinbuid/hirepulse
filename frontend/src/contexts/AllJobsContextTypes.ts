import {createContext} from "react";
import {Job} from "../types";

interface AllJobsContextType {
  data: {jobs: Job[]};
}

export const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
