import React from 'react';

import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import InnerPageHead from '@molecules/InnerPageHead';
import BlogsNavigation from '@molecules/Blogs/BlogsNavigation';

import Button from '@atoms/buttons';
import { AddNewSEOBreadCrums } from './const';
import InputSection from '@molecules/inputSection';
import { pageType as pageTypeOption } from '../const';
import { EButtonType } from '@atoms/buttons/button.types';
import { useNavigate, useParams } from 'react-router-dom';
import ReactSelect from '@atoms/react-select/ReactSelect';

import useFetchSingleSeo from '@particles/hooks/dashboard/seo/useFetchSingleSeo';
import useMutationPatchSeo from '@particles/hooks/dashboard/seo/useMutationPatchSeo';

const EditSEO = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blogCategory, isLoading, isError } = useFetchSingleSeo(id as string);
  const { mutate: patchSeoTemplate } = useMutationPatchSeo();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      heading: blogCategory?.heading || '',
      mainProfileURL: blogCategory?.url || '',
      pageMetaTitle: blogCategory?.meta_title || '',
      metaDescription: blogCategory?.meta_description || '',
      metaKeywords: blogCategory?.meta_keywords || '',
      pageType: blogCategory?.pageType || '',
    },
    validationSchema: Yup.object({
      heading: Yup.string().required('Heading is required!'),
      mainProfileURL: Yup.string().required('Main Profile URL is required!'),
      pageMetaTitle: Yup.string().max(180, 'Atmost 180 characters can be used!'),
      metaDescription: Yup.string().max(180, 'Atmost 180 characters can be used!'),
      metaKeywords: Yup.string().max(180, 'Atmost 180 characters can be used!'),
    }),
    onSubmit: (values) => {
      patchSeoTemplate({
        id: id as string,
        values: {
          pageType: values.pageType,
          heading: values.heading,
          url: values.mainProfileURL,
          meta_description: values.metaDescription,
          meta_title: values.pageMetaTitle,
          meta_keywords: values.metaKeywords,
        },
      });
    },
  });

  return (
    <main className="py-4 px-10">
      <BlogsNavigation content={AddNewSEOBreadCrums(id || '')} />
      <InnerPageHead heading={'SEO settings'} />
      <form onSubmit={formik.handleSubmit} className="mt-10 max-w-[662px]">
        <div className="flex flex-col gap-[6px] mb-6">
          <label className="text-body3 text-neutral-900 opacity-70">Select a page type</label>
          <ReactSelect
            value={formik.values['pageType']}
            onValueChange={(value) => formik.setFieldValue('pageType', value)}
            onBlur={() => formik.setFieldTouched('pageType')}
            options={pageTypeOption}
            downArrow={true}
            isSearchable={false}
            error={formik.touched['pageType'] ? (formik.errors['pageType'] as string) : undefined}
          />
        </div>
        <InputSection
          label={'Heading'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px]"
          value={formik.values['heading']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="heading"
        />
        <InputSection
          label={'Main profile URL'}
          labelClass="text-body3 text-neutral-900 opacity-70"
          containerClass="flex flex-col gap-[6px] mt-8"
          value={formik.values['mainProfileURL']}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="mainProfileURL"
        />
        <div className="w-full border-b border-neutral-300 mt-8" />
        <div className="mt-8 flex flex-col gap-[6px]">
          <label className="text-body3 text-neutral-900 opacity-70">Page meta title</label>
          <textarea
            value={formik.values['pageMetaTitle']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-[120px] resize-none border border-bullet rounded text-bodysmall text-neutral-900 px-4 py-[10px]"
            name="pageMetaTitle"
            maxLength={150}
          />
          <div className="flex items-center justify-between">
            <p className="text-caption text-neutral-800 opacity-70">
              Page title helps to identify/indicate the subject of a webpage
            </p>
            <p className="text-caption text-neutral-800 opacity-70">
              <span className={clsx(formik.errors['pageMetaTitle'] ? 'text-error' : 'text-neutral-900')}>
                {formik.values['pageMetaTitle'].length}
              </span>
              /150 characters
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-[6px]">
          <label className="text-body3 text-neutral-900 opacity-70">Meta description</label>
          <textarea
            value={formik.values['metaDescription']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-[120px] resize-none border border-bullet rounded text-bodysmall text-neutral-900 px-4 py-[10px]"
            name="metaDescription"
            maxLength={150}
          />
          <div className="flex items-center justify-between">
            <p className="text-caption text-neutral-800 opacity-70">
              Page title helps to identify/indicate the subject of a webpage
            </p>
            <p className="text-caption text-neutral-800 opacity-70">
              <span className={clsx(formik.errors['metaDescription'] ? 'text-error' : 'text-neutral-900')}>
                {formik.values['metaDescription'].length}
              </span>
              /150 characters
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-[6px]">
          <label className="text-body3 text-neutral-900 opacity-70">Meta keywords</label>
          <textarea
            value={formik.values['metaKeywords']}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-[120px] resize-none border border-bullet rounded text-bodysmall text-neutral-900 px-4 py-[10px]"
            name="metaKeywords"
            maxLength={150}
          />
          <div className="flex items-center justify-between">
            <p className="text-caption text-neutral-800 opacity-70">
              Meta keywords tells about the topic of the particular page
            </p>
            <p className="text-caption text-neutral-800 opacity-70">
              <span className={clsx(formik.errors['metaKeywords'] ? 'text-error' : 'text-neutral-900')}>
                {formik.values['metaKeywords'].length}
              </span>
              /150 characters
            </p>
          </div>
        </div>
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

export default EditSEO;
