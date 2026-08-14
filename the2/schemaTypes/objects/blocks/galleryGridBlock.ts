import { ImagesIcon } from '@sanity/icons/Images'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'galleryGridBlock',
  title: 'Gallery Grid Block',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Block Title (Internal reference)',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Grid Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Grid', value: 'grid' },
          { title: 'Slideshow / Carousel', value: 'carousel' },
          { title: 'Masonry Collage', value: 'masonry' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
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
              type: 'localeString',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'galleryImages',
    },
    prepare({ title, images }) {
      const count = images ? images.length : 0
      return {
        title: title || 'Gallery Grid Block',
        subtitle: `${count} image${count !== 1 ? 's' : ''}`,
        media: ImagesIcon,
      }
    },
  },
})
