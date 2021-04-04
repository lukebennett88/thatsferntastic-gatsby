/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import { useGraphQL } from '../hooks';

function SEO({
  description = '',
  image,
  type,
  lang = 'en-AU',
  meta = [],
  title,
}) {
  const { sanitySiteSettings } = useGraphQL();

  const { pathname } = useLocation();

  const metaDescription = description || sanitySiteSettings.description;
  const metaType = type || 'website';
  const metaUrl = `${sanitySiteSettings.siteUrl}${pathname}`;

  let metaImage;
  // if an image is passed to the SEO component and it's on a separate domain, link to directly
  if (image && image.startsWith('https://')) metaImage = image;

  // if an image is passed to the SEO component and it's on our domain (e.g. it's an absolute path) prefix it with our domain
  if (image && !image.startsWith('https://'))
    metaImage = `${sanitySiteSettings.siteUrl}${
      image || sanitySiteSettings.shareImage.asset.url
    }`;

  // if no image is passed, use the image from Sanity CDN
  if (!image) metaImage = sanitySiteSettings.shareImage.asset.url;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${sanitySiteSettings.title}`}
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
          content: sanitySiteSettings.author,
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
  title: PropTypes.string,
};

export { SEO };
