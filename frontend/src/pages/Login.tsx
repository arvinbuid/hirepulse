import {Form, Link, useNavigation} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import {FormRow, Logo} from "../components";

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email' defaultValue='john@example.io' />
        <FormRow type='password' name='password' labelText='Password' defaultValue='123456' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? "logging in..." : "login"}
        </button>
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
