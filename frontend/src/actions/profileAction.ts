import {ActionFunctionArgs} from "react-router-dom";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

import customFetch from "../utils/customFetch";

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();

  const file = formData.get("avatar") as File;
  if (file && file.size > 500000) {
    toast.error("Image size should be less than 500kb");
    return null;
  }

  try {
    await customFetch.patch(`/users/update-user`, formData);
    toast.success("Profile updated successfully.");
  } catch (error) {
    const axiosError = error as AxiosError<{message: string}>;
    toast.error(axiosError.response?.data?.message);
  }

  return null;
};
