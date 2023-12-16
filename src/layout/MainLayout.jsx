import React from 'react';
import { Outlet } from 'react-router-dom';
import NavDrawer from '../shared/NavDrawer';

const MainLayout = () => {
      return (
            <div>
                  <NavDrawer></NavDrawer>
                  
            </div>
      );
};

export default MainLayout;