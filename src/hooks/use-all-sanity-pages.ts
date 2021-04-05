import { graphql, useStaticQuery } from 'gatsby';

type SanityPage = {
  _id: string;
  slug: {
    current: string;
  };
  title: string;
};

type AllSanityPages = {
  nodes: Array<SanityPage>;
};

type AllSanityPageReturnType = {
  allSanityPage: AllSanityPages;
};

function useAllSanityPage(): AllSanityPages {
  const { allSanityPage } = useStaticQuery<AllSanityPageReturnType>(
    graphql`
      query AllSanityPageQuery {
        allSanityPage(sort: { order: ASC, fields: title }) {
          nodes {
            _id
            slug {
              current
            }
            title
          }
        }
      }
    `
  );
  return allSanityPage;
}

export {
  AllSanityPageReturnType,
  AllSanityPages,
  SanityPage,
  useAllSanityPage,
};
