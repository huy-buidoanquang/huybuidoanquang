# Sửa nội dung và ảnh bằng GitHub

Website này dùng các tệp trong repository làm nguồn nội dung. Không cần đăng nhập vào một trang quản trị riêng.

## Thay thông tin cá nhân

Mở `src/data/profile.json` trên GitHub, bấm biểu tượng bút chì, sửa tên, lời giới thiệu, email và liên kết mạng xã hội. Giữ dấu ngoặc kép và dấu phẩy đúng như mẫu, rồi chọn **Commit changes** vào một nhánh mới.

Để hiện ảnh cá nhân ở trang portfolio, tải ảnh dọc WebP hoặc JPEG vào thư mục `public/`, ví dụ `public/portrait.webp`. Trong `src/data/profile.json`, sửa `"portrait": ""` thành `"portrait": "/portrait.webp"` và viết `portraitAlt` mô tả bức ảnh. Trang chủ sẽ đặt ảnh lớn cạnh phần giới thiệu; khi trường `portrait` để trống, vị trí ảnh sẽ không xuất hiện. Ảnh rộng khoảng 1200–1600 px là đủ cho bản xem trước.

## Sửa hoặc thêm bài viết

- Bài blog: `src/content/posts/` (bài ảnh riêng dùng `.mdx`)
- Dự án: `src/content/projects/`
- Địa điểm: `src/content/destinations/`

Mở tệp `.md` hoặc `.mdx` và bấm bút chì để sửa. Phần giữa hai dòng `---` là thông tin hiển thị ở danh sách; nội dung bài bắt đầu sau dòng `---` thứ hai. Để thêm bài thường, sao chép một tệp `.md`; để thêm bài ảnh theo địa điểm, sao chép một tệp `.mdx`. Đặt tên ngắn không dấu như `chuyen-di-da-lat.mdx`. Tên tệp trở thành đường dẫn trang.

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

Mỗi bài có thể chọn `storyStyle: "mist"` (chữ serif, ảnh rải thoáng), `storyStyle: "lantern"` (chữ đậm, ảnh ghép dày) hoặc `storyStyle: "studio"` (bài kỹ thuật gọn). Bộ ảnh `gallery` nhận bao nhiêu ảnh tùy bài; thêm một mục cho mỗi ảnh:

```yaml
gallery:
  - src: "../../assets/ten-anh-01.webp"
    alt: "Mô tả chính xác nội dung ảnh"
    caption: "Chú thích ngắn"
  - src: "../../assets/ten-anh-02.webp"
    alt: "Mô tả ảnh thứ hai"
```

Ảnh của người khác nên có thêm `credit` và `source` (URL trang nguồn). Khi bắt đầu một địa điểm mới, hãy làm theo [quy trình nghiên cứu và đo ảnh](docs/art-direction/README.md) trước khi chọn nhịp chữ, màu và cách ghép ảnh. Các style có sẵn là điểm bắt đầu; một bài quan trọng có thể được thiết kế riêng trong mã nguồn.

Trong bài `.mdx`, đặt ảnh ngay giữa các đoạn chữ bằng `<Photo src={tenAnh} alt="..." caption="..." />`. Đặt hai ảnh trong `<PhotoPair>...</PhotoPair>` để ghép cạnh nhau. Sao chép các dòng `import` ở đầu bài mẫu rồi đổi tên tệp ảnh; số ảnh tùy ý. Nhấn ảnh để xem lớn, dùng phím mũi tên để chuyển ảnh và Esc để đóng.

## Thay ảnh

Tải ảnh lên `src/assets/` bằng **Add file → Upload files** trên GitHub. Nên dùng JPEG/WebP cho ảnh chụp; đặt tên chữ thường, không dấu, ví dụ `hoi-an-dem.webp`. Sửa `cover` trong tệp bài viết để trỏ tới ảnh đó. Luôn viết `coverAlt` mô tả nội dung ảnh. Ảnh mẫu trong `src/assets/` chỉ để thử giao diện; hãy thay trước khi xuất bản công khai.

Ba chương đầu dùng ảnh thiên văn thật `src/assets/milkyway-desert.webp`; từ chương chuyến đi, nền chuyển sang ảnh chụp Đà Lạt `src/assets/dalat-aerial.webp`. Để đổi một trong hai nền, tải ảnh WebP mới vào `src/assets/`, rồi sửa tên trong `src/styles/experience.css`. Chọn ảnh ngang, nén trước khi tải lên và cập nhật ghi công ảnh trong trang nếu ảnh không phải của bạn.

## Xem trước và xuất bản

Commit thay đổi vào nhánh mới, mở pull request và dùng đường dẫn preview của Cloudflare Pages để xem bài, ảnh, điện thoại và chính tả. Khi đúng ý, merge vào nhánh chính để Pages tự build lại. Nếu chưa kết nối GitHub với Pages, chạy `npm install` và `npm run dev` trên máy có Node.js tương thích để xem tại địa chỉ Astro in ra.
