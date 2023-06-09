import React from 'react';

import { useNavigate } from 'react-router-dom';

import FetchWrapper from '@molecules/FetchWrapper';
import TableFooter from '../TableContent/TableFooter';
import TableContentBody from '../TableContent/TableContentBody';

import useFetchSeo from '@particles/hooks/dashboard/seo/useFetchSeo';
import { formatBlogsContent, SEOHeading, SEOContent, navigateContent } from './const';

import { TableControlType } from '../TableContent/TableContentBody/content.interface';
import useMutationDeleteSeoTemplate from '@particles/hooks/dashboard/seo/useMutationDeleteSeo';
import BlogsHeadAddNew from '@molecules/Blogs/BlogsHeadAddNew';
import TableContainer from '../TableContent/TableContainer';
import TableHeadContent from '../TableContent/TableHeadContent';

const SEO: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState(false);

  const { data: seoList, isLoading, isError } = useFetchSeo();
  const { mutate: deleteSeo } = useMutationDeleteSeoTemplate();
  const content = formatBlogsContent(seoList?.data, deleteSeo, isLoading);

  return (
    <main className="px-10 py-[38px]">
      <div className="mt-10">
        <BlogsHeadAddNew
          heading="Seo"
          buttonPlaceholder="Add New"
          onClick={() => navigate('/dashboard/seo/add-new-seo/')}
        />
      </div>
      <div className="mt-6">
        <TableContainer>
          <TableHeadContent content={navigateContent} setFilter={setFilter} inputPlaceholder="Search Users" />
          {/* <FetchWrapper isError={isError} isLoading={isLoading} totalData={seoList?.totalData}> */}
          <div className="mt-2">
            <TableContentBody
              heading={SEOHeading}
              includeId={false}
              content={SEOContent}
              tableControlType={TableControlType.button}
            />
          </div>
          <div className="py-8">
            <TableFooter totalPage={seoList?.totalPage} />
          </div>
          {/* </FetchWrapper> */}
        </TableContainer>
      </div>
    </main>
  );
};

export default SEO;
