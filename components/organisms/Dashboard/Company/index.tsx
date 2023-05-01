import React, { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useFormik } from 'formik';

import Button from '@atoms/buttons';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '@molecules/CompanyCard';
import SearchIcon from '@atoms/icons/Search-Icon';
import FetchWrapper from '@molecules/FetchWrapper';
import InputSection from '@molecules/inputSection';
import RefreshIcon from '@atoms/icons/Refresh-Icon';
import TableFooter from '../TableContent/TableFooter';
import { EButtonType } from '@atoms/buttons/button.types';
import useGetParams from '@particles/hooks/usetGetParams';
import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { JobPostedDateConst, numberOfEmployeesConst } from './const';
import useFetchCompanyList from '@particles/hooks/dashboard/company/useFetchCompanyList';

type Market = {
  title: string;
};

type Company = {
  _id: string;
  logo: any;
  location: string;
  companyName: string;
  numberOfEmployees: string;
  market: Market[];
  aboutYourProduct: string;
  jobs: string;
};

const DashboardCompany: React.FC = () => {
  const companyName = useGetParams('companyName') || '';

  const page = useCurrentPage();
  const navigator = useNavigate();
  const [dropDownOpen, setDropDownOpen] = useState({ companySize: false, jobDate: false });
  const [companySizeValue, setCompanySizeValue] = useState(useGetParams('companySize') || '');
  const [dateRange, setDateRange] = useState(useGetParams('jobDate') || '');

  const { data: companyList, isLoading, isError } = useFetchCompanyList(page);

  const formik = useFormik({
    initialValues: {
      search: useGetParams('search') || '',
    },
    onSubmit: (values) => {
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set('search', formik.values['search']);

      newSearchParams.set('pageNo', '1');

      navigator({
        pathname: location.pathname,
        search: newSearchParams.toString(),
      });
      return;
    },
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);

    newSearchParams.set('companySize', companySizeValue);
    newSearchParams.set('pageNo', '1');

    navigator({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });

    // On company Size value fetch request
    setDropDownOpen((prevVal) => ({ ...prevVal, companySize: false }));
  }, [companySizeValue]);

  useEffect(() => {
    // On company Size value fetch request
    const newSearchParams = new URLSearchParams(location.search);

    newSearchParams.set('jobDate', dateRange);
    newSearchParams.set('pageNo', '1');

    navigator({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });

    setDropDownOpen((prevVal) => ({ ...prevVal, jobDate: false }));
  }, [dateRange]);

  useEffect(() => {
    // On company Size value fetch request
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('search', formik.values['search']);
    newSearchParams.set('pageNo', '1');

    navigator({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });
  }, [formik.values['search']]);

  useEffect(() => {
    // On company Size value fetch request
  }, []);

  return (
    <main className="p-10">
      <section className="flex flex-col gap-2">
        <h3 className="text-h3 text-neutral-900">Companies</h3>
        <p className="text-excerpt2 text-neutral-700">Browse through some of the top hiring companies</p>
      </section>
      <section className="flex flex-col gap-4 mt-8 w-full">
        <form className="w-full flex gap-4">
          <InputSection
            Icon={SearchIcon}
            IconClass="w-[18px] h-[18px] text-neutral-500"
            containerClass="w-10/12"
            placeholder="Enter company name to search"
            value={formik.values['search']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="search"
          />
          <Button btnType={EButtonType.outline} type="submit" className="w-2/12">
            Search
          </Button>
        </form>
        <div className="flex gap-4 items-center">
          <div className="px-4 py-2 border border-neutral-300 rounded flex bg-neutral-100 relative">
            <div
              className="flex cursor-pointer"
              onClick={() => setDropDownOpen((prevVal) => ({ ...prevVal, companySize: !prevVal['companySize'] }))}
            >
              <p className="text-captionSpc text-neutral-800 pr-[12px] border-r border-r-neutral-300">Company size</p>
              <p className="text-captionSpcBold text-neutral-900 ml-[20px] flex gap-[8px]">
                {companySizeValue} <ChevonDownIcon className="w-[18px] h-[18px] rotate-180 text-neutral-500" />
              </p>
            </div>
            <div className="absolute w-full left-0 right-0 top-full z-10 bg-white">
              {dropDownOpen.companySize &&
                numberOfEmployeesConst.map((row) => (
                  <div
                    className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                    onClick={() => setCompanySizeValue(row.value)}
                  >
                    {row.label}
                  </div>
                ))}
            </div>
          </div>
          <div className="px-4 py-2 border border-neutral-300 rounded flex bg-neutral-100 relative">
            <div
              className="flex cursor-pointer"
              onClick={() => setDropDownOpen((prevVal) => ({ ...prevVal, jobDate: !prevVal['jobDate'] }))}
            >
              <p className="text-captionSpc text-neutral-800 pr-[12px] border-r border-r-neutral-300">
                Job posted date
              </p>
              <p className="text-captionSpcBold text-neutral-900 z-10 ml-[20px] flex gap-[8px]">
                {dateRange} <ChevonDownIcon className="w-[18px] h-[18px] rotate-180 text-neutral-500" />
              </p>
            </div>
            {dropDownOpen.jobDate && (
              <div className="absolute w-full left-0 right-0 top-full bg-white">
                <div
                  className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                  onClick={() => setDateRange('Any')}
                >
                  Any
                </div>
                <div
                  className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                  onClick={() => setDateRange(JobPostedDateConst.Today)}
                >
                  {JobPostedDateConst.Today}
                </div>
                <div
                  className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                  onClick={() => setDateRange(JobPostedDateConst.Last3days)}
                >
                  {JobPostedDateConst.Last3days}
                </div>
                <div
                  className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                  onClick={() => setDateRange(JobPostedDateConst.Last30days)}
                >
                  {JobPostedDateConst.Last30days}
                </div>
                <div
                  className="p-[12px] text-bodysmall text-neutral-900 hover:bg-primary-00 cursor-pointer"
                  onClick={() => setDateRange(JobPostedDateConst.Last3months)}
                >
                  {JobPostedDateConst.Last3months}
                </div>
              </div>
            )}
          </div>
          <div
            className="flex gap-[12px] ml-6 text-excerpt2Bold text-link cursor-pointer"
            onClick={() => {
              const newSearchParams = new URLSearchParams(location.search);

              newSearchParams.delete('jobDate');
              newSearchParams.delete('companySize');
              newSearchParams.delete('search');

              navigator({
                pathname: location.pathname,
                search: newSearchParams.toString(),
              });
              window.location.reload();
            }}
          >
            <RefreshIcon />
            Reset All
          </div>
        </div>
      </section>
      <FetchWrapper isLoading={isLoading} isError={isError} totalData={companyList?.totalData}>
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {companyList?.data &&
            Array.isArray(companyList?.data) &&
            companyList?.data?.map((value: Company, index: number) => (
              <CompanyCard
                key={`companyCard-${index}`}
                id={value?._id}
                image={value?.logo?.completedUrl}
                companySize={value?.numberOfEmployees || 'unknown'}
                detail={value?.aboutYourProduct}
                industry={value?.market[0]?.title || 'Random'}
                jobs={value.jobs || '0'}
                location={value.location}
                name={value?.companyName}
              />
            ))}
        </section>
        <section className="mt-8">
          <TableFooter totalPage={companyList?.totalPage} />
        </section>
      </FetchWrapper>
    </main>
  );
};

export default DashboardCompany;
