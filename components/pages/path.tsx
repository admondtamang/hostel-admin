import React from 'react';

import { Outlet } from 'react-router-dom';

import AuthSec from '@molecules/AuthSec';
import SEO from '@organisms/Dashboard/SEO';
import AdminLogin from '@templates/Admin-Login';
import NotFoundPage from '@organisms/ErrorPage';
import JobDetails from '@organisms/Job-Details';
import LoginForm from '@organisms/Admin-Login/Login';
import DashBoardTemplate from '@templates/Dashboard';
import DashboardHome from '@organisms/Dashboard/Home';
import EditSEO from '@organisms/Dashboard/SEO/EditSEO';
import DashboardUsers from '@organisms/Dashboard/Users';
import EmptyContainer from '@organisms/Empty-Container';
import BlogsPost from '@organisms/Dashboard/Blogs/Posts';
import BlogMedia from '@organisms/Dashboard/Blogs/Media';
import BlogBuilderTemplate from '@templates/BlogBuilder';
import AddNewSEO from '@organisms/Dashboard/SEO/AddNewSEO';
import BlogBuilderJobPreview from '@templates/Job-Preview';
import DashboardCompany from '@organisms/Dashboard/Company';
import BlogOverview from '@organisms/Dashboard/Blogs/Overview';
import PostedJobs from '@organisms/Dashboard/Company/PostedJobs';
import BlogCategories from '@organisms/Dashboard/Blogs/Categories';
import RecommendCV from '@organisms/Dashboard/Company/RecommendCV';
import PostComment from '@organisms/Dashboard/Blogs/Posts/comment';
import ResetPasswordForm from '@organisms/Admin-Login/ResetPassword';
import AccountSetting from '@organisms/Dashboard/Home/AccountSetting';
import VettedCandidates from '@organisms/Dashboard/Vetted-Candidates';
import CompanyDetails from '@organisms/Dashboard/Company/CompanyDetails';
import ForgotPasswordForm from '@organisms/Admin-Login/RequestResetPassword';
import EditCategory from '@organisms/Dashboard/Blogs/Categories/editCategory';
import RolesAndPermissions from '@organisms/Dashboard/Users/RolesAndPermissions';
import AddNewCategories from '@organisms/Dashboard/Blogs/Categories/addNewCategory';
import CandidateDetails from '@organisms/Dashboard/Vetted-Candidates/Candidate-Details';
import MediaAttachmentDetails from '@organisms/Dashboard/Blogs/Media/AttachmentDetails';
import AddNewVettedCandidates from '@organisms/Dashboard/Vetted-Candidates/Add-New-Vetted-Candidates';
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
      {
        path: 'seo',
        element: <Outlet />,
        children: [
          { path: '', element: <SEO /> },
          { path: 'add-new-seo', element: <AddNewSEO /> },
          { path: ':id', element: <EditSEO /> },
        ],
      },
      {
        path: 'companies',
        element: <Outlet />,
        children: [
          { path: '', element: <DashboardCompany /> },
          { path: 'posted-jobs', element: <PostedJobs /> },
          { path: 'recommend-cv', element: <RecommendCV /> },
          { path: 'company-details/:id', element: <CompanyDetails /> },
          { path: 'job-details/:id', element: <JobDetails /> },
        ],
      },
      {
        path: 'candidates',
        element: <Outlet />,
        children: [
          { path: '', element: <VettedCandidates /> },
          { path: 'add-new', element: <AddNewVettedCandidates /> },
          { path: 'user-details/:id', element: <CandidateDetails /> },
        ],
      },
    ],
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
];
