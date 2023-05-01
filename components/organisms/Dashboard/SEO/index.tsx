import React from 'react';

import { useNavigate } from 'react-router-dom';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import SearchIcon from '@atoms/icons/Search-Icon';
import SliderIcon from '@atoms/icons/Slider-Icon';
import FetchWrapper from '@molecules/FetchWrapper';
import TableFooter from '../TableContent/TableFooter';
import ReactSelect from '@atoms/react-select/ReactSelect';
import TableContentBody from '../TableContent/TableContentBody';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';

import useFetchSeo from '@particles/hooks/dashboard/seo/useFetchSeo';
import { EBIconPlacing, EButtonType } from '@atoms/buttons/button.types';
import { formatBlogsContent, pageType, SEOHeading, SEOType } from './const';

import { TableControlType } from '../TableContent/TableContentBody/content.interface';
import useMutationDeleteSeoTemplate from '@particles/hooks/dashboard/seo/useMutationDeleteSeo';

const SEO: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = React.useState('');
  const [pageTypeValue, setPageType] = React.useState('Developers');
  const [SEOTypeValue, setSEOValue] = React.useState('Employee');

  const { data: seoList, isLoading, isError } = useFetchSeo();
  const { mutate: deleteSeo } = useMutationDeleteSeoTemplate();
  const content = formatBlogsContent(seoList?.data, deleteSeo, isLoading);

  React.useEffect(() => {
    const searchStatus = new URLSearchParams(location.search);

    searchStatus.set('search', search);

    navigate(
      {
        pathname: '.',
        search: searchStatus.toString(),
      },
      {
        replace: true,
      },
    );
  }, [search]);

  React.useEffect(() => {
    const pageType = new URLSearchParams(location.search);

    pageType.set('pageType', pageTypeValue);

    navigate(
      {
        pathname: '.',
        search: pageType.toString(),
      },
      {
        replace: true,
      },
    );
  }, [pageTypeValue]);

  React.useEffect(() => {
    const seoType = new URLSearchParams(location.search);

    seoType.set('seoType', SEOTypeValue);

    navigate(
      {
        pathname: '.',
        search: seoType.toString(),
      },
      {
        replace: true,
      },
    );
  }, [SEOTypeValue]);

  return (
    <main className="px-10 py-[38px]">
      <div className="w-full flex justify-between">
        <div className="flex gap-4">
          <h3 className="text-h3">SEO</h3>
          <ReactSelect
            value={SEOTypeValue}
            onValueChange={(value) => {
              setSEOValue(value as string);
            }}
            options={SEOType}
            isSearchable={false}
            downArrow={true}
            backgroundColor="#F1F1F1"
            border="0px"
          />
        </div>
        <Button
          Icon={StaticPlusIcon}
          iconPlace={EBIconPlacing.left}
          className="px-4 py-3"
          onClick={() => navigate('/dashboard/seo/add-new-seo/')}
        >
          Add New
        </Button>
      </div>
      <div className="mt-6 w-full bg-white rounded-lg shadow-card">
        <div className="p-6 flex justify-between">
          <div className="flex items-center">
            <p className="mr-4 text-bodysmall text-neutral-700">Page Type:</p>
            <ReactSelect
              value={pageTypeValue}
              onValueChange={(value) => {
                setPageType(value as string);
              }}
              options={pageType}
              isSearchable={false}
              downArrow={true}
            />
            <p className="ml-8 text-bodysmall text-neutral-700">
              Total Number: <span className="">{seoList?.totalData} </span>
            </p>
          </div>
          <div className="flex gap-4">
            <Inputs
              Icon={SearchIcon}
              IconClass="w-[18px] text-neutral-500"
              placeholder="Search SEO"
              className="w-[432px] placeholder:text-caption placeholder:text-neutral-500 text-neutral-900"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button btnType={EButtonType.outline} className="p-[11px]">
              <SliderIcon />
            </Button>
          </div>
        </div>
        <FetchWrapper isError={isError} isLoading={isLoading} totalData={seoList?.totalData}>
          <div className="mt-2">
            <TableContentBody
              heading={SEOHeading}
              includeId={false}
              content={content}
              tableControlType={TableControlType.button}
            />
          </div>
          <div className="py-8">
            <TableFooter totalPage={seoList?.totalPage} />
          </div>
        </FetchWrapper>
      </div>
    </main>
  );
};

export default SEO;
