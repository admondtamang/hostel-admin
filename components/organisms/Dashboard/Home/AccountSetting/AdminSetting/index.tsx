import React from 'react';

import { useFormik } from 'formik';

import Button from '@atoms/buttons';
import UserIcon from '@atoms/icons/User-Icon';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import CameraIcon from '@atoms/icons/Camera-Icon';
import InputSection from '@molecules/inputSection';
import { EButtonType } from '@atoms/buttons/button.types';
import PasswordChangeModal from '@molecules/PasswordChangeModal';
import useMutationUserPut from '@particles/hooks/users/useMutationUserPut';
import useUserGetCurrentUser from '@particles/hooks/users/userGetCurrentUser';
import useMutationUserImageUpload from '@particles/hooks/users/useMutationUserImageUpload';

const AdminSetting = () => {
  const [file, setFile] = React.useState<File>();
  const [fileUrl, setFileUrl] = React.useState<string>();
  const profileImage = React.useRef<HTMLInputElement>(null);
  const [passwordToggle, setPasswordToggle] = React.useState<boolean>(false);

  const { data: user } = useUserGetCurrentUser();
  const { mutate: updateUser, isLoading } = useMutationUserPut();
  const { mutate: uploadProfileImage, isLoading: isLoadingImage } = useMutationUserImageUpload();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.data?.fullName || '',
      email: user?.data?.email || '',
      password: '**********',
    },

    onSubmit: async (value) => {
      if (file) await uploadProfileImage({ file });
      await updateUser({ fullName: value.fullName, email: value.email });
    },
  });

  React.useEffect(() => {
    const fileOnChange = () => {
      if (profileImage && profileImage.current?.files && profileImage.current.files?.[0]) {
        const objURL = URL.createObjectURL(profileImage.current.files[0]);
        setFile(profileImage.current.files[0]);
        setFileUrl(objURL);
      }
    };
    profileImage.current?.addEventListener('change', fileOnChange);

    return () => profileImage.current?.removeEventListener('change', fileOnChange);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <h3 className="text-h3 text-neutral-900">Account settings</h3>
        <p className="text-body2 text-neutral-600">View and update your account details, profile and more</p>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex mt-10 gap-[30px]">
        <div className="w-full lg:w-8/12">
          <div className="bg-white rounded-lg shadow-card p-6 flex flex-col">
            <h4 className="text-h4v2 text-neutral-900">Basic information</h4>
            <div className="flex flex-col gap-6 mt-6">
              <InputSection
                label="Fullname"
                value={formik.values['fullName']}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="fullName"
                labelClass="text-body3 text-neutral-900 opacity-70"
                containerClass="flex flex-col gap-[6px]"
              />
              <InputSection
                label={<div className="flex items-center">Email</div>}
                value={formik.values['email']}
                onChange={formik.handleChange}
                disabled
                name="email"
                onBlur={formik.handleBlur}
                labelClass="text-body3 text-neutral-900 opacity-70"
                containerClass="flex flex-col gap-[6px]"
                className="bg-neutral-100"
                type="email"
              />
              <div className="flex flex-col gap-[6px]">
                <label className="text-body3 text-neutral-900 opacity-70">Password</label>
                <div className="flex h-[43px] rounded-[10px] border border-normal-input] focus:border-back focus-within:border-black px-4 py-[10px] bg-neutral-100">
                  <input
                    type="password"
                    className="w-full disabled:bg-neutral-100"
                    value={formik.values['password']}
                    disabled
                  />
                  <div className="cursor-pointer" onClick={() => setPasswordToggle(true)}>
                    <PencilIcon className="w-[18px] text-neutral-700" />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-end">
                <Button btnType={EButtonType.outline} type="button" onClick={() => formik.resetForm()}>
                  Reset
                </Button>
                <Button loading={isLoadingImage || isLoading} type="submit">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="bg-white rounded-lg shadow-card p-6 max-h-fit">
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h5 className="text-h5 text-neutral-900">Profile image</h5>
              <div className="w-[120px] aspect-square rounded-full mt-6 bg-neutral-300 flex justify-center items-center relative">
                {/* If image exists then fill the img else icon */}
                {fileUrl || user?.data?.photo?.completedUrl ? (
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={fileUrl || user?.data?.photo?.completedUrl} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <UserIcon className="w-14 text-neutral-600" />
                )}
                <label
                  htmlFor="profileImage"
                  className="absolute z-10 top-0 right-0 w-10 aspect-square shadow-notificationContainer bg-white rounded-full flex items-center justify-center cursor-pointer"
                >
                  <CameraIcon />
                  <input type="file" id="profileImage" name="profileImage" className="hidden" ref={profileImage} />
                </label>
              </div>
              <div className="flex flex-col mt-4 gap-[6px] justify-center items-center">
                <div className="bg-pending-background border border-scrim rounded-full py-[6px] text-roleFont text-neutral-900 w-[95px]">
                  {user?.data?.role?.name}
                </div>
                <span className="text-bodysmall text-neutral-700">{user?.data?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
      {passwordToggle && <PasswordChangeModal toggleModal={setPasswordToggle} />}
    </>
  );
};

export default AdminSetting;
