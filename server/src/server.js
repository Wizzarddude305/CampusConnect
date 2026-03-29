require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs")
const pool = require('./db/db.js');

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("the server is running");
})

app.get("/api/login", (req, res) =>{
    res.send("Login request detected")
})

app.get("/api/signup", (req, res) =>{
    res.send("Sign up request detected")
    
})

app.listen(3001, "127.0.0.1", () => {
    console.log("the server started on port 3001");
})
