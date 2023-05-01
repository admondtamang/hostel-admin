import React from 'react';

import { useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '@atoms/icons/Arrow-Left-Icon';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import TableContainer from '@organisms/Dashboard/TableContent/TableContainer';
import TableHeadContent from '@organisms/Dashboard/TableContent/TableHeadContent';
import TableContentBody from '@organisms/Dashboard/TableContent/TableContentBody';
import { TableControlType } from '@organisms/Dashboard/TableContent/TableContentBody/content.interface';

import FetchWrapper from '@molecules/FetchWrapper';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { companyNavigation, formatPostedJobsContent, heading, navigate } from './const';
import useFetchCompanyJobsList from '@particles/hooks/dashboard/company/useFetchCompanyJobsList';

const PostedJobs: React.FC = () => {
  const naviagte = useNavigate();
  const page = useCurrentPage();
  const companyId = useGetParams('companyId') || '';
  const companyName = useGetParams('companyName') || '';

  const { data: companyJobsList, isLoading, isError } = useFetchCompanyJobsList(page, companyId);

  const content = formatPostedJobsContent(companyJobsList?.data, isLoading);

  return (
    <main className="px-10 py-4">
      <BlogsNavigation content={companyNavigation} />
      {/* Temporaryly removed */}
      {/* <div
        onClick={() => naviagte(-1)}
        className="w-8 h-8 flex justify-center items-center border border-neutral-900 rounded-full mt-10 cursor-pointer"
      >
        <ArrowLeftIcon />
      </div> */}
      <section className="mt-6">
        <h3 className="text-h3 text-neutral-900">Jobs by ‘{companyName}’</h3>
      </section>
      <TableContainer>
        <TableHeadContent urlParams={{ companyId }} content={navigate} exportActive={false} />
        <FetchWrapper isLoading={isLoading} isError={isError} totalData={companyJobsList?.totalData}>
          <TableContentBody
            tableControlType={TableControlType.none}
            content={content}
            heading={heading}
            includeId={false}
          />
        </FetchWrapper>
        <TableFooter totalPage={companyJobsList?.totalPage} />
      </TableContainer>
    </main>
  );
};

export default PostedJobs;
