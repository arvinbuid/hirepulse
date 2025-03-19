import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const {data} = await customFetch.get("/jobs");
    return {data};
  } catch (error) {
    return error;
  }
};
