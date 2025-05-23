import {redirect} from "react-router-dom";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

import customFetch from "../utils/customFetch.js";

export const action = async ({request}: {request: Request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    const axiosError = error as AxiosError<{message: string}>;
    toast.error(axiosError.response?.data?.message);
    return error;
  }
};
