import { HomeIcon } from '@sanity/icons/Home'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading / Description',
      type: 'localeString',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call To Action Button',
      type: 'navItem',
    }),
  ],
  preview: {
    select: {
      title: 'headline.en',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Block (No Headline)',
        media: media || HomeIcon,
      }
    },
  },
})
