import Wrapper from "../assets/wrappers/JobsContainer";
import {useAllJobsContext} from "../hooks/useAllJobsContext";
import Job from "./Job";

const JobsContainer = () => {
  const {data} = useAllJobsContext();
  const {jobs} = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <p>No jobs to display...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id.toString()} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
