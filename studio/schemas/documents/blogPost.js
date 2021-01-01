import { BsPencilSquare as icon } from 'react-icons/bs';

export default {
  title: 'Blog Post',
  name: 'blogPost',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
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
    },
    {
      title: 'Post',
      name: 'content',
      type: 'richText',
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
