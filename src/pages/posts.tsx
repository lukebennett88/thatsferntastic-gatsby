import { Link } from '@reach/router';
import SanityBlockContent from '@sanity/block-content-to-react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import { Layout, SEO } from '../components';

function BlogPostPage({ data }) {
  const { nodes: posts } = data.allSanityBlogPost;
  return (
    <Layout hasSidebar={false}>
      <SEO title="Blog" />
      <h1 className="heading-1">Blog Posts</h1>
      <ul className="relative grid pb-20 mx-auto mt-6 gap-y-10 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}

BlogPostPage.propTypes = {
  data: PropTypes.shape({
    allSanityBlogPost: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }),
};

function Post({ post }) {
  return (
    <Link
      aria-label={post.title}
      to={post.slug.current}
      className="w-full max-w-sm mx-auto transition duration-500 ease-in-out transform rounded-lg hover:-translate-y-1 focus:-translate-y-1 hover:shadow-lg group"
    >
      <div className="relative w-full">
        <article className="flex flex-col pb-3 bg-white rounded-lg shadow">
          <div className="relative h-0 rounded-t-md aspect-w-3 aspect-h-2">
            <img
              src={
                post.shareImage?.asset.url ||
                'https://cdn.sanity.io/images/vxhsnaeh/production/5b0f778989438587159b584d5258a65c73f0217b-1800x1200.png?rect=0,206,1800,813'
              }
              alt=""
              className="absolute inset-0 object-contain w-full h-full overflow-hidden rounded-t-lg"
            />
            <div className="absolute inset-0 text-white transition duration-300 ease-in-out bg-black bg-opacity-75 rounded-t-lg opacity-0 group-hover:opacity-100">
              <div className="absolute inset-0 flex items-center justify-center flex-1">
                Click to read post
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center flex-1 px-6 py-5 overflow-hidden">
            <h2 className="text-2xl heading-1">{post.title}</h2>
            {post.description ? (
              <p>{post.description}</p>
            ) : (
              <SanityBlockContent
                blocks={post.content._rawBlockContent
                  .filter((line) => line._type !== 'image')
                  .slice(0, 3)}
                renderContainerOnSingleChild
                projectId={process.env.GATSBY_SANITY_PROJECT_ID}
                dataset={process.env.GATSBY_SANITY_DATASET}
                className="mt-2 prose clamp-3"
              />
            )}
          </div>
        </article>
      </div>
    </Link>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.shape({
      _rawBlockContent: PropTypes.array.isRequired,
    }),
    description: PropTypes.string,
    shareImage: PropTypes.shape({
      asset: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    slug: PropTypes.shape({
      current: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
  }),
};

export const query = graphql`
  {
    allSanityBlogPost(sort: { fields: _updatedAt, order: ASC }) {
      nodes {
        _id
        content {
          _rawBlockContent
        }
        description
        shareImage {
          asset {
            url
          }
        }
        slug {
          current
        }
        title
      }
    }
  }
`;

export default BlogPostPage;
