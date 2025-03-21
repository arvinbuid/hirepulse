import {FormRow, FormRowSelect, SubmitBtn} from "../components";
import {useOutletContext} from "react-router-dom";
import {Form} from "react-router-dom";
import {User} from "../types";
import {JOB_STATUS, JOB_TYPE} from "../../../utils/constants";

import Wrapper from "../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const user = useOutletContext<User>();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            labelText='Position'
            defaultValue='Software Engineer'
          />
          <FormRow type='text' name='company' labelText='Company' defaultValue='Accenture' />
          <FormRow
            type='text'
            name='jobLocation'
            labelText='Job Location'
            defaultValue={user.location}
          />
          <FormRowSelect
            name='jobStatus'
            labelText='Job Status'
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.PENDING}
          />
          <FormRowSelect
            name='jobType'
            labelText='Job Type'
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
