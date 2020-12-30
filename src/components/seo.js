/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';

import { useGraphQL } from '../hooks';

function SEO({
  description = '',
  image,
  type,
  lang = 'en-AU',
  meta = [],
  title,
}) {
  const {
    site: { siteMetadata },
    ogImage,
  } = useGraphQL();

  const { pathname } = useLocation();

  const metaDescription = description || siteMetadata.description;
  const metaType = type || 'website';
  const metaUrl = `${siteMetadata.siteUrl}${pathname}`;
  const metaImage = `${siteMetadata.siteUrl}${image || ogImage.publicURL}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: metaType,
        },
        {
          property: 'og:url',
          content: metaUrl,
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export { SEO };
