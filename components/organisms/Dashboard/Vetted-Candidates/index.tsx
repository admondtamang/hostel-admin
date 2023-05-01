import clsx from 'clsx';
import React from 'react';
import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import { navigate as content } from './const';
import SearchIcon from '@atoms/icons/Search-Icon';
import FetchWrapper from '@molecules/FetchWrapper';
import CandidateCards from '@molecules/CandidateCard';
import TableFooter from '../TableContent/TableFooter';
import useGetParams from '@particles/hooks/usetGetParams';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import { EBIconPlacing, EButtonType } from '@atoms/buttons/button.types';
import VettedCandidatesCSS from '@particles/css/vetted-candidates/vetted.module.css';
import useFetchVettedList from '@particles/hooks/dashboard/vetted/useFetchVettedList';

const VettedCandidates: React.FC = () => {
  const navigate = useNavigate();

  const queryContent = useGetParams('content');
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: vettedList, isLoading, isError } = useFetchVettedList();

  const handleSearch = (e: any) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(location.search);

    // set the new value for the 'pageNo' parameter
    newSearchParams.set('search', e.target.value);
    newSearchParams.set('pageNo', '1');

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });
  };

  return (
    <main className="p-10">
      <section className={VettedCandidatesCSS.headingSection}>
        <article className="flex flex-col gap-2">
          <h3 className={VettedCandidatesCSS.vettedHead}>Candidates</h3>
          <p className={VettedCandidatesCSS.vettedDescription}>Browse through some of the candidates</p>
        </article>
      </section>
      <div className="flex gap-4 mt-8">
        <div className="min-w-max max-w-fit flex">
          {content.map((value, index) => (
            <div
              className={clsx(
                'px-4 py-[10px] border border-neutral-300 cursor-pointer hover:bg-neutral-100',
                index === 0 && 'rounded-l',
                index === content.length - 1 && 'rounded-r',
                value.toLowerCase() === queryContent || (!queryContent && value.toLowerCase() === 'all')
                  ? 'bg-neutral-200 text-neutral-900'
                  : 'text-neutral-600',
              )}
              onClick={(e) => {
                e.preventDefault();

                const newSearchParams = new URLSearchParams(location.search);

                newSearchParams.set('content', value.toLowerCase());
                newSearchParams.set('pageNo', '1');

                navigate({
                  pathname: location.pathname,
                  search: newSearchParams.toString(),
                });

                window.location.reload();
              }}
              key={value}
            >
              <span>{value}</span>
            </div>
          ))}
        </div>
        <Inputs
          className="w-full"
          onChange={handleSearch}
          value={searchParams.get('search') || ''}
          placeholder="Enter keyword to search"
          Icon={SearchIcon}
          IconClass="w-[18px] h-[18px] text-neutral-500"
        />
        <Button
          Icon={StaticPlusIcon}
          iconPlace={EBIconPlacing.left}
          className="gap-2 min-w-[110px] h-[42px]"
          onClick={() => navigate('/dashboard/candidates/add-new')}
        >
          Add New
        </Button>
      </div>

      <FetchWrapper isError={isError} isLoading={isLoading} totalData={vettedList?.totalData}>
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {vettedList?.data.map((value: any, index: number) => {
            let skills = value?.profile?.skills;
            skills = Array.isArray(skills) ? skills.map((row) => row?.title) : [];

            return (
              <CandidateCards
                key={`candidate-cards-${index}`}
                id={value?.user?._id}
                name={value?.user?.fullName || value?.user?.firstName}
                position={value?.profile?.roleDescription}
                skills={skills}
                image={value?.user?.photo?.completedUrl}
                email={value?.user?.email}
                showButton={false}
                isVetted={value?.isVetted}
                addDeleteButton={true}
              />
            );
          })}
        </section>
        <TableFooter totalPage={vettedList?.totalPage} />
      </FetchWrapper>
    </main>
  );
};

export default VettedCandidates;
