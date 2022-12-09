const express = require("express");
const path = require("path");
const app = express();
const port = 5000; // 포트 넘버 설정

// 데이터 받아서 전송 예시
app.get("/api/check", (req, res) => {
  res.send("전송 성공");
});

app.listen(port, () => console.log(port));
