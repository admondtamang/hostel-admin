import React from 'react';

import TrashIcon from '@atoms/icons/Trash-Icon';
import ModalDelete from '@molecules/ModalDelete';
import PencilIcon from '@atoms/icons/Pencil-Icon';
import { IStudentData } from '@particles/responseInterface/student/student.list.interface';

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
export const SEOHeading = ['Full Name', 'Mobile', 'Location'];

export const formatBlogsContent = (data: IStudentData[], deleteSeo: any, isLoading?: boolean) =>
  isLoading
    ? []
    : data.map((row, index) => [
        1,
        <div key="heading-1" className="text-bodysmall text-neutral-700 max-w-[125px]">
          {row.Full_Name || ''}
        </div>,
        <div key="meta-title-1" className="text-bodysmall text-neutral-700 max-w-[320px]">
          {row.Mobile || '-'}
        </div>,

        <div key="permalink-structure-1" className="text-bodysmall text-neutral-700 max-w-[180px] break-words">
          {row.province.Province + ' - ' + row.district?.District_name + ' - ' + row.institution.institution_name}
        </div>,
        [
          {
            icon: PencilIcon,
            link: `/dashboard/seo/${row.id}`,
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
                  name={row.Full_Name || ''}
                  deleteFunction={() => {
                    deleteSeo(row.id);
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
