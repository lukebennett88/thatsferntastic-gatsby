import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

type OGImage = {
  publicURL: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
};

type OGImageQueryReturnType = {
  ogImage: OGImage;
};

function useOGImage(): OGImage {
  const { ogImage } = useStaticQuery<OGImageQueryReturnType>(
    graphql`
      query OGImageQuery {
        ogImage: file(relativePath: { eq: "og-image.png" }) {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 600, layout: CONSTRAINED)
          }
        }
      }
    `
  );
  return ogImage;
}

export { useOGImage };
export type { OGImage, OGImageQueryReturnType };
