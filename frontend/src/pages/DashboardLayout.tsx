import {Outlet} from "react-router-dom";
import {BigSidebar, Navbar, SmallSidebar} from "../components";
import {DashboardProvider} from "../contexts/DashboardContext";

import Wrapper from "../assets/wrappers/Dashboard";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};

export default DashboardLayout;
