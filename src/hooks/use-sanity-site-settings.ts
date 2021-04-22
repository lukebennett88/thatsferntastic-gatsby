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
  bannerText: Array<string>;
  description: string;
  shareImage: ShareImage;
  siteUrl: string;
  socialLinks: Array<SocialLink>;
  title: string;
};

type SanitySiteSettingsReturnType = {
  sanitySiteSettings: SanitySiteSettings;
};

function useSanitySiteSettings(): SanitySiteSettings {
  const { sanitySiteSettings } = useStaticQuery<SanitySiteSettingsReturnType>(
    graphql`
      query SanitySiteSettingsQuery {
        sanitySiteSettings(_id: { eq: "siteSettings" }) {
          bannerText
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
          title
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
