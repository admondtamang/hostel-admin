import React from 'react';

import clsx from 'clsx';

import DocumentTextIcon from '@atoms/icons/Document-Text-Icon';

import toolTipsCSS from '@particles/css/toolTip.module.css';

const DocumentTextIconWithToolTip: React.FC = () => {
  return (
    <div className={toolTipsCSS.tooltip}>
      <div className="relative">
        <DocumentTextIcon />
        <span className={clsx(toolTipsCSS.tooltipText, 'font-medium text-[11px] leading-[14.85px]')}>Recommend CV</span>
      </div>
    </div>
  );
};

export default DocumentTextIconWithToolTip;
