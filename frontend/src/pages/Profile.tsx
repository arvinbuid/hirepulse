import {Form, useNavigation, useOutletContext} from "react-router-dom";
import {User} from "../types";

import Wrapper from "../assets/wrappers/DashboardFormPage";
import {FormRow} from "../components";
const Profile = () => {
  const {user} = useOutletContext() as {user: User};
  const {name, email, lastName, location} = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>
        <div className='form-center'>
          {/* File input */}
          <div className='form-row'>
            <label htmlFor='avatar' className='form-label'>
              Select an image file (max 0.5 MB)
            </label>
            <input type='file' name='avatar' id='avatar' className='form-input' accept='image/*' />
          </div>

          <FormRow type='text' name='name' labelText='Name' defaultValue={name} />
          <FormRow type='text' name='lastName' labelText='Last Name' defaultValue={lastName} />
          <FormRow type='email' name='email' labelText='Email' defaultValue={email} />
          <FormRow type='text' name='location' labelText='Location' defaultValue={location} />
          <button type='submit' className='btn form-btn' disabled={isSubmitting}>
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
