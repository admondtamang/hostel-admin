import { ApplicantsStatus } from '@molecules/CandidateCard';

export const companyNavigation = [
  {
    title: 'Companies',
    link: '/dashboard/companies/',
  },
  {
    title: 'Jobs',
    link: '/dashboard/companies/posted-jobs/',
  },
  {
    title: 'Recommend CV',
    link: '/dashboard/companies/recommend-cv/',
  },
];

export const tempValue = [
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    image: '/components/particles/images/users/user-placeholder.jpg',
    activeButton: true,
  },
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    activeButton: false,
    status: ApplicantsStatus.pending,
  },
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    activeButton: true,
    status: ApplicantsStatus.rejected,
  },
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    image: '/components/particles/images/users/user-placeholder.jpg',
    activeButton: false,
  },
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    image: '/components/particles/images/users/user-placeholder.jpg',
    activeButton: true,
    status: ApplicantsStatus.accepted,
  },
  {
    name: 'Cameron Williamson',
    position: 'Freelance Demandware Developer',
    skills: ['JavaScript', 'Python', 'Java', 'C', 'C++', 'Carbon'],
    activeButton: false,
  },
];

export const navigate = ['Vetted', 'All', 'Recommended'];
