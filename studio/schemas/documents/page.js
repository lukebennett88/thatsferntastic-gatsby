import { BsFileEarmarkPlus as icon } from 'react-icons/bs';

export default {
  title: 'Page',
  name: 'page',
  type: 'document',
  icon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Share image',
      name: 'shareImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          title: 'Alt text',
          name: 'alt',
          type: 'string',
        },
      ],
    },
    {
      title: 'Page sections',
      name: 'content',
      type: 'array',
      description: 'Add, edit, and reorder sections',
      of: [{ type: 'richText' }],
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
