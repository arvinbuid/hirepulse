import React, {useState, ReactNode} from "react";
import {DashboardPageContext} from "./DashboardContextTypes";

import checkDarkTheme from "../utils/checkDarkTheme";

interface DashboardProviderProps {
  children: ReactNode;
}

const isDarkThemeEnabled = checkDarkTheme(); //

export const DashboardProvider: React.FC<DashboardProviderProps> = ({children}) => {
  const user = {name: "john doe"};
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme.toString());
  };

  const logoutUser = async (): Promise<void> => {
    console.log("user logout");
  };

  const value = {
    user,
    showSidebar,
    isDarkTheme,
    toggleSidebar,
    toggleDarkTheme,
    logoutUser,
  };

  return <DashboardPageContext.Provider value={value}>{children}</DashboardPageContext.Provider>;
};
