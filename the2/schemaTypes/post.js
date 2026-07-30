import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',        // Tên định danh của schema này (dùng để gọi trong code)
  title: 'Bài viết',    // Tên hiển thị trên giao diện Sanity Studio cho bạn nhìn
  type: 'document',    // Kiểu dữ liệu là một tài liệu độc lập
  fields: [
    // 1. Trường nhập Tiêu đề bài viết
    defineField({
      name: 'title',
      title: 'Tiêu đề bài viết',
      type: 'string',  // Kiểu chữ ngắn
      validation: (Rule) => Rule.required().error('Bắt buộc phải nhập tiêu đề!'),
    }),

    // 2. Trường tạo Đường dẫn (URL) tự động từ tiêu đề
    defineField({
      name: 'slug',
      title: 'Đường dẫn (Slug)',
      type: 'slug',
      options: {
        source: 'title', // Tự động lấy chữ từ ô 'title' chuyển thành dạng 'tieu-de-bai-viet'
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    // 3. Trường tải lên Ảnh đại diện (Cover Image)
    defineField({
      name: 'mainImage',
      title: 'Ảnh đại diện',
      type: 'image',   // Kiểu hình ảnh
      options: {
        hotspot: true, // Bật tính năng cắt ảnh, chọn tâm điểm ảnh trên giao diện
      },
    }),

    // 4. Trường viết Nội dung chính (Đây là nơi giữ Format của bạn)
    defineField({
      name: 'body',
      title: 'Nội dung bài viết',
      type: 'array',   // Kiểu mảng, cho phép trộn lẫn văn bản, ảnh, code...
      of: [
        { type: 'block' }, // Thẻ mặc định hỗ trợ Paragraph, H1, H2, H3, In đậm, In nghiêng
        { type: 'image' }  // Cho phép chèn ảnh trực tiếp vào giữa bài viết
      ],
    }),
  ],
})

export default post
