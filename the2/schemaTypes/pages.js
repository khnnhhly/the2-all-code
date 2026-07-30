import {defineArrayMember, defineField, defineType} from 'sanity'
const textBlock = (name, title) => defineField({name, title, type: 'blockContent'})
const image = (name, title) => defineField({name, title, type: 'imageWithMeta'})
const responsiveImage = (name, title) => defineField({name, title, type: 'responsiveImage'})
const seo = () => defineField({name: 'seo', title: 'SEO', type: 'seo'})
const link = (name, title) => defineField({name, title, type: 'link'})

export const siteSettings = defineType({name: 'siteSettings', title: 'Cài đặt website', type: 'document', fields: [
  defineField({name: 'brandName', title: 'Tên thương hiệu', type: 'string', validation: (r) => r.required()}), defineField({name: 'tagline', title: 'Tagline', type: 'string'}), image('logo', 'Logo'), image('favicon', 'Favicon'), seo(),
  defineField({name: 'socialLinks', title: 'Mạng xã hội', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'platform', title: 'Nền tảng', type: 'string'}), defineField({name: 'url', title: 'URL', type: 'url'})]})]}),
  defineField({name: 'copyright', title: 'Bản quyền', type: 'string'}),
]})

export const navigation = defineType({name: 'navigation', title: 'Menu & Footer', type: 'document', fields: [
  defineField({name: 'announcement', title: 'Thông báo đầu trang', type: 'string'}), defineField({name: 'primaryLinks', title: 'Menu chính', type: 'array', of: [defineArrayMember({type: 'link'})]}), link('headerCta', 'Nút menu'),
  defineField({name: 'footerDescription', title: 'Mô tả footer', type: 'text', rows: 3}), defineField({name: 'footerColumns', title: 'Cột footer', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'title', title: 'Tiêu đề cột', type: 'string'}), defineField({name: 'links', title: 'Links', type: 'array', of: [defineArrayMember({type: 'link'})]})]})]}), link('footerCta', 'Nút footer'),
]})

export const home = defineType({name: 'homePage', title: 'Trang chủ', type: 'document', fields: [
  defineField({name: 'eyebrow', title: 'Nhãn Hero', type: 'string'}), defineField({name: 'heroTitle', title: 'Tiêu đề Hero', type: 'string', validation: (r) => r.required()}), defineField({name: 'heroSubtitle', title: 'Mô tả Hero', type: 'text', rows: 3}), responsiveImage('heroImage', 'Ảnh Hero: Desktop & Mobile'), link('primaryCta', 'Nút chính'), link('secondaryCta', 'Nút phụ'),
  defineField({name: 'introductionTitle', title: 'Tiêu đề giới thiệu', type: 'string'}), textBlock('introduction', 'Nội dung giới thiệu'), image('introductionImage', 'Ảnh giới thiệu'),
  defineField({name: 'servicesHeading', title: 'Tiêu đề dịch vụ', type: 'string'}), defineField({name: 'featuredServices', title: 'Dịch vụ nổi bật', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})]}),
  defineField({name: 'projectsHeading', title: 'Tiêu đề dự án', type: 'string'}), defineField({name: 'featuredProjects', title: 'Dự án nổi bật', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})]}),
  defineField({name: 'gallery', title: 'Gallery', type: 'array', of: [defineArrayMember({type: 'imageWithMeta'})], options: {layout: 'grid'}}), defineField({name: 'testimonial', title: 'Khách hàng nói gì', type: 'object', fields: [defineField({name: 'quote', title: 'Trích dẫn', type: 'text'}), defineField({name: 'name', title: 'Tên', type: 'string'}), defineField({name: 'role', title: 'Dự án', type: 'string'})]}), seo(),
], preview: {prepare: () => ({title: 'Trang chủ'})}})

export const about = defineType({name: 'aboutPage', title: 'Giới thiệu', type: 'document', fields: [
  defineField({name: 'heroTitle', title: 'Tiêu đề Hero', type: 'string', validation: (r) => r.required()}), defineField({name: 'heroSubtitle', title: 'Mô tả Hero', type: 'text'}), responsiveImage('heroImage', 'Ảnh Hero: Desktop & Mobile'), defineField({name: 'storyTitle', title: 'Tiêu đề câu chuyện', type: 'string'}), textBlock('story', 'Câu chuyện thương hiệu'), image('storyImage', 'Ảnh câu chuyện'),
  defineField({name: 'values', title: 'Giá trị cốt lõi', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'title', title: 'Tiêu đề', type: 'string'}), defineField({name: 'description', title: 'Mô tả', type: 'text'})]})]}), defineField({name: 'statistics', title: 'Chỉ số', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'value', title: 'Số liệu', type: 'string'}), defineField({name: 'label', title: 'Nhãn', type: 'string'})]})]}),
  defineField({name: 'team', title: 'Đội ngũ', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'name', title: 'Tên', type: 'string'}), defineField({name: 'role', title: 'Vai trò', type: 'string'}), defineField({name: 'bio', title: 'Giới thiệu', type: 'text'}), image('image', 'Ảnh') ]})]}), link('cta', 'Nút CTA'), seo(),
], preview: {prepare: () => ({title: 'Giới thiệu'})}})

export const servicesPage = defineType({name: 'servicesPage', title: 'Trang Dịch vụ', type: 'document', fields: [
  defineField({name: 'heroEyebrow', title: 'Nhãn Hero', type: 'string'}), defineField({name: 'heroTitle', title: 'Tiêu đề Hero', type: 'string', validation: (r) => r.required()}), defineField({name: 'heroSubtitle', title: 'Mô tả Hero', type: 'text', rows: 3}), responsiveImage('heroImage', 'Ảnh Hero: Desktop & Mobile'),
  defineField({name: 'introTitle', title: 'Tiêu đề phần giới thiệu', type: 'string'}), textBlock('intro', 'Nội dung giới thiệu'), image('introImage', 'Ảnh giới thiệu'),
  defineField({name: 'listTitle', title: 'Tiêu đề danh sách dịch vụ', type: 'string'}), defineField({name: 'services', title: 'Các dịch vụ hiển thị', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})], description: 'Để trống nếu frontend tự hiển thị toàn bộ dịch vụ'}),
  defineField({name: 'bannerTitle', title: 'Tiêu đề banner cuối trang', type: 'string'}), defineField({name: 'bannerText', title: 'Nội dung banner', type: 'text'}), responsiveImage('bannerImage', 'Ảnh banner: Desktop & Mobile'), link('cta', 'Nút liên hệ'), seo(),
], preview: {prepare: () => ({title: 'Trang Dịch vụ'})}})

export const service = defineType({name: 'service', title: 'Dịch vụ', type: 'document', fields: [
  defineField({name: 'title', title: 'Tên dịch vụ', type: 'string', validation: (r) => r.required()}), defineField({name: 'slug', title: 'Slug URL', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}), defineField({name: 'order', title: 'Thứ tự', type: 'number', initialValue: 10}), defineField({name: 'status', title: 'Trạng thái', type: 'string', options: {list: [{title: 'Hiển thị', value: 'published'}, {title: 'Ẩn', value: 'hidden'}], layout: 'radio'}, initialValue: 'published'}), image('coverImage', 'Ảnh cover'), defineField({name: 'summary', title: 'Mô tả ngắn', type: 'text'}), textBlock('body', 'Nội dung chi tiết'),
  defineField({name: 'includedItems', title: 'Hạng mục công việc', type: 'array', of: [defineArrayMember({type: 'string'})]}), defineField({name: 'process', title: 'Quy trình', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'title', title: 'Tên bước', type: 'string'}), defineField({name: 'description', title: 'Mô tả', type: 'text'})]})]}), defineField({name: 'gallery', title: 'Gallery', type: 'array', of: [defineArrayMember({type: 'imageWithMeta'})], options: {layout: 'grid'}}), defineField({name: 'relatedProjects', title: 'Dự án liên quan', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})]}), link('cta', 'Nút CTA'), seo(),
], preview: {select: {title: 'title', media: 'coverImage.image'}}})

export const project = defineType({name: 'project', title: 'Dự án', type: 'document', fields: [
  defineField({name: 'title', title: 'Tên dự án / cặp đôi', type: 'string', validation: (r) => r.required()}), defineField({name: 'slug', title: 'Slug URL', type: 'slug', options: {source: 'title'}, validation: (r) => r.required()}), defineField({name: 'eventDate', title: 'Ngày thực hiện', type: 'date'}), defineField({name: 'clientName', title: 'Khách hàng', type: 'string'}), defineField({name: 'location', title: 'Địa điểm', type: 'string'}), defineField({name: 'categories', title: 'Danh mục', type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}), defineField({name: 'services', title: 'Dịch vụ sử dụng', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})]}), image('coverImage', 'Ảnh cover'), defineField({name: 'intro', title: 'Mô tả ngắn', type: 'text'}), textBlock('story', 'Câu chuyện dự án'), defineField({name: 'gallery', title: 'Album ảnh', type: 'array', of: [defineArrayMember({type: 'imageWithMeta'})], options: {layout: 'grid'}}), defineField({name: 'credits', title: 'Đối tác', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'role', title: 'Hạng mục', type: 'string'}), defineField({name: 'name', title: 'Tên', type: 'string'}), defineField({name: 'url', title: 'URL', type: 'url'})]})]}), seo(),
], preview: {select: {title: 'title', subtitle: 'location', media: 'coverImage.image'}}})

export const worksPage = defineType({name: 'worksPage', title: 'Trang Dự án', type: 'document', fields: [
  defineField({name: 'heroEyebrow', title: 'Nhãn Hero', type: 'string'}), defineField({name: 'heroTitle', title: 'Tiêu đề Hero', type: 'string', validation: (r) => r.required()}), defineField({name: 'heroSubtitle', title: 'Mô tả Hero', type: 'text', rows: 3}), responsiveImage('heroImage', 'Ảnh Hero: Desktop & Mobile'),
  defineField({name: 'introTitle', title: 'Tiêu đề phần giới thiệu', type: 'string'}), textBlock('intro', 'Nội dung giới thiệu'), defineField({name: 'listTitle', title: 'Tiêu đề danh sách dự án', type: 'string'}),
  defineField({name: 'featuredProjects', title: 'Dự án ghim đầu trang', type: 'array', of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})]}),
  defineField({name: 'bannerTitle', title: 'Tiêu đề banner cuối trang', type: 'string'}), defineField({name: 'bannerText', title: 'Nội dung banner', type: 'text'}), responsiveImage('bannerImage', 'Ảnh banner: Desktop & Mobile'), link('cta', 'Nút liên hệ'), seo(),
], preview: {prepare: () => ({title: 'Trang Dự án'})}})

export const contact = defineType({name: 'contactPage', title: 'Liên hệ', type: 'document', fields: [
  defineField({name: 'heroTitle', title: 'Tiêu đề Hero', type: 'string', validation: (r) => r.required()}), defineField({name: 'heroSubtitle', title: 'Mô tả', type: 'text'}), responsiveImage('heroImage', 'Ảnh Hero: Desktop & Mobile'), defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.email()}), defineField({name: 'phone', title: 'Điện thoại', type: 'string'}), defineField({name: 'address', title: 'Địa chỉ', type: 'text'}), defineField({name: 'mapUrl', title: 'Bản đồ', type: 'url'}), defineField({name: 'businessHours', title: 'Giờ làm việc', type: 'array', of: [defineArrayMember({type: 'object', fields: [defineField({name: 'days', title: 'Ngày', type: 'string'}), defineField({name: 'hours', title: 'Giờ', type: 'string'})]})]}), defineField({name: 'formHeading', title: 'Tiêu đề form', type: 'string'}), defineField({name: 'formIntro', title: 'Mô tả form', type: 'text'}), defineField({name: 'formButtonLabel', title: 'Nhãn nút gửi', type: 'string', initialValue: 'Gửi yêu cầu'}), seo(),
], preview: {prepare: () => ({title: 'Liên hệ'})}})
