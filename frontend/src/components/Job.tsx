import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from "react-icons/fa";
import {Link, Form, useOutletContext} from "react-router-dom";
import {User, type Job} from "../types";

import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import {toast} from "react-toastify";

const Job = ({_id, position, company, jobStatus, jobType, jobLocation, createdAt}: Job) => {
  const date = day(createdAt).format("MMM D[th], YYYY");
  const {user} = useOutletContext() as {user: User};

  const handleDelete = (e: React.FormEvent) => {
    if (user.email === "demouser@example.io") {
      e.preventDefault();
      toast.error("Demo User. Read Only!");
      return;
    }
  };

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className='actions'>
          <Link to={`/dashboard/edit-job/${_id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`../delete-job/${_id}`} onClick={handleDelete}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
