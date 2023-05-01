import React from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Inputs from '@atoms/inputs';
import Button from '@atoms/buttons';
import Modal from '@molecules/Modal';
import InputSection from '@molecules/inputSection';
import { EButtonType } from '@atoms/buttons/button.types';
import { passwordRegex } from '@particles/const/validationRegex';
import StaticPlusIcon from '@atoms/icons/Plus-Icon/StaticPlus-Icon';
import useMutationUserPasswordPatch from '@particles/hooks/users/useMutationUserPasswordPatch';

interface IPasswordChangeModal {
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordChangeModal: React.FC<IPasswordChangeModal> = ({ toggleModal }) => {
  const { mutate: changePassword, isSuccess } = useMutationUserPasswordPatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string(),
      newPassword: Yup.string().matches(passwordRegex, 'Password strength is not enough!'),
      confirmNewPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        "Confirm password doesn't match with new password!",
      ),
    }),
    onSubmit: (value) => {
      changePassword(
        { oldPassword: value.oldPassword, newPassword: value.newPassword },
        {
          onSuccess: () => {
            toggleModal(false);
          },
        },
      );
    },
  });

  return (
    <Modal toggleModal={toggleModal}>
      <section className="px-6 py-[34px] rounded-lg bg-white relative">
        <div className="absolute cursor-pointer top-[18px] right-4" onClick={() => toggleModal(false)}>
          <StaticPlusIcon className="w-6 text-neutral-700 rotate-45" />
        </div>
        <h4 className="text-h4 text-neutral-900">Change account password</h4>
        <form onSubmit={formik.handleSubmit} className="mt-8 flex flex-col gap-6">
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-between">
              <label className="text-body3 text-neutral-900 opacity-70">Enter old password</label>
              <span className="text-caption text-link">Forgot Password?</span>
            </div>
            <Inputs
              type="password"
              name="oldPassword"
              value={formik.values['oldPassword']}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Password"
              status={formik.touched['oldPassword']}
              error={formik.touched['oldPassword'] ? formik.errors['oldPassword'] : undefined}
            />
          </div>
          <InputSection
            type="password"
            label="Enter new password"
            name="newPassword"
            labelClass="text-body3 text-neutral-900 opacity-70"
            containerClass="flex flex-col gap-[6px]"
            placeholder="Password"
            value={formik.values['newPassword']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched['newPassword']}
            error={formik.touched['newPassword'] ? formik.errors['newPassword'] : undefined}
            bottomError={false}
          />
          <InputSection
            type="password"
            name="confirmNewPassword"
            label="Confirm new password"
            labelClass="text-body3 text-neutral-900 opacity-70"
            containerClass="flex flex-col gap-[6px]"
            placeholder="Password"
            value={formik.values['confirmNewPassword']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            status={formik.touched['confirmNewPassword']}
            error={formik.touched['confirmNewPassword'] ? formik.errors['confirmNewPassword'] : undefined}
            bottomError={false}
          />
          <div className="flex justify-end gap-4">
            <Button type="button" btnType={EButtonType.outline} onClick={() => toggleModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default PasswordChangeModal;
