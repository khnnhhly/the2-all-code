import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'contactFormBlock',
  title: 'Contact Form Block',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'formGreetingTitle',
      title: 'Form Greeting Title',
      type: 'localeString',
    }),
    defineField({
      name: 'formGreetingText',
      title: 'Form Greeting Paragraph',
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
      title: 'Response Notice Text',
      type: 'localeString',
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'formGreetingTitle.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Form Block',
        media: EnvelopeIcon,
      }
    },
  },
})
