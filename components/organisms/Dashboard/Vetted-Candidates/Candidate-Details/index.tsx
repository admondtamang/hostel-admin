import React, { useEffect } from 'react';

import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import Chip from '@atoms/chip';
import Switch from '@atoms/switch';
import { candidateDetails } from './const';
import UserIcon from '@atoms/icons/User-Icon';
import MailIcon from '@atoms/icons/Mail-Icon';
import PhoneIcon from '@atoms/icons/Phone-Icon';
import InnerPageHead from '@molecules/InnerPageHead';
import CalendarIcon from '@atoms/icons/Calendar-Icon';
import ConfimationModal from '@molecules/ConfimationModal';
import DocumentIcon from '@atoms/icons/Document-Search-Icon';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import useGetUserById from '@particles/hooks/users/userGetUserById';
import DocumentDownloadIcon from '@atoms/icons/DocumentDownload-Icon';
import useMutationChangeVettedStatus from '@particles/hooks/dashboard/vetted/useMutationChangeVettedStatus';

const CandidateDetails = () => {
  const { id } = useParams();

  const [toggle, setToggle] = React.useState(false);
  const [btnSwitch, setBtnSwitch] = React.useState<boolean>(false);

  const changeStatus = useMutationChangeVettedStatus();

  /**
   * It's a function that takes a boolean as an argument and returns a promise that changes the status
   * of the user
   * @param {boolean} status - boolean - The status of the switch.
   */
  const handleToogle = async (status: boolean) => {
    try {
      if (id) {
        await changeStatus(status, id.toString());

        setToggle((prevVal) => !prevVal);
        setBtnSwitch(false);
      }
    } catch (e) {
      toast('There was a problem updating the status. Please try again later!', { type: 'error' });
    }
  };

  if (id) {
    const { data } = useGetUserById(id);

    useEffect(() => {
      setToggle(!!data?.data.isVetted);
    }, [data]);

    return (
      <main className="container mx-auto px-10 py-4">
        <BlogsNavigation content={candidateDetails(id)} />
        <InnerPageHead />
        <div className="flex gap-[30px] mt-10">
          <div className="w-8/12 shadow-card rounded-lg bg-white p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="min-w-[72px] min-h-[72px] w-[72px] h-[72px] rounded-full overflow-hidden flex justify-center items-center bg-neutral-300">
                  {data?.data?.user?.photo?.completedUrl ? (
                    <img src={data?.data?.user?.photo?.completedUrl} />
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h5 className="text-h5 text-neutral-900">{data?.data?.user?.fullName}</h5>
                  <p className="text-excerpt2 text-neutral-800">{data?.data?.profile?.roleDescription}</p>
                </div>
              </div>
              <div className="flex mt-6 gap-4 items-center">
                <div className="flex gap-4 items-center">
                  <p className="text-body3 text-neutral-900">Download latest CV:</p>
                  <a
                    href={data?.data?.resume?.[data.data.resume.length - 1]?.completedUrl}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <DocumentDownloadIcon />
                  </a>
                </div>
                <p className="text-body3 text-neutral-900">Vetted Candidate:</p>
                <Switch
                  onClick={(e) => {
                    setBtnSwitch((prevValue) => !prevValue);
                  }}
                  defaultChecked={toggle}
                  checked={toggle}
                />
              </div>
              {btnSwitch && (
                <ConfimationModal
                  sentence={`Are you sure you want to ${toggle ? 'remove' : 'add'} %variable% ${
                    toggle ? 'from' : 'to'
                  } the vetted candidate pool?`}
                  name={data?.data.user.fullName || ''}
                  toggleModal={setBtnSwitch}
                  handleOk={() => handleToogle(!toggle)}
                  title={`${toggle ? 'Remove from' : 'Add to'} the vetted candidate pool?`}
                  buttonValue={`${toggle ? 'Remove' : 'Add'}`}
                />
              )}
            </div>
            <div className="mt-6 border border-dash-color" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <h5 className="text-h5 text-neutral-900">Skills</h5>
                <p className="text-excerpt2 text-neutral-700 flex gap-2 flex-wrap">
                  {data?.data?.profile?.skills?.map((skill, index) => (
                    <Chip text={skill.title} key={`skills-${index}`} />
                  ))}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-h5 text-neutral-900">Employment Status</h5>
                <p className="text-excerpt2 text-neutral-700">
                  {data?.data?.profile?.currentlyEmployed ? 'Is Employed!' : 'Isnot employed!'}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-h5 text-neutral-900">Current Role</h5>
                <p className="text-excerpt2 text-neutral-700">{data?.data?.profile?.roleDescription}</p>
              </div>
              <div className="flex flex-col gap-4">
                <h5 className="text-h5 text-neutral-900">Years of Experience</h5>
                <p className="text-excerpt2 text-neutral-700">{data?.data?.profile?.yearOfExperience}</p>
              </div>
            </div>
          </div>
          <div className="w-4/12 shadow-card rounded-lg bg-white p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="text-h4v2 text-neutral-900">
                NRS. {data?.data?.jobPreference?.desiredSalary || 'No Data'}
              </h4>
              <p className="text-excerpt2 text-neutral-800">Salary Expectation</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-h4v2 text-neutral-900">{data?.data?.jobPreference?.jobSearchStatus}</h4>
              <p className="text-excerpt2 text-neutral-800">Job Search Status</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-h4v2 text-neutral-900">{data?.data?.jobPreference?.intrestedJob}</h4>
              <p className="text-excerpt2 text-neutral-800">Interested Jobs</p>
            </div>
            <div className="border border-dash-color" />
            <div className="flex gap-4 items-center">
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-status-active-background border-status-active-border">
                <MailIcon className="w-5 h-5 text-green-highlight" />
              </div>
              <p className="text-neutral-700 text-body3">{data?.data.user.email}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <></>;
};

export default CandidateDetails;
