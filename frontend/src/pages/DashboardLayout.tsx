import {Outlet, useLoaderData} from "react-router-dom";
import {BigSidebar, Navbar, SmallSidebar} from "../components";
import {DashboardProvider} from "../contexts/DashboardContext";
import {User} from "../types";

import Wrapper from "../assets/wrappers/Dashboard";

const DashboardLayout = () => {
  const {user} = useLoaderData() as {user: User};

  return (
    <DashboardProvider currentUser={user}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};

export default DashboardLayout;
