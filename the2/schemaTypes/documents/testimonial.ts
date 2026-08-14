import { defineType, defineField, defineArrayMember } from 'sanity'
import { CommentIcon } from '@sanity/icons/Comment'

export default defineType({
  name: 'testimonial',
  title: 'Customer Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Client Names',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceCategory',
      title: 'Service Category',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'shortQuote',
      title: 'Short Quote',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Banner)',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'detailedQuote',
      title: 'Detailed Quote',
      type: 'text',
    }),
    defineField({
      name: 'highlightQuote',
      title: 'Highlight Quote',
      type: 'string',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '/our-works',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'cardImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'No Names',
        subtitle: subtitle ? `Testimonial from ${subtitle}` : 'Testimonial',
        media: media,
      }
    },
  },
})
