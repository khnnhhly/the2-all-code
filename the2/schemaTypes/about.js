import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'aboutPage',
  title: '2. Về Chúng Tôi (About Us)',
  type: 'document',
  fields: [
    defineField({
      name: 'bannerImage',
      title: 'Ảnh Banner trang About',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'storyImage',
      title: 'Ảnh câu chuyện thương hiệu/Đội ngũ',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Nội dung giới thiệu',
      type: 'text',
    }),
  ],
})
