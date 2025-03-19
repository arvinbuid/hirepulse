import {createContext} from "react";
import {IJob as Job} from "../../../models/JobModel";

interface AllJobsContextType {
  data: Job[];
}

export const AllJobsContext = createContext<AllJobsContextType | undefined>(undefined);
