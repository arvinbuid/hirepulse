import {Form, Link} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo, SubmitBtn} from "../components";

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email' defaultValue='johndoe@example.io' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='123456' />
        <SubmitBtn />
        <button type='button' className='btn btn-block'>
          Explore the App
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
