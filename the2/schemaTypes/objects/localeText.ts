import { defineType, defineField } from 'sanity'
import { TranslateIcon } from '@sanity/icons/Translate'

export default defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'vi',
      title: 'Tiếng Việt',
      type: 'text',
      rows: 3,
    }),
  ],
})
