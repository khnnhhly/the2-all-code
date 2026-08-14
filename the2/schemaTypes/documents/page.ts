import { DocumentIcon } from '@sanity/icons/Document'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English (EN)', value: 'en' },
          { title: 'Tiếng Việt (VI)', value: 'vi' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pageComponents',
      title: 'Page Components / Layout Blocks',
      type: 'pageComponents',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title Override',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description Override',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Page',
        subtitle: subtitle ? `Language: ${subtitle.toUpperCase()}` : 'No Language Set',
        media: DocumentIcon,
      }
    },
  },
})
