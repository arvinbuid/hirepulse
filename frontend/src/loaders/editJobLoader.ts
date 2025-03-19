import {AxiosError} from "axios";
import {LoaderFunctionArgs, redirect} from "react-router-dom";
import {toast} from "react-toastify";

import customFetch from "../utils/customFetch";

export const loader = async ({params}: LoaderFunctionArgs) => {
  try {
    const {data} = await customFetch.get(`/jobs/${params.id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError<{message: string}>;
    toast.error(axiosError.response?.data?.message);
    return redirect("/dashboard/all-jobs");
  }
};
