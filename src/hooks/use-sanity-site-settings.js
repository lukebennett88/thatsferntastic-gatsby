/**
 * Custom hook that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

 import { graphql, useStaticQuery } from 'gatsby';

 function useSanitySiteSettings() {
   return useStaticQuery(
     graphql`
       {
         sanitySiteSettings {
           title
           description
           siteUrl
           shareImage {
             asset {
               url
             }
           }
           socialLinks {
             _key
             socialNetwork
             link
           }
         }
       }
     `
   );
 }

 export { useSanitySiteSettings };
