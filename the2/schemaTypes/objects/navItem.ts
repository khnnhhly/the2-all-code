import { LinkIcon } from '@sanity/icons/Link'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'newTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label.en',
      subtitle: 'url',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Nav Item',
        subtitle: subtitle || '/',
        media: LinkIcon,
      }
    },
  },
})
