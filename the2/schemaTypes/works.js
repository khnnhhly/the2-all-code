import { defineType, defineField } from 'sanity'

export const works = defineType({
  name: 'works',
  title: '4. Dự án Đã Làm (Our Works)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên cặp đôi / Tên dự án',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Ảnh đại diện dự án (Thumbnail)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Bộ sưu tập toàn bộ ảnh của đám cưới này',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
  ],
})
