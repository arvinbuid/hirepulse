import {useContext} from "react";
import {DashboardPageContext} from "../contexts/DashboardContextTypes";

export const useDashboardContext = () => {
  const context = useContext(DashboardPageContext);
  if (context === undefined) {
    throw new Error("useDashboardContext must be used within a DashboardProvider.");
  }

  return context;
};
