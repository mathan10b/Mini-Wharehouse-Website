const express = require("express");
const cors = require("cors");
const items = require("./routes/items");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", items);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`💡 Backend running at http://localhost:${PORT}`);
});
