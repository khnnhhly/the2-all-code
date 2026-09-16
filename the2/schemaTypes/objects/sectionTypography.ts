import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons/Text'

export default defineType({
  name: 'sectionTypography',
  title: 'Tùy chỉnh Font chữ & Cỡ chữ (Typography Settings)',
  type: 'object',
  icon: TextIcon,
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    // 1. Tiêu đề (Title / Headline)
    defineField({
      name: 'titleFontFamily',
      title: 'Font chữ tiêu đề (Title Font Family)',
      description: 'Chọn kiểu font chữ cho tiêu đề / headline của phần này',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default: Old Standard TT)', value: 'default' },
          { title: 'Old Standard TT (Cổ điển, sang trọng)', value: "'Old Standard TT', Georgia, serif" },
          { title: 'Playfair Display (Thanh lịch, hiện đại)', value: "'Playfair Display', Georgia, serif" },
          { title: 'Cormorant Garamond (Thơ mộng, chuẩn đám cưới cao cấp)', value: "'Cormorant Garamond', Georgia, serif" },
          { title: 'Cinzel (Hoàng gia, ấn tượng)', value: "'Cinzel', Georgia, serif" },
          { title: 'Mulish (Tối giản, hiện đại Sans-serif)', value: "'Mulish', Arial, sans-serif" },
          { title: 'Montserrat (Mạnh mẽ, sạch sẽ Sans-serif)', value: "'Montserrat', Arial, sans-serif" },
          { title: 'Mrs Saint Delafield (Chữ ký nghệ thuật / Viết tay)', value: "'Mrs Saint Delafield', cursive" },
          { title: 'Dancing Script (Viết tay mềm mại, nét rõ)', value: "'Dancing Script', cursive" },
          { title: 'Great Vibes (Viết tay lãng mạn)', value: "'Great Vibes', cursive" },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'titleFontSize',
      title: 'Cỡ chữ tiêu đề (Title Font Size)',
      description: 'Chọn mức cỡ chữ mong muốn',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default)', value: 'default' },
          { title: 'Nhỏ (Small ~ 22-26px)', value: 'clamp(1.25rem, 2.5vw, 1.65rem)' },
          { title: 'Vừa (Medium ~ 28-36px)', value: 'clamp(1.6rem, 3.5vw, 2.3rem)' },
          { title: 'Lớn (Large ~ 40-48px)', value: 'clamp(2rem, 4.5vw, 3.2rem)' },
          { title: 'Rất lớn (Extra Large ~ 52-64px)', value: 'clamp(2.5rem, 6vw, 4.2rem)' },
          { title: 'Khổng lồ (Huge / Banner ~ 70-90px)', value: 'clamp(3rem, 7.5vw, 5.5rem)' },
          { title: 'Tự nhập kích cỡ (Custom)', value: 'custom' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'titleCustomFontSize',
      title: 'Kích cỡ tự nhập (Title Custom Size)',
      description: 'Ví dụ: 36px, 2.4rem, 4.5vw (chỉ áp dụng khi chọn Tự nhập ở trên)',
      type: 'string',
      hidden: ({ parent }) => parent?.titleFontSize !== 'custom',
    }),
    defineField({
      name: 'titleColor',
      title: 'Màu chữ tiêu đề (Title Color)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default Charcoal #2a2526)', value: 'default' },
          { title: 'Màu đen đậm (#111111)', value: '#111111' },
          { title: 'Đỏ thương hiệu (#8e0413 Crimson)', value: '#8e0413' },
          { title: 'Trắng tinh (#ffffff White)', value: '#ffffff' },
          { title: 'Vàng Champagne (#ffd570 Gold)', value: '#ffd570' },
          { title: 'Xám khói nhạt (#8a8f98)', value: '#8a8f98' },
          { title: 'Tự nhập mã màu hex (Custom)', value: 'custom' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'titleCustomColor',
      title: 'Mã màu tùy chỉnh tiêu đề (Custom Hex Color)',
      description: 'Ví dụ: #a47148 hoặc rgba(0,0,0,0.85)',
      type: 'string',
      hidden: ({ parent }) => parent?.titleColor !== 'custom',
    }),

    // 2. Chữ viết tay / Script (cho thư ngỏ, chữ ký, quote)
    defineField({
      name: 'scriptFontFamily',
      title: 'Font chữ viết tay / nghệ thuật (Script Font Family)',
      description: 'Dành cho các dòng chữ ký, lời ngỏ mở đầu (Mrs Saint Delafield, Dancing Script, Great Vibes)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default: Mrs Saint Delafield)', value: 'default' },
          { title: 'Mrs Saint Delafield (Chữ ký thanh thoát)', value: "'Mrs Saint Delafield', cursive" },
          { title: 'Dancing Script (Viết tay mềm mại, hỗ trợ tiếng Việt)', value: "'Dancing Script', cursive" },
          { title: 'Great Vibes (Viết tay lãng mạn cổ điển)', value: "'Great Vibes', cursive" },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'scriptFontSize',
      title: 'Cỡ chữ viết tay / nghệ thuật (Script Font Size)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default)', value: 'default' },
          { title: 'Nhỏ (Small ~ 24px)', value: 'clamp(1.3rem, 2.5vw, 1.6rem)' },
          { title: 'Vừa (Medium ~ 32px)', value: 'clamp(1.7rem, 3.5vw, 2.2rem)' },
          { title: 'Lớn (Large ~ 42px)', value: 'clamp(2.2rem, 4.5vw, 2.8rem)' },
          { title: 'Rất lớn (Extra Large ~ 54px)', value: 'clamp(2.8rem, 6vw, 3.6rem)' },
          { title: 'Tự nhập kích cỡ (Custom)', value: 'custom' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'scriptCustomFontSize',
      title: 'Kích cỡ tự nhập chữ viết tay (Script Custom Size)',
      description: 'Ví dụ: 38px hoặc 2.5rem',
      type: 'string',
      hidden: ({ parent }) => parent?.scriptFontSize !== 'custom',
    }),

    // 3. Nội dung / Đoạn văn (Body / Paragraph)
    defineField({
      name: 'bodyFontFamily',
      title: 'Font chữ nội dung / mô tả (Body Font Family)',
      description: 'Chọn kiểu font chữ cho các đoạn văn, mô tả chi tiết',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default: Mulish)', value: 'default' },
          { title: 'Mulish (Hiện đại, nét sạch, dễ đọc)', value: "'Mulish', Arial, sans-serif" },
          { title: 'Montserrat (Gọn gàng, thanh thoát)', value: "'Montserrat', Arial, sans-serif" },
          { title: 'Old Standard TT (Cổ điển Serif)', value: "'Old Standard TT', Georgia, serif" },
          { title: 'Playfair Display (Sang trọng Serif)', value: "'Playfair Display', Georgia, serif" },
          { title: 'Cormorant Garamond (Thơ mộng Serif)', value: "'Cormorant Garamond', Georgia, serif" },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'bodyFontSize',
      title: 'Cỡ chữ nội dung / mô tả (Body Font Size)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default ~ 1rem / 16px)', value: 'default' },
          { title: 'Nhỏ (Small ~ 0.875rem / 14px)', value: '0.875rem' },
          { title: 'Vừa (Medium ~ 1rem / 16px)', value: '1rem' },
          { title: 'Lớn (Large ~ 1.125rem / 18px)', value: '1.125rem' },
          { title: 'Rất lớn (Extra Large ~ 1.25rem / 20px)', value: '1.25rem' },
          { title: 'Tự nhập kích cỡ (Custom)', value: 'custom' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'bodyCustomFontSize',
      title: 'Kích cỡ tự nhập nội dung (Body Custom Size)',
      description: 'Ví dụ: 17px hoặc 1.05rem',
      type: 'string',
      hidden: ({ parent }) => parent?.bodyFontSize !== 'custom',
    }),
    defineField({
      name: 'bodyColor',
      title: 'Màu chữ nội dung (Body Text Color)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default Muted / Charcoal)', value: 'default' },
          { title: 'Màu xám vừa (#555555)', value: '#555555' },
          { title: 'Màu than tối (#2a2526 Charcoal)', value: '#2a2526' },
          { title: 'Màu đen (#111111)', value: '#111111' },
          { title: 'Trắng tinh (#ffffff)', value: '#ffffff' },
          { title: 'Xám khói (#8a8f98)', value: '#8a8f98' },
          { title: 'Tự nhập mã màu (Custom)', value: 'custom' },
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'bodyCustomColor',
      title: 'Mã màu tùy chỉnh nội dung (Body Custom Color)',
      description: 'Ví dụ: #444444 hoặc rgba(255,255,255,0.85)',
      type: 'string',
      hidden: ({ parent }) => parent?.bodyColor !== 'custom',
    }),

    // 4. Canh lề văn bản (Alignment)
    defineField({
      name: 'textAlign',
      title: 'Canh lề chữ (Text Alignment)',
      type: 'string',
      options: {
        list: [
          { title: 'Mặc định (Default)', value: 'default' },
          { title: 'Căn giữa (Center)', value: 'center' },
          { title: 'Căn trái (Left)', value: 'left' },
          { title: 'Căn phải (Right)', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
  ],
})
