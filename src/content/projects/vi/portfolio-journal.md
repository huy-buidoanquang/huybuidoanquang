---
title: "Portfolio × Nhật ký"
summary: "Chính website song ngữ này — dựng bằng Astro, TypeScript, hiệu ứng 3D Canvas tự viết, bản đồ hành trình Việt Nam và triển khai trên Cloudflare Workers."
cover: "../../../assets/cosmos-impasto.webp"
coverAlt: "Nền tranh sơn dầu bầu trời đêm phong cách impasto của trang chủ Portfolio và Nhật ký"
theme: "night"
atmosphere: "clouds"
repoUrl: "https://github.com/huy-buidoanquang/huybuidoanquang"
liveUrl: "https://huybuidoanquang.com"
stack: ["Astro", "TypeScript", "MDX", "3D Canvas", "Cloudflare Workers"]
year: "2026"
role: "Thiết kế, Lập trình & Nhiếp ảnh"
order: 4
---

Trang web này ra đời từ một mong muốn đơn giản: có một góc riêng trên mạng vừa lưu được dự án phần mềm, vừa đủ chỉn chu để xem ảnh các chuyến đi như một cuốn sách ảnh in — nhưng vẫn nhẹ và mở lên là đọc ngay.

## Hiệu ứng 3D tự viết, không kéo framework nặng

Thay vì cài các thư viện 3D nặng nề cho một trang tĩnh, lưới địa hình ở trang chủ và hiệu ứng nền riêng của từng chuyến đi (nắng biển, biển mây, cánh đào tháng Ba, đốm sáng rừng rêu) đều được vẽ bằng `<canvas>` TypeScript thuần, tự nghỉ khi chuyển tab và tôn trọng thiết lập `prefers-reduced-motion`.

## Song ngữ, kiểm tra dữ liệu chặt & dễ thêm bài mới

Mọi bài viết và dự án đều là tệp Markdown/MDX thuần có schema Zod kiểm tra ngay lúc build, xuất thẳng ra hai bộ trang tĩnh Anh (`/`) – Việt (`/vi/`) với ảnh WebP tối ưu và chạy trên **Cloudflare Workers Static Assets**.
