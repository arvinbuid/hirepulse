import {LoaderFunctionArgs} from "react-router-dom";

export const loader = async ({params}: LoaderFunctionArgs) => {
  console.log(params.id);
  return null;
};
