import { DocumentIcon } from '@sanity/icons/Document'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    // SECTION 1: HERO SECTION
    defineField({
      name: 'heroSection',
      title: 'SECTION 1: HERO SECTION',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
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
          name: 'headline',
          title: 'Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'localeString',
        }),
      ],
    }),

    // SECTION 2: WEDDING SERVICES CAROUSEL
    defineField({
      name: 'weddingCarouselSection',
      title: 'SECTION 2: WEDDING SERVICES CAROUSEL',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'sectionCategory',
          title: 'Section Category',
          type: 'localeString',
          initialValue: {
            en: 'Wedding',
            vi: 'Đám cưới',
          },
        }),
        defineField({
          name: 'sectionHeadline',
          title: 'Section Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'weddingServices',
          title: 'Wedding Services List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'serviceItem' }],
              options: {
                // Filter to only show services categorized as Wedding
                filter: 'category == "Wedding"',
              },
            }),
          ],
        }),
      ],
    }),

    // SECTION 3: EVENT SERVICES CAROUSEL
    defineField({
      name: 'eventCarouselSection',
      title: 'SECTION 3: EVENT SERVICES CAROUSEL',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'sectionCategory',
          title: 'Section Category',
          type: 'localeString',
          initialValue: {
            en: 'Event',
            vi: 'Sự kiện',
          },
        }),
        defineField({
          name: 'sectionHeadline',
          title: 'Section Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'eventServices',
          title: 'Event Services List',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'reference',
              to: [{ type: 'serviceItem' }],
              options: {
                // Filter to only show services categorized as Event
                filter: 'category == "Event"',
              },
            }),
          ],
        }),
      ],
    }),

    // SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ)
    defineField({
      name: 'faqSection',
      title: 'SECTION 4: FREQUENTLY ASKED QUESTIONS (FAQ)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'categoryTag',
          title: 'Category Tag',
          type: 'localeString',
          initialValue: {
            en: 'Frequently asked questions',
            vi: 'Câu hỏi thường gặp',
          },
        }),
        defineField({
          name: 'mainHeadline',
          title: 'Main Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'localeString',
        }),
        defineField({
          name: 'weddingFaqs',
          title: 'Wedding FAQs',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'faqItem',
              title: 'FAQ Item',
              type: 'object',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'localeString', validation: (r) => r.required() }),
                defineField({ name: 'answer', title: 'Answer', type: 'localeText', validation: (r) => r.required() }),
              ],
              preview: {
                select: {
                  title: 'question.en',
                },
              },
            }),
          ],
        }),
        defineField({
          name: 'eventFaqs',
          title: 'Event FAQs',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'faqItem',
              title: 'FAQ Item',
              type: 'object',
              fields: [
                defineField({ name: 'question', title: 'Question', type: 'localeString', validation: (r) => r.required() }),
                defineField({ name: 'answer', title: 'Answer', type: 'localeText', validation: (r) => r.required() }),
              ],
              preview: {
                select: {
                  title: 'question.en',
                },
              },
            }),
          ],
        }),
      ],
    }),

    // SECTION 5: BOTTOM CONTACT BANNER
    defineField({
      name: 'preFooterCtaSection',
      title: 'SECTION 5: BOTTOM CONTACT BANNER',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
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
          name: 'headline',
          title: 'Banner Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'link', title: 'Link (URL)', type: 'string', validation: (r) => r.required() }),
          ],
        }),
      ],
    }),

    // SEO Section
    defineField({
      name: 'seoTitle',
      title: 'SEO Page Title',
      type: 'localeString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Page Description',
      type: 'localeText',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'heroSection.headline.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Services Page Content',
        media: DocumentIcon,
      }
    },
  },
})
