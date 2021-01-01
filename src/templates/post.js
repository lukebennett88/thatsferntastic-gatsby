import * as React from 'react';
import { graphql } from 'gatsby';
import SanityBlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

import { Layout, SEO } from '../components';

function SanityBlogPostTemplate({ data }) {
  const { title, description, shareImage, content } = data.sanityBlogPost;
  return (
    <Layout hasSidebar={false}>
      <SEO
        title={title}
        description={description}
        image={shareImage?.asset.url}
      />
      <article className="mx-auto max-w-prose">
        <h1 className="heading-1">Blog post</h1>
        <SanityBlockContent
          blocks={content._rawBlockContent}
          renderContainerOnSingleChild
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset={process.env.GATSBY_SANITY_DATASET}
          className="mt-5 prose"
        />
      </article>
    </Layout>
  );
}

SanityBlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    sanityBlogPost: PropTypes.object.isRequired,
  }),
};

const query = graphql`
  query($slug: String!) {
    sanityBlogPost(slug: { current: { eq: $slug } }) {
      title
      description
      shareImage {
        asset {
          url
        }
      }
      content {
        _rawBlockContent
      }
    }
  }
`;

export { SanityBlogPostTemplate as default, query };
