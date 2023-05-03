import React from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Button from '@atoms/buttons';
import { AddNewStudentBreadCrums } from './const';
import InputSection from '@molecules/inputSection';
import InnerPageHead from '@molecules/InnerPageHead';
import { EButtonType } from '@atoms/buttons/button.types';
import ReactSelect from '@atoms/react-select/ReactSelect';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import useFetchAll from '@particles/hooks/dashboard/all/useFetchAll';
import useMutationPostStudent from '@particles/hooks/dashboard/student/useMutationPostStudent';

const AddNewStudent = () => {
  const { data: All } = useFetchAll();
  const { mutate: postStudent } = useMutationPostStudent();

  const navigate = useNavigate();

  const getLabelValue = (data: any, key: string) => {
    if (!data) return [];
    return data.map((row: any) => ({
      label: row[key],
      value: row.id,
    }));
  };

  const roleOptions = getLabelValue(All?.role, 'name');
  const provinceOptions = getLabelValue(All?.province, 'Province');
  const institutionOptions = getLabelValue(All?.institution, 'institution_name');
  const districtOptions = getLabelValue(All?.district, 'District_name');

  const formik = useFormik({
    initialValues: {
      confirmed: false,
      blocked: true,
      email: '',
      username: '',
      password: 'Pa$$0rd!',
      Full_Name: '',
      Mobile: undefined,
      dob: '2023-05-10',
      role: 2,
      province: 2,
      district: 5,
      institution: 0,
    },
    validationSchema: Yup.object({
      Full_Name: Yup.string().required('Full name is required!'),
      email: Yup.string().email().required('Email is requierd!'),
      password: Yup.string().required('Password is required!'),
      Mobile: Yup.string().max(16, 'Atmost 16 number can be used!'),
      dob: Yup.string(),
      role: Yup.number().required(),
      province: Yup.number().required(),
      institution: Yup.number().required(),
      district: Yup.number().required(),
    }),
    onSubmit: (values) => {
      postStudent(values);
    },
  });

  return (
    <main className="py-4 px-10">
      <BlogsNavigation content={AddNewStudentBreadCrums} />
      <InnerPageHead heading={'Add student details'} />
      <form onSubmit={formik.handleSubmit} className="mt-10 max-w-[662px]">
        {/* <div className="flex flex-col gap-[6px] mb-6">
          <label className="text-body3 text-neutral-900 opacity-70">Select a Role</label>
          <ReactSelect
            value={formik.values['role']}
            onValueChange={(value) => formik.setFieldValue('role', value)}
            onBlur={() => formik.setFieldTouched('role')}
            options={roleOptions}
            downArrow={true}
            isSearchable={false}
            errorToolTip={formik.touched['role']}
            error={formik.touched['role'] ? (formik.errors['role'] as string) : undefined}
          />
        </div> */}

        <InputSection
          label={'Email'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px]"
          value={formik.values['email']}
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
          status={formik.touched['email']}
          error={formik.touched['email'] ? formik.errors['email'] : undefined}
          bottomError={false}
        />

        <InputSection
          label={'Username'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['username']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="username"
          status={formik.touched['username']}
          error={formik.touched['username'] ? formik.errors['username'] : undefined}
          bottomError={false}
        />

        <InputSection
          label={'Full Name'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['Full_Name']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="Full_Name"
          status={formik.touched['Full_Name']}
          error={formik.touched['Full_Name'] ? formik.errors['Full_Name'] : undefined}
          bottomError={false}
        />

        {/* <InputSection
          label={'Password'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['password']}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
        /> */}

        <div className="w-full border-b border-neutral-300 my-8" />

        <div className="flex flex-col gap-[6px] mb-6">
          <label className="text-body3 text-neutral-900 opacity-70">Select a Province</label>
          <ReactSelect
            value={formik.values['province']}
            onValueChange={(value) => formik.setFieldValue('province', value)}
            onBlur={() => formik.setFieldTouched('province')}
            options={provinceOptions}
            downArrow={true}
            isSearchable={false}
            errorToolTip={formik.touched['province']}
            error={formik.touched['province'] ? (formik.errors['province'] as string) : undefined}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-6">
          <label className="text-body3 text-neutral-900 opacity-70">Select a District</label>
          <ReactSelect
            value={formik.values['district']}
            onValueChange={(value) => formik.setFieldValue('district', value)}
            onBlur={() => formik.setFieldTouched('district')}
            options={districtOptions}
            downArrow={true}
            isSearchable={false}
            errorToolTip={formik.touched['district']}
            error={formik.touched['district'] ? (formik.errors['district'] as string) : undefined}
          />
        </div>

        <div className="flex flex-col gap-[6px] mb-6">
          <label className="text-body3 text-neutral-900 opacity-70">Select a Institution</label>
          <ReactSelect
            value={formik.values['institution']}
            onValueChange={(value) => formik.setFieldValue('institution', value)}
            onBlur={() => formik.setFieldTouched('institution')}
            options={institutionOptions}
            downArrow={true}
            isSearchable={false}
            errorToolTip={formik.touched['institution']}
            error={formik.touched['institution'] ? (formik.errors['institution'] as string) : undefined}
          />
        </div>

        <InputSection
          label={'DOB'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['dob']}
          type="date"
          status={formik.touched['dob']}
          error={formik.touched['dob'] ? formik.errors['dob'] : undefined}
          bottomError={false}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="dob"
        />

        <InputSection
          label={'Mobile'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['Mobile']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['Mobile']}
          error={formik.touched['Mobile'] ? formik.errors['Mobile'] : undefined}
          bottomError={false}
          name="Mobile"
        />

        <div className="flex gap-4 mt-10">
          <Button type="button" onClick={() => navigate(-1)} btnType={EButtonType.outline}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </main>
  );
};

export default AddNewStudent;
