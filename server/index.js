import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ledger system"
});

// Checking database connection
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the MySQL database.");
});

app.post("/register", (req, res) => {
    const sql = "INSERT INTO user (`Name`, `Email`, `Password`, `ConfirmPassword`) VALUES (?,?,?,?)";

    // Hash the password using bcrypt
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        //if (err) return res.json("Error while hashing password");

        if (err) {
            console.log("Error while hashing password:", err);
            return res.status(500).json({ error: "Error while hashing password" });
        }
       

        db.query(sql, [ req.body.Name, req.body.Email,hash,hash], (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            } else {
                return res.status(200).json({ status: "User registered successfully", result });
            }
        });
    });
});
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE Email = ?";
    const { Email, Password } = req.body;

    db.query(sql, [Email], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check password
        const user = result[0];
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) {
                console.log("Error while comparing passwords:", err);
                return res.status(500).json({ error: "Password comparison error" });
            }
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid password" });
            }

            // Credentials are valid
            return res.status(200).json({ message: "Login successful" });
        });
    });
});
app.post("/Customerform",(req,res)=>{
    const sql="Insert into customerinfo (`customerid`, `customername`, `customerphoneno`) VALUES (?,?,?)";
    db.query(sql, [ req.body.customerid, req.body.customername,req.body.customerphoneno], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        } else {
            return res.status(200).json({ message: "Customer added successfully" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
