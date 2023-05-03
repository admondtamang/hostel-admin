export const EditStudentBreadCrums = (id: number | string) => [
  {
    title: 'Students',
    link: '/dashboard/student/',
  },
  {
    title: 'Edit Student',
    link: `/dashboard/student/${id}`,
  },
];
