import {FormRow, FormRowSelect} from "../components";
import {useOutletContext} from "react-router-dom";
import {Form, useNavigation} from "react-router-dom";
import {User} from "../types";
import {JOB_STATUS, JOB_TYPE} from "../../../utils/constants";

import Wrapper from "../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const user = useOutletContext<User>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>Add Job</h4>
        <div className='form-center'>
          <FormRow type='text' name='position' labelText='Position' />
          <FormRow type='text' name='company' labelText='Company' />
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
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
