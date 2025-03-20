import {redirect} from "react-router-dom";
import {toast} from "react-toastify";

import customFetch from "../utils/customFetch";
export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to access this page.");
    return redirect("/dashboard");
  }
};
