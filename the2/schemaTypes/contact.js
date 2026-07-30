import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contactPage',
  title: '5. Liên Hệ (Contact)',
  type: 'document',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Ảnh nền trang liên hệ',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Email liên hệ',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Số điện thoại',
      type: 'string',
    }),
  ],
})
