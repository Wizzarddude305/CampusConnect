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

app.get("/health", (req, res) => {
  res.status(200).send("healthy");
});

app.get("/api/test/users", (req,res) => {
    
})

app.get("/api/user", async (req, res) => {
    try {
        const userId = req.query.id || 1; // Default to user 1 for testing
        const result = await pool.query("SELECT id, email, privilege FROM users WHERE id = $1", [userId]);
        
        if (!result.rows) {
            return res.status(404).json({ message: "User not found." });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Unable to fetch user." });
    }
});

app.get("/api/get-events", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        console.error("Error loading events:", err);
        res.status(500).json({ message: "Unable to load events." });
    }
});

app.post("/api/login", async (req, res)=>{
    const {email, password} = req.body
    if (!email){
        console.error(err)
    }
    try{
        const sql = "SELECT * FROM users WHERE email=$1 "
        const values = [email]
        const result = await pool.query(sql, values)
        if (result.rows.length === 0){
            return res.status(404).json({ message: "User not found." });
        }

        const user = result.rows[0];
        const valid = await bcrypt.compare(password, user.password_hash)

        if (valid){
            return res.json({ email: user.email,name: user.name , privilege: user.privilege || 'user' });
        } else {
            return res.status(401).json({ message: "Invalid email or password." });
        }

    }catch(err){
        console.error(err)
        res.status(500).json({ message: "Database Error" })
    }
})

app.post("/api/signup", async (req, res) =>{
    const {email, password} = req.body 
    // Amount of scrambles to do in order to hash password
    // (10 is apparently industry standard being fast and secure)
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const queryText = `INSERT INTO users (email, password_hash) VALUES ($1 , $2);`
    const values = [email, hashedPassword]

    try{
        const result = await pool.query(queryText, values);
        res.status(300).send(result.rows[0])
    }catch(err){
        if (result.status === '23505') {
            return res.status(409).send("Email already in use");
        }

        console.error(err)
        res.status(500).send("Database Error")
    }
})

app.post("/api/create-event", async (req, res) => {
    const { title, date, time, location, description } = req.body;
    const queryText = `INSERT INTO events (title, date ,time, location, description) VALUES ($1, $2, $3, $4, $5);`
    const values = [title, date, time, location, description];
    try{
        const result = await pool.query(queryText, values);
        res.status(201).json({ message: "Event created successfully.", eventId: result.rows[0]});
    }catch(err){
        console.error("Error creating event:", err);
        res.status(500).json({ message: "Database error while creating event." });
    }
})

app.delete("/api/delete-event", async (req, res) =>{
    console.log(req.body)
    const {eventId}  = req.body; 
    const queryText = `DELETE FROM events WHERE id = $1`
    const values = [eventId]
     try{
        const result = await pool.query(queryText, values);
        res.status(200).json({ message: "Event Deleted successfully.", deltedEventId: result.rows[0]});
    }catch(err){
        console.error("Error deleting event:", err);
        res.status(500).json({ message: "Database error while creating event." });
    }
})

app.post("/api/update-event", async (req, res) =>{

})

app.post("/api/assign-privilege", async (req, res) => {
    const { userId, privilege } = req.body;

    if (!userId || !privilege) {
        return res.status(400).json({ message: "userId and privilege are required." });
    }

    const validPrivileges = ["user", "organization", "admin"];
    if (!validPrivileges.includes(privilege)) {
        return res.status(400).json({ message: "Invalid privilege. Must be one of: user, organization, admin." });
    }

    try {
        const result = await pool.query(
            "UPDATE users SET privilege = $1 WHERE id = $2 RETURNING id, email, privilege",
            [privilege, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "Privilege assigned successfully.", user: result.rows[0] });
    } catch (err) {
        console.error("Error assigning privilege:", err);
        res.status(500).json({ message: "Database error while assigning privilege." });
    }
});

const port = process.env.PORT || 3000
app.listen(port, "0.0.0.0", () => {
    console.log(`✅ the server started on port ${port}`);
})
