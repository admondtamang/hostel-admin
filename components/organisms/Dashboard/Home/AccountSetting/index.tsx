import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import React from 'react';

import AdminSetting from './AdminSetting';

import { AccountSettingBreadCrumb } from '@particles/const/blogs/home/const';

const AccountSetting: React.FC = () => {
  return (
    <section className="px-10 py-4">
      <BlogsNavigation content={AccountSettingBreadCrumb} />
      <div className="mt-10">
        <AdminSetting />
      </div>
    </section>
  );
};

export default AccountSetting;
