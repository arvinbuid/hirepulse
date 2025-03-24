import Wrapper from "../assets/wrappers/JobsContainer";
import {useAllJobsContext} from "../hooks/useAllJobsContext";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const {data} = useAllJobsContext();
  const {jobs, totalJobs, numOfPages} = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <p>No jobs to display...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {totalJobs > 0 && (
        <h5>
          {totalJobs} job{jobs.length > 1 && "s"} found
        </h5>
      )}
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id.toString()} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
