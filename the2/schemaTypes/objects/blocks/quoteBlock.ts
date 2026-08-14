import { BlockquoteIcon } from '@sanity/icons/Blockquote'
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'quoteBlock',
  title: 'Text Quote / Feedback Block',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quoteText',
      title: 'Italic Story Quote / Paragraph',
      type: 'localeText',
    }),
    defineField({
      name: 'highlightFeedback',
      title: 'Highlight Feedback (Accent Color)',
      type: 'localeString',
    }),
    defineField({
      name: 'author',
      title: 'Author / Couple Names',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'author.en',
      subtitle: 'highlightFeedback.en',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Anonymous Quote',
        subtitle: subtitle || 'Text Quote',
        media: BlockquoteIcon,
      }
    },
  },
})
