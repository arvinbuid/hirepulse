import {FormRow} from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import {useOutletContext} from "react-router-dom";
import {Form, useNavigation} from "react-router-dom";
import {User} from "../types";

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
          <button type='submit' className='btn btn-block form-btn' disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
