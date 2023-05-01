import React, { useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { FileWithPath, useDropzone } from 'react-dropzone';

import Button from '@atoms/buttons';
import Dropzone from '@molecules/dropzone';
import InputSection from '@molecules/inputSection';
import InnerPageHead from '@molecules/InnerPageHead';
import ReactSelect from '@atoms/react-select/ReactSelect';
import { EButtonType } from '@atoms/buttons/button.types';
import useGetParams from '@particles/hooks/usetGetParams';
import { emailRegex } from '@particles/const/validationRegex';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';
import { generatePassword } from '@particles/helper/randomPassword';
import useFetchSkillsList from '@particles/hooks/useFetchSkillsList';
import useMutationCreateCandidate from '@particles/hooks/dashboard/vetted/useMutationCreateCandidate';

import { vettedCandidateAddNavigation } from './const';

import AddNewCandidateCSS from '@particles/css/vetted-candidates/addNewVetted.module.css';

const AddNewVettedCandidates = () => {
  const navigate = useNavigate();
  const name = '';
  const email = '';
  const position = '';
  const { data: skillsList } = useFetchSkillsList();
  const createCandidate = useMutationCreateCandidate();

  const skillsOptions = skillsList?.data.map((skills) => ({ value: skills._id, label: skills.title }));

  const {
    acceptedFiles: userImage,
    fileRejections: userImageRejection,
    getRootProps: getRootPropsUserImage,
    getInputProps: getInputPropsUserImage,
  } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 1048576,
  });

  const filesUserImage = userImage.map((file: FileWithPath) => {
    return <li key={file.path}>{file.path}</li>;
  });

  const {
    acceptedFiles: userCV,
    fileRejections: userCVRejection,
    getRootProps: getRootPropsUserCV,
    getInputProps: getInputPropsUserCV,
  } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 1048576,
  });

  const filesUserCV = userCV.map((file: FileWithPath) => {
    return <li key={file.path}>{file.path}</li>;
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: name,
      email: email,
      password: '',
      currentRole: position,
      skills: [],
      yearOfExperience: 0,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Fullname of candidate needs to be provided!'),
      email: Yup.string()
        .matches(emailRegex, 'Email provided should be a valid email!')
        .required('Email field is required!'),
      yearOfExperience: Yup.number().required('Experience is required!'),
      currentRole: Yup.string().required('Current Role of candidate should be provided!'),
      skills: Yup.array().min(1, 'At least one role needs to be selected!').required('Role Selection is required!'),
    }),
    onSubmit: async (value) => {
      const password = generatePassword(20);

      if (userCV.length === 0) {
        toast('Please upload user CV!', { type: 'error' });

        return;
      }

      try {
        await createCandidate({
          email: value.email,
          fullName: value.fullName,
          password: password,
          currentRole: value.currentRole,
          profileImage: userImage[0],
          resumeFile: userCV[0],
          skills: value.skills,
          yearOfExperience: value.yearOfExperience,
        });

        navigate({
          pathname: '/dashboard/candidates/',
          search: '?content=vetted+candidates&pageNo=1',
        });
      } catch (e: any) {
        toast(e?.response?.data?.message, { type: 'error' });
      }

      return;
    },
  });

  useEffect(() => {
    if (userImageRejection && userImageRejection.length > 0) {
      toast(userImageRejection[0].errors?.[0]?.code?.replaceAll('-', ' '), { type: 'error' });
    }
  }, [userImageRejection]);

  useEffect(() => {
    if (userCVRejection && userCVRejection.length > 0) {
      toast(userCVRejection[0].errors?.[0]?.code?.replaceAll('-', ' '), { type: 'error' });
    }
  }, [userCVRejection]);

  return (
    <main className="px-10 py-4">
      <BlogsNavigation content={vettedCandidateAddNavigation} />
      <InnerPageHead heading={'Add new vetted candidate'} />
      <form onSubmit={formik.handleSubmit} className={AddNewCandidateCSS.form}>
        <InputSection
          name="fullName"
          value={formik.values['fullName']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['fullName']}
          error={formik.touched['fullName'] ? formik.errors['fullName'] : undefined}
          bottomError={false}
          placeholder="Enter candidate’s full name"
          label={'Candidate full name'}
          labelClass={AddNewCandidateCSS.label}
          containerClass={AddNewCandidateCSS.container}
        />
        <InputSection
          name="email"
          value={formik.values['email']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['email']}
          error={formik.touched['email'] ? formik.errors['email'] : undefined}
          bottomError={false}
          placeholder="Enter candidate’s email"
          label={'Candidate email'}
          labelClass={AddNewCandidateCSS.label}
          containerClass={AddNewCandidateCSS.container}
        />
        <InputSection
          name="yearOfExperience"
          value={formik.values['yearOfExperience']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['yearOfExperience']}
          error={formik.touched['yearOfExperience'] ? formik.errors['yearOfExperience'] : undefined}
          bottomError={false}
          placeholder="Enter candidate’s year of experience"
          label={'Candidate year of experience'}
          labelClass={AddNewCandidateCSS.label}
          containerClass={AddNewCandidateCSS.container}
        />
        <Dropzone
          getInputProps={getInputPropsUserImage}
          getRootProps={getRootPropsUserImage}
          files={filesUserImage.length > 0 ? filesUserImage : undefined}
          heading="Drag and drop the recent photo (optional)"
          acceptedFiles="JPEG, JPG, PNG"
          maxFileSize="1MB"
        />
        <InputSection
          name="currentRole"
          value={formik.values['currentRole']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched['currentRole']}
          error={formik.touched['currentRole'] ? formik.errors['currentRole'] : undefined}
          bottomError={false}
          placeholder="Current role of candidate"
          label={'Current role'}
          labelClass={AddNewCandidateCSS.label}
          containerClass={AddNewCandidateCSS.container}
        />
        <div className={AddNewCandidateCSS.container}>
          <label className={AddNewCandidateCSS.label}>Skills</label>
          <ReactSelect
            options={skillsOptions}
            value={formik.values['skills']}
            onValueChange={(value) => formik.setFieldValue('skills', value)}
            className="w-full"
            isMulti
            error={formik.errors['skills'] ? (formik.errors['skills'] as string) : undefined}
            errorToolTip={true}
          />
        </div>
        <Dropzone
          getInputProps={getInputPropsUserCV}
          getRootProps={getRootPropsUserCV}
          files={filesUserCV.length > 0 ? filesUserCV : undefined}
          heading="Drag and drop the recent resume/CV"
          acceptedFiles="PDF"
          maxFileSize="1MB"
        />

        <div className="flex gap-4">
          <Button type="button" btnType={EButtonType.outline} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button type="submit">Save And Continue</Button>
        </div>
      </form>
    </main>
  );
};

export default AddNewVettedCandidates;
