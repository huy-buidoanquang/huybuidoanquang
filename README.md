# Portfolio × Journal

Bản xem trước portfolio và blog cá nhân. Nội dung và ảnh hiện là mẫu; thay chúng theo [hướng dẫn chỉnh sửa](CONTENT_GUIDE.md).

## Chạy trên máy

Cần Node.js 22.23.4 trở lên.

```sh
npm install
npm run dev
```

`npm run check` kiểm tra mã và nội dung; `npm test` kiểm tra phép tính điều hướng cuộn; `npm run build` tạo website tĩnh trong `dist/`.

## Cloudflare Pages

Kết nối repository GitHub với Cloudflare Pages. Chọn nhánh chính, lệnh build `npm run build` và thư mục output `dist`. Pull request tạo bản preview để duyệt trước khi merge. Sau khi duyệt bản preview, thêm tên miền có sẵn trong phần Custom domains của Pages và đổi `site` trong `astro.config.mjs` từ `https://example.com` sang URL thật.

Trang chủ tải cảnh 3D sau nội dung chính. Thiết bị không hỗ trợ WebGL hoặc bật giảm chuyển động vẫn dùng được tất cả liên kết.
