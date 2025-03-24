import {useAllJobsContext} from "../hooks/useAllJobsContext";

const PageBtnContainer = () => {
  const {
    data: {totalJobs, numOfPages},
  } = useAllJobsContext();

  return <div>Pagination related component</div>;
};

export default PageBtnContainer;
