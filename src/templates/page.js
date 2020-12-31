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
              <div key={index} className="prose">
                <SanityBlockContent blocks={c._rawBlockContent} />
              </div>
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
