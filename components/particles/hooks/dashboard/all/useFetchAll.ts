import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';

export const getFetchAll = async () => {
  try {
    const { data: role } = await api.post(
      '/content-manager/relations/plugin::users-permissions.user/role?limit=20&start=0',
    );
    const { data: province } = await api.post(
      '/content-manager/relations/plugin::users-permissions.user/province?limit=20&start=0',
    );
    const { data: institution } = await api.post(
      '/content-manager/relations/plugin::users-permissions.user/institution?limit=20&start=0',
    );
    const { data: district } = await api.post(
      '/content-manager/relations/plugin::users-permissions.user/district?limit=20&start=0',
    );

    return { role, province, institution, district };
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchAll = () => {
  return useQuery({
    queryKey: ['all'],
    queryFn: () => getFetchAll(),
  });
};

export default useFetchAll;
