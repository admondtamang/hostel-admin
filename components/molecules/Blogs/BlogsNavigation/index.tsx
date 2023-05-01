import React from 'react';

import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

import ChevonDownIcon from '@atoms/icons/Chevon-Down-Icon';

interface IBlogsNavigation {
  content: {
    title: string;
    link: string;
  }[];
}

const BlogsNavigation: React.FC<IBlogsNavigation> = ({ content }) => {
  const location = useLocation();

  return (
    <section className="flex gap-[6px] items-center">
      {content.map((value, index) => {
        const newSearchParams = new URLSearchParams(location.search);

        const paramsList = [];

        for (const valuesO of newSearchParams.keys()) {
          paramsList.push(valuesO);
        }

        newSearchParams.delete('content');

        return (
          <React.Fragment key={`${value.title}-${index}`}>
            <Link to={{ pathname: value.link, search: newSearchParams.toString() }}>
              <span
                className={clsx('text-caption', index === content.length - 1 ? 'text-neutral-900' : 'text-neutral-600')}
              >
                {value.title}
              </span>
            </Link>
            {index !== content.length - 1 && <ChevonDownIcon className="w-4 h-4 text-neutral-500 rotate-90" />}
          </React.Fragment>
        );
      })}
    </section>
  );
};

export default BlogsNavigation;
