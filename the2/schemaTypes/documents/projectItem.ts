import { CaseIcon } from '@sanity/icons/Case'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'projectItem',
  title: 'Project Item',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title / Couple Name',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wedding', value: 'wedding' },
          { title: 'Events', value: 'events' },
          { title: 'Destination', value: 'destination' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'localeString',
      description: 'E.g. "Full wedding planning" / "Quy trình lên kế hoạch đám cưới toàn diện"',
    }),
    defineField({
      name: 'location',
      title: 'Location (e.g. Saigon, Phu Quoc)',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year (e.g. 2025, 2026)',
      type: 'string',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image (Grid Cover)',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
        }),
      ],
    }),

    // --- MODAL DETAIL CONTENT ---
    defineField({
      name: 'heroDetailImage',
      title: 'Modal Hero Detail Image',
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
      name: 'summaryQuote',
      title: 'Summary Quote',
      description: 'Italic quote describing the concept (e.g. "an intimate cross-cultural celebration...")',
      type: 'localeText',
    }),
    defineField({
      name: 'highlightFeedback',
      title: 'Highlight Feedback / Accent Quote',
      description: 'Red/Accent styled quote (e.g. "a day that felt exactly like us.")',
      type: 'localeString',
    }),
    defineField({
      name: 'galleryImages',
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
              type: 'localeString',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'closingThought',
      title: 'Closing Thought',
      description: 'E.g. "Each gallery is held together by real emotion, lived details..."',
      type: 'localeText',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localeString',
      initialValue: {
        en: 'start planning your story',
        vi: 'bắt đầu lên kế hoạch câu chuyện của bạn',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnailImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: subtitle ? subtitle.toUpperCase() : 'NO CATEGORY',
        media: media || CaseIcon,
      }
    },
  },
})
