import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/Authcontexts";

const NavDrawer = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className="relative">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden absolute top-1 right-0"
          >
            ==
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li >
              <Link to='/'>Home  </Link>
            </li>
            <li >
              <Link to='/bookings'>Booking ticket </Link>
            </li>
            <li>
              user: {user?user.displayName:''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavDrawer;
