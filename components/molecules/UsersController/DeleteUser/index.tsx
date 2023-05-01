import React from 'react';

import Button from '@atoms/buttons';
import { EButtonType } from '@atoms/buttons/button.types';
import useMutationDeleteUser from '@particles/hooks/users/useMutationDeleteUser';

const DeleteUser: React.FC<{
  userId: string;
  name: string;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ userId, name, closeModal }) => {
  const { mutate: deleteUser } = useMutationDeleteUser();

  const handleDeleteUser = () => {
    deleteUser({ id: userId }, { onSuccess: () => [closeModal(false)] });
  };
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-h4v2 text-neutral-900">Are you sure you want to delete {name}?</h3>
      <div className="mt-4 flex justify-end gap-2">
        <Button btnType={EButtonType.outline} onClick={() => closeModal(false)}>
          Cancel
        </Button>
        <Button onClick={handleDeleteUser} btnType={EButtonType.none} className="bg-error w-[140px] py-3 text-white">
          Delete User
        </Button>
      </div>
    </section>
  );
};

export default DeleteUser;
