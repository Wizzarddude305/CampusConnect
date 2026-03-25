require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/testRoutes");
const testDb = require("./routes/testDb");

app.get("/", (req, res) => {
    res.send("the server is running");
})

app.use("/api/testRoutes", testRoutes);
app.use("/api/testDb", testDb);

app.listen(3001, "127.0.0.1", () => {
    console.log("the server started on port 3001");
})
