import {redirect} from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const {data} = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/login");
  }
};
