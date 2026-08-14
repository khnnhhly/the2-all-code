import { defineType, defineField } from 'sanity'
import { TranslateIcon } from '@sanity/icons/Translate'

export default defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'vi',
      title: 'Tiếng Việt',
      type: 'string',
    }),
  ],
})
