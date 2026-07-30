import { defineType, defineField } from 'sanity'

export const home = defineType({
  name: 'homePage',
  title: '1. Trang Chủ (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Ảnh Banner chính (Hero Background)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroTitle',
      title: 'Dòng chữ Tiêu đề chính',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Dòng chữ Tiêu đề phụ',
      type: 'string',
    }),
  ],
})
