require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs")
const pool = require('./db/db.js');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const { authMiddleware } = require('./middleware/auth.js');

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

app.get("/api/user", authMiddleware, async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const result = await pool.query(
            "SELECT id, email, privilege FROM users WHERE id = $1",
            [req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("USER ROUTE ERROR:", err);
        res.status(500).json({ message: "Server error" });
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
        return res.status(400).json({ message: "Email required" });
    }
    if (!password){
        return res.status(400).json({ message: "Password required" });
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
            const token = jwt.sign(
                { userId: user.id, email: user.email, privilege: user.privilege },
                JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.json({ 
                token,
                user: {
                    email: user.email,
                    name: user.name,
                    privilege: user.privilege || 'user'
                }
            });
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
        if (err.code === '23505') {
            return res.status(409).send("Email already in use");
        }

        console.error(err)
        res.status(500).send("Database Error")
    }
})

app.post("/api/create-event", async (req, res) => {

    const { title, date, time, location, description } = req.body;
    //If no time or date is stated then return ERROR 400 (Bad Request) stating the lack of such.
    if (time === null || date === null){
        res.status(400).json({message: "Missing Date or/and Time from event creation"})
    }

    const queryText = `INSERT INTO events (title, date ,time, location, description) VALUES ($1, $2, $3, $4, $5);`
    const values = [title, date, time, location, description];
    try{
        //Send the Query to the server 
        const result = await pool.query(queryText, values);
        //If successful move to this line and send a succesful message to the front end else you go to the catch error case
        res.status(201).json({ message: "Event created successfully.", eventId: result.rows[0]});
    }catch(err){
        //If there's an error in the query state it in the front end as a database error
        console.error("Error creating event:", err);
        res.status(500).json({ message: "Database error while creating event." });
    }
})

app.delete("/api/delete-event", async (req, res) =>{
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

app.get("/api/get-organizations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM organizations ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading organizations" });
  }
});

app.post("/api/create-organization", async (req, res) => {
  const { name, description, category, email } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Organization name is required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO organizations (name, description, category, email)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, description, category, email]
    );

    res.status(201).json({
      message: "Organization created successfully",
      organizationId: result.rows[0].id
    });
  } catch (err) {
    console.error("Error creating organization:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.delete("/api/delete-organization", async (req, res) => {
  const { id } = req.body;

  try {
    await pool.query("DELETE FROM organizations WHERE id = $1", [id]);
    res.json({ message: "Organization deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

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
