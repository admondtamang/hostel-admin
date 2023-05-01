import React from 'react';

import moment from 'moment';
import { Link } from 'react-router-dom';

import DocumentTextIcon from '@atoms/icons/Document-Text-Icon';
import OfficeBuildingIcon from '@atoms/icons/Office-Building-Icon';
import DocumentTextIconWithToolTip from './DocumentTextIconWithToolTip';
import { ICompanyJob } from '@particles/responseInterface/company/companyjobs.interface';

export const companyNavigation = [
  {
    title: 'Companies',
    link: '/dashboard/companies/',
  },
  {
    title: 'Jobs',
    link: '/dashboard/companies/posted-jobs/',
  },
];

export const navigate = ['All', 'Active', 'Draft'];

const skills = ['Python', 'Laravel', 'JavaScript', 'C', 'C++', 'HTML'];

export const content = [
  [
    '1',
    <div key={`content-1`} className="flex flex-col gap-1 px-6">
      <p className="text-tableTitle text-neutral-900">React Js Developer</p>
      <p className="text-caption2 text-link">(23 vetted candidates)</p>
    </div>,
    'Senior',
    'Oct 07, 2022',
    <div className="flex flex-wrap gap-[6px] max-w-[250px]" key={`skills-1`}>
      {skills.length <= 5 ? (
        skills.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
          >
            {value}
          </div>
        ))
      ) : (
        <>
          {skills.slice(0, 5).map((value, index) => (
            <div
              key={`${value}-${index}`}
              className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
            >
              {value}
            </div>
          ))}
          <div className="px-2 py-1 rounded-lg text-neutral-600 border border-neutral-400 bg-neutral-200">
            + {skills.length - 5}
          </div>
        </>
      )}
    </div>,
    '$65,000',
    <div
      key={`active-1`}
      className="rounded-lg border bg-status-active-background border-status-active-border px-[12px] py-[6px]"
    >
      <span className="text-green-highlight">&#9679;</span> Active <span className="text-neutral-600">&#9662;</span>
    </div>,
    [{ icon: DocumentTextIcon, link: '/' }],
  ],
  [
    '2',
    <div key={`content-2`} className="flex flex-col gap-1 px-6">
      <p className="text-tableTitle text-neutral-900">React Js Developer</p>
      <p className="text-caption2 text-link">(23 vetted candidates)</p>
    </div>,
    'Senior',
    'Oct 07, 2022',
    <div className="flex flex-wrap gap-[6px] max-w-[250px]" key={`skills-2`}>
      {skills.length <= 5 ? (
        skills.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
          >
            {value}
          </div>
        ))
      ) : (
        <>
          {skills.slice(0, 5).map((value, index) => (
            <div
              key={`${value}-${index}`}
              className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
            >
              {value}
            </div>
          ))}
          <div className="px-2 py-1 rounded-lg text-neutral-600 border border-neutral-400 bg-neutral-200">
            + {skills.length - 5}
          </div>
        </>
      )}
    </div>,
    '$65,000',
    <div
      key={`closed-2`}
      className="rounded-lg border bg-neutral-200 border-neutral-500 px-[12px] py-[6px] text-neutral-700"
    >
      <span className="text-neutral-500">&#9679;</span> Closed <span className="text-neutral-600">&#9662;</span>
    </div>,
    [{ icon: DocumentTextIcon, link: '/' }],
  ],
];

export const heading = ['Job Title', 'Level', 'Date Posted', 'Skills', 'Budget', 'Status', 'Recommend CV'];

export const formatPostedJobsContent = (data: ICompanyJob[], isLoading?: boolean) => {
  return isLoading
    ? []
    : data.map((row: ICompanyJob, index) => {
        const newURL = new URLSearchParams(location.search);

        newURL.append('jobType', row.title);
        newURL.append('jobId', row._id);

        return [
          <div key={`index-${row._id}`}>{index + 1}</div>,
          <div key={`content-${row._id}`} className="flex flex-col gap-1 px-6">
            <Link to={`/dashboard/companies/job-details/${row._id}`} className="text-tableTitle text-link">
              {row.title}
            </Link>
            {/* for future use */}
            {/* <p className="text-caption2 text-link">(23 vetted candidates)</p> */}
          </div>,
          <p key={`pos-${row._id}`}>{row.level}</p>,
          <p key={`created-at-${row._id}`}>{moment(row.createdAt).format('LL')}</p>,
          <div className="flex flex-wrap gap-[6px] max-w-[250px]" key={`skills-${row._id}`}>
            {row?.skills.length <= 5 ? (
              row?.skills.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
                >
                  {value.title}
                </div>
              ))
            ) : (
              <>
                {skills.slice(0, 5).map((value: any, index) => (
                  <div
                    key={`${value.title}-${index}`}
                    className="px-2 py-1 rounded-lg text-link border border-skill-border bg-skill-background"
                  >
                    {value?.title}
                  </div>
                ))}
                <div className="px-2 py-1 rounded-lg text-neutral-600 border border-neutral-400 bg-neutral-200">
                  + {skills.length - 5}
                </div>
              </>
            )}
          </div>,
          <p key={`salary-${row._id}`}>{'Rs ' + row.salaryRange.maxSalary}</p>,
          row.jobStatus === 'active' ? (
            <div
              key={`active-${row._id}`}
              className="rounded-lg border bg-status-active-background border-status-active-border px-[12px] py-[6px]"
            >
              <span className="text-green-highlight">&#9679;</span> {row.jobStatus}{' '}
              <span className="text-neutral-600">&#9662;</span>
            </div>
          ) : (
            <div
              key={`closed-${row._id}`}
              className="rounded-lg border bg-neutral-200 border-neutral-500 px-[12px] py-[6px] text-neutral-700"
            >
              <span className="text-neutral-500">&#9679;</span> {row.jobStatus}{' '}
              <span className="text-neutral-600">&#9662;</span>
            </div>
          ),
          <div key={`recommendCV-${row._id}`}>
            {row.jobStatus === 'active' && (
              <Link to={{ pathname: `/dashboard/companies/recommend-cv/`, search: newURL.toString() }}>
                <DocumentTextIconWithToolTip />
              </Link>
            )}
          </div>,
          [],
        ];
      });
};
