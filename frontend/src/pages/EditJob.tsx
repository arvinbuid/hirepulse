import {Form, useLoaderData} from "react-router-dom";
import {Job} from "../types";
import {JOB_STATUS, JOB_TYPE} from "../../../utils/constants";
import {FormRow, FormRowSelect, SubmitBtn} from "../components";

import Wrapper from "../assets/wrappers/DashboardFormPage";

const EditJob = () => {
  const {job} = useLoaderData() as {job: Job};

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Edit Job</h4>
        <div className='form-center'>
          <FormRow type='text' name='company' labelText='Company' defaultValue={job.company} />
          <FormRow type='text' name='position' labelText='Position' defaultValue={job.position} />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Job Location'
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='Job Status'
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name='jobType'
            labelText='Job Type'
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
