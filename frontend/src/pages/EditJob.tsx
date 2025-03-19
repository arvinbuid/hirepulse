import {useParams} from "react-router-dom";

const EditJob = () => {
  const params = useParams();
  console.log(params);
  return <div>EditJob</div>;
};

export default EditJob;
