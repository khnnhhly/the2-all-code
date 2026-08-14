import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'regionGroup',
  title: 'Region Group',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'regionName',
      title: 'Region Name',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Locations in this Region',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'localeString',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'regionName.en',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled Region',
        media: EarthGlobeIcon,
      }
    },
  },
})
