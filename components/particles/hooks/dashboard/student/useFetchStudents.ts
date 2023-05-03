import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { IStudentPaginationResponse } from '@particles/responseInterface/student/student.list.interface';
import { useUserContext } from '../../../../context/userContext';
import { IUser } from '@particles/responseInterface/student/student.interface';

export const getStudentsList = async (page: number, search: string, user: IUser) => {
  try {
    const { data } = await api.get<IStudentPaginationResponse>(
      '/content-manager/collection-types/plugin::users-permissions.user',
      {
        params: {
          page,
          pageSize: 10,
          'filters[created_by_id][$eq]': user?.id,
          sort: 'username:ASC',
          ...(search ? { search } : {}),
        },
      },
    );

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchStudents = () => {
  const page = useCurrentPage();
  const { user } = useUserContext();
  const search = useGetParams('search') || '';

  return useQuery({
    queryKey: ['useFetchStudents.list', page, search, user],
    queryFn: () => getStudentsList(page, search, user),
  });
};

export default useFetchStudents;
