/* eslint-disable import/no-unresolved */
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// import object schemas
import imageWithAltText from './images/imageWithAltText';
import blockContent from './arrays/blockContent';
import socialLinks from './objects/socialLinks';
import richText from './objects/richText';

// import document schemas
import blogPost from './documents/blogPost';
import page from './documents/page';
import siteSettings from './documents/siteSettings';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    imageWithAltText,
    blockContent,
    socialLinks,
    richText,
    // The following are document types which will appear
    // in the studio.
    blogPost,
    page,
    siteSettings,
  ]),
});
