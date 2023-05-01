import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';
import { IStudentInput } from '@particles/responseInterface/student/student.interface';

export const postStudent = async (values: IStudentInput) => {
  try {
    const { data } = await api.post(`/content-manager/collection-types/plugin::users-permissions.user`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPostStudent = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: IStudentInput) => postStudent(values),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      navigate(-1);
    },
    onError(error: AxiosError, variables, context) {
      toast.error(error?.message || 'Failed to create Category', {
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

export default useMutationPostStudent;
