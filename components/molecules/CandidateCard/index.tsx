import React from 'react';

import clsx from 'clsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Chip from '@atoms/chip';
import Switch from '@atoms/switch';
import Button from '@atoms/buttons';
import StatusChip from '@atoms/statusChip';
import UserIcon from '@atoms/icons/User-Icon';
import CheckIcon from '@atoms/icons/Check-Icon';
import TrashIcon from '@atoms/icons/Trash-Icon';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import ConfimationModal from '@molecules/ConfimationModal';
import { EBIconPlacing, EButtonType } from '@atoms/buttons/button.types';

import CandidateCardCSS from '@particles/css/company/CandidateCard.module.css';
import useMutationChangeVettedStatus from '@particles/hooks/dashboard/vetted/useMutationChangeVettedStatus';
import EyeIcon from '@atoms/icons/Eye-Icon';

export enum ApplicantsStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}
interface ICandidateCards {
  showButton?: boolean;
  activeButton?: boolean;
  id?: string | number;
  name: string;
  image?: string;
  position: string;
  handleConfirm?: () => void;
  status?: ApplicantsStatus | undefined;
  skills: string[];
  isVetted?: boolean;
  addDeleteButton?: boolean;
  email?: string;
  viewedProfile?: string | undefined;
}

const CandidateCards: React.FC<ICandidateCards> = ({
  showButton = true,
  activeButton = true,
  isVetted = null,
  handleConfirm = () => {
    return;
  },
  name,
  image,
  position,
  skills,
  status,
  addDeleteButton,
  email,
  id,
  viewedProfile,
}) => {
  const [modal, setModal] = React.useState(false);
  const [toggle, setToggle] = React.useState(!!isVetted);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [btnSwitch, setBtnSwitch] = React.useState<boolean>(false);

  const changeStatus = useMutationChangeVettedStatus();

  const searchParams = new URLSearchParams(location.pathname);

  if (name && skills && position && email) {
    searchParams.append('name', name);
    searchParams.append('skills', JSON.stringify(skills));
    searchParams.append('position', JSON.stringify(position));
    searchParams.append('email', email);
  }

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

  React.useEffect(() => {
    setToggle(!!isVetted);
  }, [isVetted]);

  return (
    <section
      className={clsx(CandidateCardCSS.cardContainer, toggle && 'border border-default-notification-background')}
    >
      <div className="flex">
        <div className={CandidateCardCSS.imageContainer}>
          {image ? (
            <img src={image} alt={`${name}-profile-image`} className="w-full h-full object-cover" />
          ) : (
            <UserIcon />
          )}
        </div>
        <article className={CandidateCardCSS.candidateDetails}>
          <h5 className={CandidateCardCSS.candidateName}>{name}</h5>
          <p className={CandidateCardCSS.candidatePosition}>{position}</p>
          {showButton ? (
            <div className={CandidateCardCSS.candidateSkillsContainer}>
              {Array.from(Array(Math.min(2, skills.length)), (_, i) => skills[i]).map((skill, index) => (
                <Chip text={skill} key={`skills-${index}`} />
              ))}
              {skills.length > 2 && (
                <Link to={{ pathname: `/dashboard/candidates/user-details/${id}/` }}>
                  <Chip text={`+${skills.length - 2}`} primary={false} />
                </Link>
              )}
            </div>
          ) : (
            <div className={CandidateCardCSS.candidateSkillsContainer}>
              {Array.from(Array(Math.min(4, skills.length)), (_, i) => skills[i]).map((skill, index) => (
                <Chip text={skill} key={`skills-${index}`} />
              ))}
              {skills.length > 4 && (
                <Link to={{ pathname: `/dashboard/candidates/user-details/${id}/` }}>
                  <Chip text={`+${skills.length - 4}`} primary={false} />
                </Link>
              )}
            </div>
          )}
          {isVetted !== null && (
            <>
              <div className="flex mt-6 gap-4 items-center">
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
                  name={name}
                  toggleModal={setBtnSwitch}
                  handleOk={() => handleToogle(!toggle)}
                  title={`${toggle ? 'Remove from' : 'Add to'} the vetted candidate pool?`}
                  buttonValue={`${toggle ? 'Remove' : 'Add'}`}
                />
              )}
            </>
          )}
        </article>
      </div>
      {showButton && !status && (
        <>
          <Button
            className={clsx(
              'w-[140px] h-[40px]',
              activeButton ? CandidateCardCSS.activeButton : CandidateCardCSS.disableButton,
            )}
            Icon={!activeButton ? CheckIcon : undefined}
            iconPlace={EBIconPlacing.left}
            disabled={!activeButton}
            btnType={activeButton ? EButtonType.primary : EButtonType.none}
            onClick={() => setModal(true)}
          >
            Recommend CV
          </Button>
          {modal && (
            <ConfimationModal
              sentence="Are you sure you want to recommend the resume of %variable% to the %variable% ?"
              name={name}
              handleOk={() => handleConfirm()}
              toggleModal={setModal}
            />
          )}
        </>
      )}
      {status && (
        <div className="flex gap-4 flex-col">
          <StatusChip status={status} />
          {viewedProfile && <p className="text-excerpt2 text-neutral-900">Seen profile!</p>}
        </div>
      )}
      {addDeleteButton && (
        <div className="flex gap-6">
          <Link to={{ pathname: `/dashboard/candidates/user-details/${id}/` }}>
            <Button className="min-w-max px-4 py-2">View Profile</Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CandidateCards;
