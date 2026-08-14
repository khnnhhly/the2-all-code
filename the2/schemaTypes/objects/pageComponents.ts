import { UlistIcon } from '@sanity/icons/Ulist'
import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'pageComponents',
  title: 'Page Components',
  description: 'Flexible block components in ACF-builder style. Add, re-order, or delete component blocks.',
  type: 'array',
  icon: UlistIcon,
  of: [
    defineArrayMember({ type: 'heroBlock' }),
    defineArrayMember({ type: 'galleryGridBlock' }),
    defineArrayMember({ type: 'quoteBlock' }),
    defineArrayMember({ type: 'contactFormBlock' }),
  ],
})
