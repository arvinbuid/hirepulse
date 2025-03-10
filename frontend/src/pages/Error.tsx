import {Link, useRouteError} from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import NotFound from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={NotFound} alt='Not found' />
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page that you are looking for.</p>
          <Link to='/'>Back to Home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>Something went wrong.</h3>
    </Wrapper>
  );
};

export default Error;
