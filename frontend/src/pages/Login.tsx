import {Form, Link, useNavigate} from "react-router-dom";
import {FormRow, Logo, SubmitBtn} from "../components";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";

const Login = () => {
  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      email: "demouser@example.io",
      password: "123456",
    };

    try {
      await customFetch.post("/auth/login", data);
      toast.success("Take a test drive!");
      navigate("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{message: string}>;
      toast.error(axiosError.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' labelText='Email' />
        <FormRow type='password' name='password' labelText='Password' />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
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
