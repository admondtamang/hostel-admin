import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowLeftIcon from '@atoms/icons/Arrow-Left-Icon';

import InnerPageHeadCSS from '@particles/css/innerPageHeading.module.css';

const InnerPageHead: React.FC<{ heading?: string }> = ({ heading }) => {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate(-1)} className={InnerPageHeadCSS.arrowBack}>
        <ArrowLeftIcon />
      </div>
      {heading && (
        <section className="mt-6">
          <h3 className="text-h3 text-neutral-900">{heading}</h3>
        </section>
      )}
    </>
  );
};

export default InnerPageHead;
