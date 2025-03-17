import {Form, Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";

const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' labelText='First Name' defaultValue='John' />
        <FormRow type='text' name='lastName' labelText='Last Name' defaultValue='Doe' />
        <FormRow type='text' name='location' labelText='Location' defaultValue='Philippines' />
        <FormRow type='email' name='email' labelText='Email' defaultValue='johndoe@example.io' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='123456' />
        <button type='submit' className='btn btn-block'>
          Submit
        </button>
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
