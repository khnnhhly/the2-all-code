import {defineField, defineType} from 'sanity'

export const imageWithMeta = defineType({name: 'imageWithMeta', title: 'Ảnh', type: 'object', fields: [
  defineField({name: 'image', title: 'Tệp ảnh', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
  defineField({name: 'alt', title: 'Mô tả ảnh (SEO)', type: 'string', validation: (r) => r.required().warning('Cần mô tả nội dung ảnh')}),
  defineField({name: 'caption', title: 'Chú thích', type: 'string'}),
], preview: {select: {title: 'alt', media: 'image'}}})

export const responsiveImage = defineType({name: 'responsiveImage', title: 'Ảnh responsive', type: 'object', fields: [
  defineField({name: 'desktop', title: 'Ảnh Desktop', type: 'imageWithMeta', validation: (r) => r.required()}),
  defineField({name: 'mobile', title: 'Ảnh Mobile', type: 'imageWithMeta', description: 'Không bắt buộc. Dùng ảnh dọc hoặc crop riêng cho điện thoại.'}),
], preview: {select: {title: 'desktop.alt', media: 'desktop.image'}}})

export const link = defineType({name: 'link', title: 'Liên kết / CTA', type: 'object', fields: [
  defineField({name: 'label', title: 'Nhãn', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'url', title: 'URL hoặc đường dẫn', type: 'string', validation: (r) => r.required()}),
  defineField({name: 'newTab', title: 'Mở tab mới', type: 'boolean', initialValue: false}),
]})

export const seo = defineType({name: 'seo', title: 'SEO', type: 'object', fields: [
  defineField({name: 'title', title: 'SEO title', type: 'string', validation: (r) => r.max(60).warning('Nên dưới 60 ký tự')}),
  defineField({name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (r) => r.max(160).warning('Nên dưới 160 ký tự')}),
  defineField({name: 'socialImage', title: 'Ảnh chia sẻ social', type: 'imageWithMeta'}),
  defineField({name: 'noIndex', title: 'Không index Google', type: 'boolean', initialValue: false}),
]})
