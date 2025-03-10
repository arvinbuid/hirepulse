import {FaUserCircle, FaCaretDown} from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import {useState} from "react";
import {useDashboardContext} from "../hooks/useDashboardContext";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const {user, logoutUser} = useDashboardContext();
  return (
    <Wrapper>
      <div className='btn logout-btn' onClick={() => setShowLogout(!showLogout)}>
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type='button' className='dropdown-btn' onClick={logoutUser}>
            logout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
