---
title: "Tín Hiệu & Chuyển Động"
summary: "Nghiên cứu giao diện về nhịp cuộn, đường cong smoothstep và các chuyển động 3D tinh tế."
cover: "../../../assets/signal.svg"
coverAlt: "Những dải sóng tín hiệu uốn cong phát sáng trên nền tím sẫm"
theme: "night"
---

Chuyển động tốt hiếm khi phô trương. Thay vào đó, nó dẫn mắt người xem biết mình đang đứng ở đâu và trang đang mở ra không gian nào tiếp theo.

## Đo nhịp thay vì nhồi hiệu ứng

Hầu hết trải nghiệm cuộn bị rối khi hiệu ứng chống lại thao tác tay của người đọc. Ở đây, mọi bước chuyển nền đi qua một hàm smoothstep giới hạn chặt trong `0..1`, còn thẻ 3D và phối cảnh chiều sâu phản hồi mượt theo con trỏ chuột mà không gây giật khung hình.

## Khả năng tiếp cận là mặc định

Toàn bộ chuyển động 3D là lớp nâng cao tiến bộ: khi bật chế độ giảm chuyển động (`prefers-reduced-motion`) hoặc tắt JavaScript, mọi chương, hình ảnh và liên kết vẫn hiển thị đầy đủ và rõ ràng.
