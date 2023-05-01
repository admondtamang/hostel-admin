import React from 'react';

import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';

import Chip from '@atoms/chip';
import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';
import useGetJobDetailsById from '@particles/hooks/users/userGetJobDetailsById';

import JobDetailsCSS from '@particles/css/company/jobDetails.module.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: jobDetails } = useGetJobDetailsById(id || '');

  const jobTypes = jobDetails?.data?.jobTypes?.map((jobType) => jobType.title).join(',');

  return (
    <main className="py-6 px-6">
      <div className="w-full flex justify-between">
        <h3 className="text-h3 text-neutral-900">
          Job Details for {`"${jobDetails?.data?.title}"`} posted by {jobDetails?.data?.company?.companyName}
        </h3>
        <Button btnType={EButtonType.outline} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
      <div className="mt-14 grid grid-cols-3 gap-8 pb-5">
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Type of job</h4>
          <div className="text-body2 text-neutral-600">{jobTypes}</div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Level looking for</h4>
          <div className="text-body2 text-neutral-600">{jobDetails?.data?.level}</div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Primary Skills</h4>
          <div className="text-body2 text-neutral-600 flex gap-4 flex-wrap">
            {jobDetails?.data?.skills.map((skill, index) => (
              <Chip text={skill.title} key={`primary-skills-${index}`} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Secondary Skills</h4>
          <div className="text-body2 text-neutral-600 flex gap-4 flex-wrap">
            {jobDetails?.data?.secondarySkills?.map((skill, index) => (
              <Chip text={skill.title} key={`secondarySkills-skills-${index}`} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Salary Range</h4>
          <div className="text-body2 text-neutral-600 flex gap-4">{`${jobDetails?.data?.salaryRange?.currency} ${jobDetails?.data?.salaryRange?.minSalary} - ${jobDetails?.data?.salaryRange?.maxSalary} ${jobDetails?.data?.salaryRange?.salaryType}`}</div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Location</h4>
          <div className="text-body2 text-neutral-600 flex gap-4">{`${jobDetails?.data?.location}`}</div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Remote Culture</h4>
          <div className="text-body2 text-neutral-600 flex gap-4">{`${jobDetails?.data?.remoteCulture}`}</div>
        </section>
        <section className="flex flex-col gap-2">
          <h4 className="text-h4 text-neutral-700">Work Experience</h4>
          <div className="text-body2 text-neutral-600 flex gap-4">{`${jobDetails?.data?.workExperience}`}</div>
        </section>
      </div>

      <section className="flex flex-col gap-2 pt-5 border-t border-t-dash-line">
        <h4 className="text-h4 text-neutral-700">Job Description</h4>
        <div
          className={clsx('text-body2 text-neutral-600', JobDetailsCSS.jobDetails)}
          dangerouslySetInnerHTML={{ __html: jobDetails?.data?.jobDescription || '' }}
        ></div>
      </section>
    </main>
  );
};

export default JobDetails;
