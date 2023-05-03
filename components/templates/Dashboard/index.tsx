import React, { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';

import BodyLayout from '@organisms/Dashboard/Body-Layout';
import NavigationSection from '@organisms/Dashboard/Navigation';

import { sideBarContent } from '@particles/const/sideBarContent';

const DashBoardTemplate: React.FC = () => {
  const location = useLocation();
  const [, , page, subPage] = location.pathname.split('/');
  const [user, setUser] = useState<any>();

  return (
    <main className="min-h-screen bg-background-color">
      <NavigationSection />
      <BodyLayout content={sideBarContent} active={{ page: page, subPage: subPage }}>
        <Outlet />
      </BodyLayout>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default DashBoardTemplate;
