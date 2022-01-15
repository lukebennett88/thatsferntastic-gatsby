import SanityBlockContent from '@sanity/block-content-to-react';
import { graphql } from 'gatsby';
import * as React from 'react';

import { Layout, SEO } from '../components';

type SanityPageTemplateProps = {
  data: SanityPage;
};

function SanityPageTemplate({
  data,
}: SanityPageTemplateProps): React.ReactElement {
  const { title, description, shareImage, content } = data.sanityPage;

  return (
    <Layout hasSidebar={false}>
      <SEO
        title={title}
        description={description || undefined}
        image={shareImage?.asset.url || undefined}
      />
      <article className="mx-auto max-w-prose">
        <h1 className="heading-1">{title}</h1>
        {content.map((c, index) => {
          if (c._type === 'richText') {
            return (
              <SanityBlockContent
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                blocks={c._rawBlockContent}
                imageOptions={{ w: 600, fit: 'max' }}
                renderContainerOnSingleChild
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
                className="mt-5 prose"
              />
            );
          }
          return null;
        })}
      </article>
    </Layout>
  );
}

type ShareImage = {
  asset: {
    url: string;
  };
};

type SanityPage = {
  sanityPage: {
    title: string;
    description: string | null;
    shareImage: ShareImage | null;
    content: Array<{
      _type: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _rawBlockContent: any[];
    }>;
  };
};

export const query = graphql`
  query ($slug: String!) {
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

export default SanityPageTemplate;
