import * as React from 'react';
import { graphql } from 'gatsby';
import SanityBlockContent from '@sanity/block-content-to-react';
import PropTypes from 'prop-types';

import { Layout, SEO } from '../components';

function SanityPageTemplate({ data }) {
  const { title, description, shareImage, content } = data.sanityPage;

  return (
    <Layout hasSidebar={false}>
      <SEO
        title={title}
        description={description}
        image={shareImage?.asset.url}
      />
      <article className="mx-auto max-w-prose">
        <h1 className="heading-1">{title}</h1>
        {content.map((c, index) => {
          if (c._type === 'richText')
            return (
              <SanityBlockContent
                key={index}
                blocks={c._rawBlockContent}
                imageOptions={{ w: 600, fit: 'max' }}
                renderContainerOnSingleChild
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
                className="mt-5 prose"
              />
            );
          return null;
        })}
      </article>
    </Layout>
  );
}

SanityPageTemplate.propTypes = {
  data: PropTypes.shape({
    sanityPage: PropTypes.object.isRequired,
  }),
};

const query = graphql`
  query($slug: String!) {
    sanityPage(slug: { current: { eq: $slug } }) {
      title
      description
      shareImage {
        asset {
          url
        }
      }
      content {
        ... on SanityRichText {
          _type
          _rawBlockContent
        }
      }
    }
  }
`;

export { SanityPageTemplate as default, query };
