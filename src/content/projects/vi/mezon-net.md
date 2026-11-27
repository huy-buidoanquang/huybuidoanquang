---
title: "Mezon.NET"
summary: "Bộ SDK .NET bốn tầng và socket engine thời gian thực cho nền tảng Mezon — kết nối Protobuf, TCP/WebSocket, gRPC MMN và Zero-Knowledge prove."
cover: "../../../assets/projects/mezon-net.svg"
coverAlt: "Sơ đồ kiến trúc bốn tầng của Mezon.NET gồm các lớp Sdk, Client và Mmn, Transport và Core"
theme: "night"
atmosphere: "spores"
repoUrl: "https://github.com/huy-buidoanquang/Mezon.NET"
stack: ["C#", ".NET 6+ / netstandard", "Protobuf", "gRPC", "TCP / WebSocket", "ZK Prove"]
year: "2025 – 2026"
role: "Kiến trúc hệ thống & SDK"
order: 1
---

**Mezon.NET** là bộ SDK .NET mã nguồn mở mình thiết kế theo nhiều gói tách lớp, phục vụ song song hai nhóm: người viết Bot/Channel-App muốn API ngắn gọn dễ dùng, và team xây dựng UI/Client thời gian thực cần can thiệp sâu vào socket.

## Bốn tầng tách biệt rõ trách nhiệm

Thay vì dồn tất cả từ contract, xử lý kết nối tầng thấp đến API viết bot vào một thư viện duy nhất, kiến trúc được chia thành bốn lớp rõ ràng:

- **`Mezon.Net.Sdk`** — Lớp facade gọn nhẹ cho Bot và Channel-App (`MezonClient`, các thực thể `Clan`/`Channel`/`Role`/`Message`/`User`, Dependency Injection, các sự kiện như `ChannelMessageReceived`, builder và tích hợp MMN/SSE).
- **`Mezon.Net.Mmn`** — Client kết nối node MMN qua gRPC kèm HTTP client hỗ trợ Zero-Knowledge (`ZK`) prove cho môi trường `.NET 6+`.
- **`Mezon.Net.Client`** — Engine socket đầy đủ (`cid` map, đóng gói `Envelope`, gọi API qua socket và toàn bộ luồng sự kiện realtime trên `BaseMezonSocketClient`).
- **`Mezon.Net.Transport` & `Mezon.Net.Core`** — Lớp truyền tải linh hoạt hỗ trợ cả TCP lẫn WebSocket trên trình duyệt, chạy trên nền Protobuf, contract và bản đồ giao thức dùng chung.

## Dùng đúng thứ mình cần

Nếu chỉ viết bot, bạn chỉ cần cài duy nhất gói **`Mezon.Net.Sdk`** — mọi phần phụ thuộc bên dưới được kéo theo tự động trong khi bề mặt API vẫn gọn và định kiểu chặt. Còn khi làm app desktop, mobile hay web client chuyên sâu, bạn có thể xuống thẳng **`Mezon.Net.Client`** và **`Mezon.Net.Transport`** để tự chủ toàn bộ vòng đời kết nối.
