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

**Mezon.NET** là bộ SDK .NET mã nguồn mở được thiết kế theo nhiều gói tách lớp, phục vụ đồng thời cả lập trình viên viết Bot/Channel-App lẫn các ứng dụng UI/Client thời gian thực trên hệ sinh thái Mezon mà không phải đánh đổi sự gọn gàng.

## Kiến trúc bốn tầng rạch ròi

Thay vì gộp chung hợp đồng giao thức, xử lý socket tầng thấp và API cấp cao vào một thư viện cồng kềnh, toàn bộ hệ thống được tách thành bốn tầng rõ trách nhiệm:

- **`Mezon.Net.Sdk`** — Lớp facade thân thiện cho Bot và Channel-App (`MezonClient`, các thực thể `Clan`/`Channel`/`Role`/`Message`/`User`, Dependency Injection, sự kiện dạng quá khứ như `ChannelMessageReceived`, builder và tích hợp MMN/SSE).
- **`Mezon.Net.Mmn`** — Client kết nối node MMN qua gRPC cùng HTTP client hỗ trợ Zero-Knowledge (`ZK`) prove cho môi trường `.NET 6+`.
- **`Mezon.Net.Client`** — Engine socket đầy đủ (`cid` map, đóng gói `Envelope`, gọi API qua socket và toàn bộ sự kiện realtime trên `BaseMezonSocketClient`).
- **`Mezon.Net.Transport` & `Mezon.Net.Core`** — Lớp truyền tải linh hoạt hỗ trợ cả TCP lẫn WebSocket trên trình duyệt, đặt trên nền tảng Protobuf, contract và bản đồ giao thức dùng chung.

## Hai nhóm người dùng, hai điểm vào tinh gọn

Lập trình viên phát triển bot chỉ cần cài duy nhất gói **`Mezon.Net.Sdk`** để có trải nghiệm mạnh mẽ, định kiểu chặt chẽ. Trong khi đó, các đội xây dựng ứng dụng client chuyên sâu có thể làm việc trực tiếp với **`Mezon.Net.Client`** và **`Mezon.Net.Transport`** để kiểm soát trọn vẹn vòng đời kết nối.
