import ChatIcon from '@atoms/icons/Chat-Icon';
import UsersIcon from '@atoms/icons/Users-Icon';
import DocumentIcon from '@atoms/icons/Document-Search-Icon';
import { ISideBarContent } from '@organisms/Dashboard/Body-Layout/Side-Bar';
import OfficeBuildingIcon from '@atoms/icons/Office-Building-Icon';

export const sideBarContent: ISideBarContent[] = [
  {
    title: 'Home',
    icon: UsersIcon,
    link: '/dashboard/home/',
  },
  // {
  //   title: 'Users',
  //   icon: UsersIcon,
  //   link: '/dashboard/users/users-details',
  //   subContent: [
  //     {
  //       title: 'Users Details',
  //       link: '/dashboard/users/users-details',
  //     },
  //     // Temporarily removed!
  //     // {
  //     //   title: 'Roles and Permissions',
  //     //   link: '/dashboard/users/roles-and-permissions/',
  //     // },
  //   ],
  // },
  {
    title: 'SEO',
    icon: DocumentIcon,
    link: '/dashboard/seo/',
  },
];
