import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '@atoms/icons/Arrow-Left-Icon';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';

import FetchWrapper from '@molecules/FetchWrapper';
import CandidateCards from '@molecules/CandidateCard';
import TableFooter from '@organisms/Dashboard/TableContent/TableFooter';
import TableHeadContent from '@organisms/Dashboard/TableContent/TableHeadContent';

import { toast } from 'react-toastify';
import { companyNavigation, navigate, tempValue } from './const';
import useFetchCompanyJobsAppliedList from '@particles/hooks/dashboard/company/useFetchAppliedCandidates';
import useMutationRecommendCandidate from '@particles/hooks/dashboard/company/useMutationRecommendCandidate';

const RecommendCV: React.FC = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const jobType = queryParams.get('jobType');
  const content = queryParams.get('content');
  const jobId = queryParams.get('jobId') || '';
  const recommendCandiate = useMutationRecommendCandidate();

  const {
    data: applicants,
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = useFetchCompanyJobsAppliedList(jobId ? jobId : '');

  const handleRecommended = async (userId: string) => {
    recommendCandiate.mutate(
      { user: userId, job: jobId },
      {
        onSuccess: (data) => {
          refetch();
          toast.success(data?.message || 'Recommended success');
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || '', {
            position: 'top-right',
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });
        },
      },
    );
  };

  let values = tempValue;

  if (content === 'recommended') {
    values = applicants?.data?.map((value: any, index: number) => {
      let skills = value?.profile?.skills;
      skills = Array.isArray(skills) ? skills.map((row) => row?.title) : [];

      return {
        id: index,
        name: value?.user?.fullName,
        position: value?.userProfile?.profile?.roleDescription,
        image: value?.user?.photo?.completedUrl,
        skills,
        activeButton: false,
        status: value?.applicationStatus,
        viewedProfile: value.viewedprofile,
      };
    });
  } else {
    values = applicants?.data?.map((value: any) => {
      let skills = value?.profile?.skills;
      skills = Array.isArray(skills) ? skills.map((row) => row?.title) : [];

      return {
        id: value?.user?._id,
        name: value?.user?.fullName || value?.user?.firstName, // remove first name if fullName is available
        position: value?.profile?.roleDescription,
        image: value?.user?.photo?.completedUrl,
        skills,
        status: value?.applicationStatus,
        activeButton: !value?.isAlreadyApplied,
      };
    });
  }

  return (
    <main className="px-10 py-4">
      <BlogsNavigation content={companyNavigation} />
      {/* Temporaryly removed */}
      {/* <div
        className="w-8 h-8 flex justify-center items-center border border-neutral-900 rounded-full mt-10 cursor-pointer"
        onClick={() => navigation(-1)}
      >
        <ArrowLeftIcon />
      </div> */}
      <section className="mt-6">
        <h3 className="text-h3 text-neutral-900">Vetted candidates for ‘{jobType}’</h3>
      </section>
      <div className="w-full mt-8">
        <TableHeadContent content={navigate} exportActive={false} />
      </div>
      <FetchWrapper isLoading={isRefetching || isLoading} isError={isError} totalData={applicants?.totalData}>
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
          {values &&
            values.map((value: any, index) => (
              <CandidateCards
                key={`candidate-cards-${index}`}
                handleConfirm={() => handleRecommended(value.id)}
                name={value.name}
                position={value.position}
                skills={value.skills}
                activeButton={value.activeButton}
                image={value.image}
                showButton={true}
                status={value.status}
                viewedProfile={value.viewedProfile}
              />
            ))}
        </section>
        {/* Temporarily removed */}
        {content === 'recommended' ? null : <TableFooter totalPage={applicants?.totalPage} />}
      </FetchWrapper>
    </main>
  );
};

export default RecommendCV;
