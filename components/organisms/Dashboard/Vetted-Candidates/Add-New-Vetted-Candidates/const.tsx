export const vettedCandidateAddNavigation = [
  {
    title: 'Vetted Candidates',
    link: '/dashboard/candidates/',
  },
  {
    title: 'Add New',
    link: '/dashboard/candidates/add-new/',
  },
];

export const editVettedCandidateNavigation = (id: number) => {
  return [
    {
      title: 'Vetted Candidates',
      link: '/dashboard/candidates/',
    },
    {
      title: 'Edit',
      link: `/dashboard/candidates/edit-details/${id.toString()}`,
    },
  ];
};
