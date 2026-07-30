import { defineType, defineField } from 'sanity'

export const services = defineType({
  name: 'services',
  title: '3. Danh sách Dịch vụ (Services)',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceNumber',
      title: 'Số thứ tự dịch vụ (Ví dụ: 01)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Tên dịch vụ (Ví dụ: Wedding Planning)',
      type: 'string',
    }),
    defineField({
      name: 'bgImage',
      title: 'Ảnh nền dịch vụ',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'scopeOfWork',
      title: 'Các hạng mục công việc (Scope of Work)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
