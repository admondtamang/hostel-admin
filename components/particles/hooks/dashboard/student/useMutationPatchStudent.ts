import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';
import { IStudentInput } from '@particles/responseInterface/student/student.interface';

export type Iprops = {
  id: string;
  values: IStudentInput;
};

export const patchStudent = async (id: string, values: IStudentInput) => {
  try {
    const { data } = await api.put(`/content-manager/collection-types/plugin::users-permissions.user/${id}`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchStudent = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, values }: Iprops) => patchStudent(id, values),
    onSuccess: (data) => {
      toast.success('Sucessfully updated', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      navigate(-1);
    },
    onError(error: AxiosError) {
      toast.error(error?.message || 'Failed to create student', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
  });
};

export default useMutationPatchStudent;
