---
title: "Portfolio × Nhật ký"
summary: "Chính website song ngữ này — xây dựng bằng Astro, TypeScript, khí quyển 3D Canvas tự viết, chủ đề riêng cho từng chuyến đi và bản đồ hành trình Việt Nam trên Cloudflare Workers."
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

Trang web này bắt đầu từ một mong muốn đơn giản: xây một ngôi nhà cá nhân trên web vừa giàu không khí như một cuốn sách ảnh in, vừa nhẹ, tĩnh và tải tức thì.

## Khí quyển 3D tự viết, không gánh framework nặng

Thay vì nhồi các thư viện đồ họa nặng nề, lưới địa hình 3D ở trang chủ cùng khí quyển riêng của từng vùng đất (ánh sáng ven biển, biển mây trôi, cánh đào đá tháng Ba, đốm sáng rừng rêu) đều được vẽ bằng các engine `<canvas>` TypeScript thuần gọn nhẹ, tự tạm dừng khi đổi tab và tôn trọng `prefers-reduced-motion`.

## Song ngữ, kiểm định schema chặt chẽ & sẵn sàng mở rộng

Mọi bài viết và dự án đều là tệp Markdown/MDX thuần được kiểm tra bằng Zod ngay lúc build, xuất ra các trang HTML tĩnh song ngữ Anh (`/`) – Việt (`/vi/`) với bộ ảnh WebP tối ưu và triển khai trực tiếp lên **Cloudflare Workers Static Assets**.
