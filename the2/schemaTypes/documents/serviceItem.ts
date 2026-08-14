import { DocumentIcon } from '@sanity/icons/Document'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'serviceItem',
  title: 'Service Item',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'Wedding' },
          { title: 'Event', value: 'Event' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'localeText',
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
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
      name: 'modalDetails',
      title: 'Modal Details (Pop-up)',
      type: 'object',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'localeString',
          initialValue: {
            en: 'service details',
            vi: 'chi tiết dịch vụ',
          },
        }),
        defineField({
          name: 'fullDescription',
          title: 'Full Description Paragraphs',
          type: 'localeText',
        }),
        defineField({
          name: 'whoThisIsFor',
          title: 'Who This Is For (Bullet points)',
          type: 'array',
          of: [defineArrayMember({ type: 'localeString' })],
        }),
        defineField({
          name: 'scopeOfWork',
          title: 'Scope of Work (Checklist items)',
          type: 'array',
          of: [defineArrayMember({ type: 'localeString' })],
        }),
        defineField({
          name: 'benefits',
          title: 'Benefits (Key advantages)',
          type: 'array',
          of: [defineArrayMember({ type: 'localeString' })],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'category',
      media: 'cardImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Service',
        subtitle: subtitle || 'No Category',
        media: media || DocumentIcon,
      }
    },
  },
})
