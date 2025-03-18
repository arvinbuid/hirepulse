import React, {useState, ReactNode} from "react";
import {useNavigate} from "react-router-dom";

import {DashboardPageContext} from "./DashboardContextTypes";
import {User} from "../types";
import {toast} from "react-toastify";
import checkDarkTheme from "../utils/checkDarkTheme";
import customFetch from "../utils/customFetch";

interface DashboardProviderProps {
  currentUser: User;
  children: ReactNode;
}

const isDarkThemeEnabled = checkDarkTheme(); //

export const DashboardProvider: React.FC<DashboardProviderProps> = ({children, currentUser}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);
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
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("Logout successfully.");
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
