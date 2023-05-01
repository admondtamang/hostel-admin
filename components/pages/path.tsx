import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthSec from '@molecules/AuthSec';
import AdminLogin from '@templates/Admin-Login';
import NotFoundPage from '@organisms/ErrorPage';
import LoginForm from '@organisms/Admin-Login/Login';
import DashBoardTemplate from '@templates/Dashboard';
import DashboardHome from '@organisms/Dashboard/Home';
import DashboardUsers from '@organisms/Dashboard/Users';
import ResetPasswordForm from '@organisms/Admin-Login/ResetPassword';
import AccountSetting from '@organisms/Dashboard/Home/AccountSetting';
import ForgotPasswordForm from '@organisms/Admin-Login/RequestResetPassword';
import RolesAndPermissions from '@organisms/Dashboard/Users/RolesAndPermissions';

// This contains all of the path of the application according to react-router-dom
export const path = [
  {
    path: '/',
    element: <AdminLogin />,
    children: [
      {
        path: '/',
        element: <LoginForm />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordForm />,
      },
      {
        path: '/reset-password/:token',
        element: <ResetPasswordForm />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <AuthSec>
        <DashBoardTemplate />
      </AuthSec>
    ),
    children: [
      {
        path: 'home',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <DashboardHome />,
          },
          {
            path: 'account-setting',
            element: <AccountSetting />,
          },
        ],
      },

      {
        path: 'users',
        element: <Outlet />,
        children: [
          { path: 'users-details', element: <DashboardUsers /> },
          { path: 'roles-and-permissions', element: <RolesAndPermissions /> },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
];
