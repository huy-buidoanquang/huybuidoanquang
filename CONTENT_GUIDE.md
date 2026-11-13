# Sửa nội dung và ảnh bằng GitHub

Website này dùng các tệp trong repository làm nguồn nội dung. Không cần đăng nhập vào một trang quản trị riêng.

## Thay thông tin cá nhân

Mở `src/data/profile.json` trên GitHub, bấm biểu tượng bút chì, sửa tên, lời giới thiệu, email và liên kết mạng xã hội. Giữ dấu ngoặc kép và dấu phẩy đúng như mẫu, rồi chọn **Commit changes** vào một nhánh mới.

## Sửa hoặc thêm bài viết

- Bài blog: `src/content/posts/`
- Dự án: `src/content/projects/`
- Địa điểm: `src/content/destinations/`

Mở tệp `.md` và bấm bút chì để sửa. Phần giữa hai dòng `---` là thông tin hiển thị ở danh sách; nội dung bài bắt đầu sau dòng `---` thứ hai. Để thêm bài, sao chép một tệp mẫu, đặt tên ngắn không dấu như `chuyen-di-da-lat.md`, rồi thay toàn bộ nội dung mẫu. Tên tệp trở thành đường dẫn trang.

Ví dụ:

```md
---
title: "Một ngày ở Hội An"
summary: "Ánh đèn, con phố nhỏ và một buổi tối đáng nhớ."
date: 2026-11-14
category: "du-lich"
cover: "../../assets/hoi-an.jpg"
coverAlt: "Đèn lồng sáng trên một con phố Hội An"
theme: "sand"
---

Đây là đoạn mở đầu bài viết của tôi.
```

`theme` nhận `night`, `sand` hoặc `forest`. `category` nhận `du-lich`, `ky-thuat`, `nhiep-anh` hoặc `so-thich`. Nếu thiếu ảnh, mô tả ảnh, hoặc dùng giá trị không hợp lệ, build sẽ báo lỗi để bạn sửa trước khi đăng.

## Thay ảnh

Tải ảnh lên `src/assets/` bằng **Add file → Upload files** trên GitHub. Nên dùng JPEG/WebP cho ảnh chụp; đặt tên chữ thường, không dấu, ví dụ `hoi-an-dem.webp`. Sửa `cover` trong tệp bài viết để trỏ tới ảnh đó. Luôn viết `coverAlt` mô tả nội dung ảnh. Ảnh mẫu trong `src/assets/` chỉ để thử giao diện; hãy thay trước khi xuất bản công khai.

Ảnh nền trang chủ là `src/assets/forest-dawn.webp`; ảnh nền phần chuyến đi là `src/assets/mountain-valley.webp`. Để đổi chúng, tải ảnh WebP mới vào `src/assets/`, rồi mở `src/styles/experience.css` và thay tên trong hai dòng `url('../assets/...')`. Giữ ảnh ở chiều ngang, khoảng 1600 pixel rộng và nén trước khi tải lên để trang mở nhanh.

## Xem trước và xuất bản

Commit thay đổi vào nhánh mới, mở pull request và dùng đường dẫn preview của Cloudflare Pages để xem bài, ảnh, điện thoại và chính tả. Khi đúng ý, merge vào nhánh chính để Pages tự build lại. Nếu chưa kết nối GitHub với Pages, chạy `npm install` và `npm run dev` trên máy có Node.js tương thích để xem tại địa chỉ Astro in ra.
