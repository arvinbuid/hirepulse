import {useContext} from "react";
import {AllJobsContext} from "../contexts/AllJobsContextTypes";

export const useAllJobsContext = () => {
  const context = useContext(AllJobsContext);
  if (context === undefined) {
    throw new Error("useAllJobsContext must be used within a AllJobsProvider.");
  }
  return context;
};
