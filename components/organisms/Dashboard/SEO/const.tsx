import React from 'react';

import TrashIcon from '@atoms/icons/Trash-Icon';
import ModalDelete from '@molecules/ModalDelete';
import PencilIcon from '@atoms/icons/Pencil-Icon';

export interface ISeoTemplate {
  _id: string;
  heading: string;
  url: string;
  meta_title: string;
  createdAt: Date;
  updatedAt: Date;
}

export const navigateContent = ['View All', 'Author', 'Admin'];

export const pageType = [
  {
    value: 'Developers',
    label: 'Developers',
  },
  {
    value: 'Designer',
    label: 'Designer',
  },
  {
    value: 'Project Manager',
    label: 'Project Manager',
  },
  {
    value: 'Digital Marketer',
    label: 'Digital Marketer',
  },
];

export const SEOType = [
  {
    value: 'Employee',
    label: 'Employee',
  },
  {
    value: 'Employer',
    label: 'Employer',
  },
];

export const SEOHeading = ['Page Type Name', 'Heading', 'Meta Title', 'Permalink Structure'];

export const formatBlogsContent = (data: ISeoTemplate[], deleteSeo: any, isLoading?: boolean) =>
  isLoading
    ? []
    : data.map((row: ISeoTemplate, index) => [
        1,
        <div key="pageTypeName-1 " className="flex flex-col max-w-[200px]">
          <p className="text-tableContentHead text-neutral-900">Developers</p>
          <p className="text-roleFont text-gray500">/developers</p>
        </div>,
        <div key="heading-1" className="text-bodysmall text-neutral-700 max-w-[125px]">
          {row.heading}
        </div>,
        <div key="meta-title-1" className="text-bodysmall text-neutral-700 max-w-[320px]">
          {row.meta_title}
        </div>,
        <div key="permalink-structure-1" className="text-bodysmall text-neutral-700 max-w-[180px] break-words">
          {row.url}
        </div>,
        [
          {
            icon: PencilIcon,
            link: `/dashboard/seo/${row._id}`,
            params: [],
            view: true,
          },
          {
            icon: TrashIcon,
            link: '',
            params: [],
            view: true,
            danger: true,
            deleteModal: true,
            Modal: (closeModal: React.Dispatch<React.SetStateAction<boolean>>) => {
              return (
                <ModalDelete
                  name={row.heading}
                  deleteFunction={() => {
                    deleteSeo(row._id);
                  }}
                  closeModal={closeModal}
                />
              );
            },
          },
        ],
      ]);

export const SEOContent = [
  [
    1,
    <div key="pageTypeName-1" className="flex flex-col">
      <p className="text-tableContentHead text-neutral-900">Developers</p>
      <p className="text-roleFont text-gray500">/developers</p>
    </div>,
    <div key="heading-1" className="text-bodysmall text-neutral-700">
      developers
    </div>,
    <div key="meta-title-1" className="text-bodysmall text-neutral-700">
      developers
    </div>,
    <div key="permalink-structure-1" className="text-bodysmall text-neutral-700">
      /developers
    </div>,
    [
      {
        icon: PencilIcon,
        link: '',
        params: [],
        view: true,
      },
      {
        icon: TrashIcon,
        link: '',
        params: [],
        view: true,
        danger: true,
      },
    ],
  ],
];
