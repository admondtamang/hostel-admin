export const AddNewSEOBreadCrums = (id: number | string) => [
  {
    title: 'SEO',
    link: '/dashboard/seo/',
  },
  {
    title: 'SEO Settings',
    link: `/dashboard/seo/${id}`,
  },
];
