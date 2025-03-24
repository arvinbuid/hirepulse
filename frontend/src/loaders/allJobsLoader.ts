import {LoaderFunctionArgs} from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async ({request}: LoaderFunctionArgs) => {
  // Make query params into an object
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  try {
    const {data} = await customFetch.get("/jobs", {
      params,
    });

    return {data, searchValues: {...params}};
  } catch (error) {
    return error;
  }
};
