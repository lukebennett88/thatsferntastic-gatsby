import { graphql, useStaticQuery } from 'gatsby';

type ShareImage = {
  asset: {
    url: string;
  };
};

type SocialLink = {
  _key: string;
  socialNetwork: string;
  link: string;
};

type SanitySiteSettings = {
  title: string;
  description: string;
  siteUrl: string;
  shareImage: ShareImage;
  socialLinks: Array<SocialLink>;
};

type SanitySiteSettingsReturnType = {
  sanitySiteSettings: SanitySiteSettings;
};

function useSanitySiteSettings(): SanitySiteSettings {
  const { sanitySiteSettings } = useStaticQuery<SanitySiteSettingsReturnType>(
    graphql`
      query SanitySiteSettingsQuery {
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
  return sanitySiteSettings;
}

export {
  SanitySiteSettings,
  SanitySiteSettingsReturnType,
  ShareImage,
  SocialLink,
  useSanitySiteSettings,
};
