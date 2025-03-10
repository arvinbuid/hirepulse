import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs";
import {useDashboardContext} from "../hooks/useDashboardContext";

import Wrapper from "../assets/wrappers/ThemeToggle";

const ThemeToggle = () => {
  const {isDarkTheme, toggleDarkTheme} = useDashboardContext();

  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill className='toggle-icon' />
      )}
    </Wrapper>
  );
};

export default ThemeToggle;
