# CMS và migrate nội dung

Studio nay quản trị được: cài đặt thương hiệu, menu/footer, Home, About, từng Service, từng Project và Contact; tất cả có ảnh (alt text), CTA và SEO.

## Nhập nội dung hiện có

```bash
mkdir -p migration/source
cp migration/content.template.json migration/source/content.json
```

Điền text, URL ảnh gốc (hoặc đường dẫn ảnh local) và các slug liên kết trong `migration/source/content.json`, sau đó chạy:

```bash
npm run migrate:content
```

Script tải ảnh vào Sanity Asset Library, giữ ID ổn định cho các trang/dịch vụ/dự án và dùng `createOrReplace`; có thể chạy lại mà không tạo bản ghi trùng. Hãy kiểm tra alt text, slug, link menu/footer và SEO trong Studio trước khi xuất bản.
