import {useLoaderData} from "react-router-dom";
import {Job} from "../types";

const EditJob = () => {
  const {job} = useLoaderData() as {job: Job};
  console.log(job);
  return <div>EditJob</div>;
};

export default EditJob;
