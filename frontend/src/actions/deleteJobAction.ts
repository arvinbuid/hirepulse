import {ActionFunctionArgs, redirect} from "react-router-dom";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

import customFetch from "../utils/customFetch.js";

export const action = async ({params}: ActionFunctionArgs) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted successfully.");
  } catch (error) {
    const axiosError = error as AxiosError<{message: string}>;
    toast.error(axiosError.response?.data?.message);
    return error;
  }
  return redirect("/dashboard/all-jobs");
};
