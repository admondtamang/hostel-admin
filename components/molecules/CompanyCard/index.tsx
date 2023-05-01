import React from 'react';

import clsx from 'clsx';

import Button from '@atoms/buttons';
import OfficeBuildingIcon from '@atoms/icons/Office-Building-Icon';

import { useNavigateParams } from '@particles/hooks/useNaviagtionParams';
import CompanyCardCSS from '@particles/css/company/companyCard.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ICompanyCard {
  image?: string;
  name: string;
  location: string;
  industry: string;
  jobs: string;
  companySize: string;
  detail: string;
  id: string;
}

const CompanyCard: React.FC<ICompanyCard> = ({ id, image, name, location, industry, jobs, companySize, detail }) => {
  const navigate = useNavigate();
  const locationVal = useLocation();

  return (
    <Link to={`/dashboard/companies/company-details/${id}/`}>
      <article className="shadow-card rounded-lg bg-white">
        <div className={clsx('w-full p-6 flex items-center justify-between', CompanyCardCSS.borderBottom)}>
          <div className="flex items-center gap-4">
            <div className={clsx(CompanyCardCSS.flexCenter, 'overflow-hidden w-20 h-20 rounded-full bg-neutral-300')}>
              {image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <OfficeBuildingIcon className="w-8 h-8 text-neutral-700" />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h5 className={CompanyCardCSS.companyName}>{name}</h5>
              <p className={CompanyCardCSS.companyLocation}>{location}</p>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();

              const newSearchParams = new URLSearchParams();

              // set the new value for the 'pageNo' parameter
              newSearchParams.set('companyId', id);
              newSearchParams.set('companyName', name);
              navigate({
                pathname: '/dashboard/companies/posted-jobs/',
                search: newSearchParams.toString(),
              });
            }}
            className={CompanyCardCSS.companyBtn}
          >
            View Jobs
          </Button>
        </div>
        <div className={clsx('px-6 py-4 flex justify-between', CompanyCardCSS.borderBottom)}>
          <div className={CompanyCardCSS.detailsContainer}>
            <p className={CompanyCardCSS.detailsTitle}>Industry</p>
            <p className={CompanyCardCSS.details}>{industry}</p>
          </div>
          <div className={CompanyCardCSS.detailsContainer}>
            <p className={CompanyCardCSS.detailsTitle}>Jobs</p>
            <p className={CompanyCardCSS.details}>{jobs}</p>
          </div>
          <div className={CompanyCardCSS.detailsContainer}>
            <p className={CompanyCardCSS.detailsTitle}>Company Size</p>
            <p className={CompanyCardCSS.details}>{`${companySize} employees`}</p>
          </div>
        </div>
        <div className="px-6 py-4">
          <p className={CompanyCardCSS.companyDetails}>{detail}</p>
        </div>
      </article>
    </Link>
  );
};

export default CompanyCard;
