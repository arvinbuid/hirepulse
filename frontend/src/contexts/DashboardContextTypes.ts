import {createContext} from "react";

interface User {
  name: string;
  avatar: string;
}

interface DashboardContextType {
  user: User;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleSidebar: () => void;
  toggleDarkTheme: () => void;
  logoutUser: () => Promise<void>;
}

export const DashboardPageContext = createContext<DashboardContextType | undefined>(undefined);
