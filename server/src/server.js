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

app.get("/api/test/users", (req,res) => {
    
})

app.post("/api/login", async (req, res)=>{
    const {email, password} = req.body
    try{
        const sql = "SELECT * FROM users WHERE email=$1 "
        const values = [email]
        const result = await pool.query(sql, values)

        if (!result.rows){
            res.status(404).send("User is not found")
            return
        }

        const valid = bcrypt.compare(password, result.rows[0].password_hash)

        if (valid){
            res.status(300).send("Logged in")
        }else{
            res.status(401).send("User password is incorrect")
        }

    }catch(err){
        console.error(err)
        res.status(500).send("Database Error")
    }
})

app.post("/api/signup", async (req, res) =>{
    const {email, password} = req.body 
    // Amount of scrambles to do in order to hash password
    // (10 is apparently industry standard being fast and secure)
    const saltRounds = 10
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const queryText = `INSERT INTO users (email, password_hash) VALUES ($1 , $2)
        RETURNING id;`
        const values = [email, hashedPassword]
        const result = await pool.query(queryText, values);
        console.log(result.rows[0])
        res.status(300).send(result.rows[0])
    }catch (err){
        //Uniqueness of Email Problem
        if (err.code === '23505') {
            return res.status(409).send("Email already in use");
        }
        console.error(err)
        res.status(500).send("Database Error")
    }
})

app.post("/api/update", async (req, res) =>{

})

const port = process.env.PORT || 3001
app.listen(port, "127.0.0.1", () => {
    console.log(`✅ the server started on port ${port}`);
})
