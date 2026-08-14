import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    // 1. HERO SECTION
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
          name: 'title',
          title: 'Title',
          type: 'localeString',
          initialValue: {
            en: 'Contact us',
            vi: 'Liên hệ',
          },
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localeText',
        }),
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'localeString',
        }),
      ],
    }),

    // 2. INQUIRY FORM CONFIGURATION
    defineField({
      name: 'formConfig',
      title: 'SECTION 2: INQUIRY FORM CONFIGURATION',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'formGreetingTitle',
          title: 'Form Greeting Title',
          type: 'localeString',
        }),
        defineField({
          name: 'formGreetingText',
          title: 'Form Greeting Text',
          type: 'localeText',
        }),
        defineField({
          name: 'eventTypeOptions',
          title: 'Event Type Options (Selection Pills)',
          type: 'array',
          of: [defineArrayMember({ type: 'localeString' })],
        }),
        defineField({
          name: 'formFields',
          title: 'Form Fields Labels & Placeholders',
          type: 'object',
          fields: [
            defineField({ name: 'fullNameLabel', title: 'Full Name Label', type: 'localeString' }),
            defineField({ name: 'partnerNameLabel', title: 'Partner Name Label', type: 'localeString' }),
            defineField({ name: 'emailLabel', title: 'Email Label', type: 'localeString' }),
            defineField({ name: 'phoneLabel', title: 'Phone Label', type: 'localeString' }),
            defineField({ name: 'eventDateLabel', title: 'Event Date Label', type: 'localeString' }),
            defineField({ name: 'eventDatePlaceholder', title: 'Event Date Placeholder', type: 'localeString' }),
            defineField({ name: 'guestCountLabel', title: 'Guest Count Label', type: 'localeString' }),
            defineField({ name: 'guestCountPlaceholder', title: 'Guest Count Placeholder', type: 'localeString' }),
            defineField({ name: 'locationLabel', title: 'Location Label', type: 'localeString' }),
            defineField({ name: 'budgetLabel', title: 'Budget Label', type: 'localeString' }),
            defineField({ name: 'budgetPlaceholder', title: 'Budget Placeholder', type: 'localeString' }),
            defineField({ name: 'referralLabel', title: 'Referral Label', type: 'localeString' }),
            defineField({ name: 'storyLabel', title: 'Couple Story Label', type: 'localeString' }),
            defineField({ name: 'storyPlaceholder', title: 'Couple Story Placeholder', type: 'localeString' }),
          ],
        }),
        defineField({
          name: 'responseNotice',
          title: 'Response Time Notice',
          type: 'localeString',
        }),
        defineField({
          name: 'submitButtonLabel',
          title: 'Submit Button Label',
          type: 'localeString',
        }),
      ],
    }),

    // 3. BOTTOM IMAGE BANNER & FOOTER
    defineField({
      name: 'bottomBanner',
      title: 'SECTION 3: BOTTOM IMAGE BANNER & FOOTER',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'bgImage',
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
          title: 'Headline',
          type: 'localeString',
        }),
        defineField({
          name: 'subtext',
          title: 'Subtext',
          type: 'localeString',
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
      title: 'heroSection.title.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Page Content',
        media: EnvelopeIcon,
      }
    },
  },
})
