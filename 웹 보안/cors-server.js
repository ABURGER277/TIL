const express = require("express");
const cors = require("cors");

const app = express();

// CORS 설정
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // 허용할 클라이언트 Origin, localhost:5500은 응답하지 않는다.
    methods: ["GET", "POST"], // 허용할 HTTP 메서드
    allowedHeaders: ["Content-Type"], // 허용할 헤더
    credentials: true, // 인증 정보 허용 여부
  })
);

// JSON 본문 파싱
app.use(express.json());

// API 엔드포인트
app.post("/api/data", (req, res) => {
  console.log("Request received:", req.body);
  res.json({ message: "Hello, Client!" }); // JSON 응답
});

// 서버 실행
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
