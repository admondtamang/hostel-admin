import React from 'react';

import BlogPreviewTLTR from '@molecules/BlogPreview/TLTR';

import { IBlog } from '@particles/interface/blogEditContent.interface';
import BlogPreviewParagraph from '@molecules/BlogPreview/Paragraph';
import BlogPreviewTOC from '@molecules/BlogPreview/TOC';
import BlogPreviewTitle from '@molecules/BlogPreview/title';
import BlogPreviewImage from '@molecules/BlogPreview/Image';
import BlogPreviewContent from '@molecules/BlogPreview/Content';
import BlogBuilderCTA from '@organisms/BlogBuilder/Content/CTA';
import BlogBuilderInfographics from '@organisms/BlogBuilder/Content/infographics';

const BlogPreviewBlogDetails: React.FC<Partial<IBlog>> = ({ content }) => {
  const tldr = content?.body?.[0]?.data;

  const initialParagraph = content?.body?.[1];

  const blogContentData = content?.body?.slice(2);

  return (
    <main className="w-full my-[22px]">
      {tldr && <BlogPreviewTLTR content={tldr as string} />}
      {initialParagraph && <BlogPreviewParagraph content={initialParagraph.data} />}
      {blogContentData && blogContentData.length > 0 && <BlogPreviewTOC content={blogContentData} />}
      {blogContentData &&
        blogContentData.length > 0 &&
        blogContentData.map((data, index) => {
          if (data.type === 'paragraph') {
            return <BlogPreviewParagraph key={`blogPreview-${index}`} content={data.data} />;
          }
          if (data.type === 'title') {
            return <BlogPreviewTitle key={`blogPreview-${index}`} content={data.data} />;
          }
          if (data.type === 'image') {
            return <BlogPreviewImage key={`blogPreview-${index}`} file={data.data} />;
          }
          if (data.type === 'embed') {
            return <BlogPreviewContent key={`blogPreview-${index}`} link={data.data} />;
          }
          if (data.type === 'employer-cta' || data.type === 'employee-cta') {
            return (
              <div key={`blogPreview-${index}`} className="mt-14">
                <BlogBuilderCTA data={data.data} />
              </div>
            );
          }
        })}
    </main>
  );
};

export default BlogPreviewBlogDetails;
