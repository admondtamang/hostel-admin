import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { IStudentPaginationResponse } from '@particles/responseInterface/student/student.list.interface';

export const getStudentsList = async (page: number, search: string) => {
  try {
    const { data } = await api.get<IStudentPaginationResponse>(
      '/content-manager/collection-types/plugin::users-permissions.user',
      {
        params: {
          page,
          pageSize: 10,
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
  const search = useGetParams('search') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['useFetchStudents.list', page, search],
    queryFn: () => getStudentsList(page, search),
  });
};

export default useFetchStudents;
