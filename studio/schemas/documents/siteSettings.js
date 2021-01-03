import { BsGearFill as icon } from 'react-icons/bs';

export default {
  title: 'Settings',
  name: 'siteSettings',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Default page title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Default page description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Site URL',
      name: 'siteUrl',
      type: 'string',
    },
    {
      title: 'Share image',
      name: 'shareImage',
      type: 'imageWithAltText',
    },
    {
      title: 'Social Links',
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLinks' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
};
