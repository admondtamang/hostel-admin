import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Switch from '@atoms/switch';
import { companyDetailsNav } from './const';
import UserIcon from '@atoms/icons/User-Icon';
import MailIcon from '@atoms/icons/Mail-Icon';
import PhoneIcon from '@atoms/icons/Phone-Icon';
import InnerPageHead from '@molecules/InnerPageHead';
import CalendarIcon from '@atoms/icons/Calendar-Icon';
import ConfimationModal from '@molecules/ConfimationModal';
import DocumentIcon from '@atoms/icons/Document-Search-Icon';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import useGetUserById from '@particles/hooks/users/userGetUserById';
import useGetCompanyById from '@particles/hooks/users/useGetCompanyById';
import useMutationChangeVettedStatus from '@particles/hooks/dashboard/vetted/useMutationChangeVettedStatus';
import GlobeAltIcon from '@atoms/icons/Globe-Alt-Icon';
import ExternalLinkIcon from '@atoms/icons/External-Link-Icon';

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetCompanyById(id || '');

  return (
    <main className="container mx-auto px-10 py-4">
      <BlogsNavigation content={companyDetailsNav(id || '')} />
      <InnerPageHead />
      <div className="flex gap-[30px] mt-10">
        <div className="w-8/12 shadow-card rounded-lg bg-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="min-w-[88px] min-h-[88px] w-[88px] h-[88px] rounded-full overflow-hidden flex justify-center items-center bg-neutral-300">
                {data?.data?.logo?.completedUrl ? <img src={data.data.logo.completedUrl} /> : <UserIcon />}
              </div>
              <div className="flex flex-col gap-1">
                <h5 className="text-h3 text-neutral-900">{data?.data?.companyName}</h5>
              </div>
            </div>
          </div>
          <div className="mt-6 border border-dash-color" />
          <div className="mt-6 grid">
            <section className="p-6 flex flex-col">
              <article className="w-full flex justify-between items-end">
                <h4 className="text-h4v2 text-neutral-900">About company</h4>
              </article>
              <div className="flex flex-col gap-4 text-tablet text-neutral-700 mt-6">
                <p className="break-words">{`${data && data?.data ? data?.data.reasonForChoosing : ''}`}</p>
                <p className="break-words">{data && data?.data ? data?.data.aboutYourProduct : ''}</p>
              </div>
            </section>
          </div>
          <div className="mt-6 border border-dash-color" />

          <div className="flex flex-col gap-10 mt-12">
            <div className="flex flex-wrap gap-4 flex-row justify-center items-end">
              <h4
                className="text-body1 flex gap-4 items-center text-link cursor-pointer"
                onClick={() => {
                  const newSearchParams = new URLSearchParams();

                  newSearchParams.set('companyId', id || '');
                  newSearchParams.set('companyName', data?.data?.companyName || '');
                  navigate({
                    pathname: '/dashboard/companies/posted-jobs/',
                    search: newSearchParams.toString(),
                  });
                }}
              >
                <ExternalLinkIcon className="w-8 h-8 text-link" /> Browse all jobs
              </h4>
            </div>
          </div>
        </div>
        <div className="w-4/12 shadow-card rounded-lg bg-white p-6 flex flex-col gap-6">
          <div className="rounded bg-white px-6 flex flex-col">
            <div className="flex flex-col gap-1 pt-6">
              <p className="text-h4v2 text-neutral-900">{data && data?.data && data?.data.location}</p>
              <div className="text-excerpt2 text-neutral-800">Location</div>
            </div>
            <div className="flex flex-col gap-1 pt-6">
              <p className="text-h4v2 text-neutral-900">{data && data?.data && data?.data.numberOfEmployees}</p>
              <div className="text-excerpt2 text-neutral-800">Company Size</div>
            </div>
            <div className="flex flex-col gap-1 py-6 border-b border-b-dash-line">
              <p className="text-h4v2 text-neutral-900">
                {data &&
                  data?.data &&
                  data?.data.market.map((data, index) => {
                    return (
                      <p key={index} className="font-medium text-neutral-900">
                        {data.title}{' '}
                      </p>
                    );
                  })}
              </p>
              <div className="text-excerpt2 text-neutral-800">Industry</div>
            </div>
            <div className="flex flex-col gap-1 py-6">
              {data && data?.data && data?.data.companyWebsite && (
                <div className="flex gap-3 items-center">
                  <div className="p-[12.5px] border border-link-border rounded-full bg-link-background">
                    <GlobeAltIcon className="w-5 h-5 text-link-icon" />
                  </div>
                  <Link to={data?.data?.companyWebsite}>
                    <a target="_blank" className="text-body3 text-neutral-700 cursor-pointer">
                      {data && data?.data && data?.data?.companyWebsite}
                    </a>
                  </Link>
                </div>
              )}
              {/* <div className="flex gap-3 items-center">
                <div className="p-[12.5px] border border-link-border rounded-full bg-link-background">
                  <CalendarIcon className="w-5 h-5 text-link-icon" />
                </div>
                Temporarily removed!
                <p className="text-body3 text-neutral-700 cursor-pointer">
                  Joined{' '}
                  <Moment format="MMM DD, YYYY">
                    {companyProfile && companyProfile?.data && companyProfile?.data.length > 0
                      ? companyProfile?.data[0].createdAt
                      : new Date()}
                  </Moment>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompanyDetails;
