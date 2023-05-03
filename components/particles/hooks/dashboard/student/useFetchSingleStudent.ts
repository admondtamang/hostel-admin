import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';
import { IUser, IUserResponse } from '@particles/responseInterface/student/student.interface';

export const getSingleStudent = async (value: string) => {
  try {
    const { data } = await api.get<IUserResponse>(
      `/content-manager/collection-types/plugin::users-permissions.user/${value}`,
    );

    return data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleStudent = (value: string) => {
  return useQuery({
    queryKey: ['student.single', value],
    queryFn: async () => await getSingleStudent(value),
  });
};

export default useFetchSingleStudent;
