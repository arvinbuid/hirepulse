import {NavLink} from "react-router-dom";
import {useDashboardContext} from "../hooks/useDashboardContext";

import links from "../utils/links";

interface NavLinksProps {
  isBigSidebar?: boolean;
}

const NavLinks = ({isBigSidebar}: NavLinksProps) => {
  const {toggleSidebar} = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const {text, path, icon} = link;
        return (
          <NavLink
            to={path}
            key={text}
            className='nav-link'
            onClick={isBigSidebar ? undefined : toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
