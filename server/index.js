import express from "express";
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
const JWT_SECRET=crypto.randomBytes(64).toString('hex');
const JWT_EXPIRY='1h';
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
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per 15 minutes
    message: {
        error: "Too many login attempts from this IP. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
/*
app.post("/request-otp", async (req, res) => {
    const { Email } = req.body;

    // Generate a 6-digit OTP
    const OTP = crypto.randomInt(100000, 999999);

    // Send OTP via email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "saimghafoor2649@gmail.com",
            pass: "oyha iowc cqsj mxyz",
        },
    });

    const mailOptions = {
        from: "saimghafoor2649@gmail.com",
        to: Email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${OTP}`,
    };

    try {
        await transporter.sendMail(mailOptions);

        // Temporarily store OTP in the database
        const sql = "INSERT INTO otp_store (Email, OTP) VALUES (?, ?) ON DUPLICATE KEY UPDATE OTP = ?";
        db.query(sql, [Email, OTP], (err) => {
            res.status(200).json({ message: "OTP sent successfully" });
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});
*/


// Verify OTP and Complete Registration
app.post("/register", (req, res) => {
    const { Name, Email, Password, ConfirmPassword } = req.body;

    // Check if passwords match
    if (Password !== ConfirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the password using bcrypt
    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Error while hashing password:", err);
            return res.status(500).json({ error: "Error while hashing password" });
        }

        // Insert user into the database
        const registerSql = "INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)";
        db.query(registerSql, [Name, Email, hashedPassword], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(200).json({ message: "User registered successfully" });
        });
    });
});


const failedLoginAttempts = new Map(); // Map to track failed attempts per email
const MAX_ATTEMPTS = 5; // Maximum failed attempts
const BLOCK_DURATION = 15 * 60 * 1000; // Block duration in milliseconds (15 minutes)
app.post("/login", (req, res) => {
    const { Email, Password } = req.body;

    const userAttempts = failedLoginAttempts.get(Email) || { attempts: 0, blockUntil: null };

    // Check if the user is currently blocked
    if (userAttempts.blockUntil && Date.now() < userAttempts.blockUntil) {
        return res.status(429).json({ error: "Too many failed login attempts. Please try again later." });
    }

    const sql = "SELECT * FROM user WHERE Email = ?";
    db.query(sql, [Email], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];
        bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) {
                console.log("Error while comparing passwords:", err);
                return res.status(500).json({ error: "Password comparison error" });
            }

            if (!isMatch) {
                // Increment failed attempts
                userAttempts.attempts += 1;

                if (userAttempts.attempts >= MAX_ATTEMPTS) {
                    // Block the user for a specified duration
                    userAttempts.blockUntil = Date.now() + BLOCK_DURATION;
                }

                failedLoginAttempts.set(Email, userAttempts);

                return res.status(401).json({
                    error: "Invalid password",
                    remainingAttempts: Math.max(0, MAX_ATTEMPTS - userAttempts.attempts),
                });
            }

            // Login successful, reset failed attempts
            failedLoginAttempts.delete(Email);

            const sessionToken = jwt.sign({ Email: user.Email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

            res.cookie('session', sessionToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000,
            });

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
app.get("/Customerform", (req, res) => {
    const sql = "SELECT * FROM customerinfo";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No customers found" });
        }
        return res.status(200).json(result); // Return the customer list
    });
});
app.put("/Customerform/:id", (req, res) => {
    const { id } = req.params;
    const { customername, customerphoneno } = req.body;
    const sql = "UPDATE customerinfo SET customername = ?, customerphoneno = ? WHERE customerid = ?";
    db.query(sql, [customername, customerphoneno, id], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Customer updated successfully" });
    });
});
app.delete("/Customerform/:id",(req,res)=>{
    const { id } = req.params;
    const { customername, customerphoneno } = req.body;
    const sql="Delete from customerinfo where customerid=?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json({ message: "Customer delete successfully" });
    });
});

app.post("/Productform",(req,res)=>{
    const sql="Insert into productinfo (`productname`) VALUES (?)";
    db.query(sql, [req.body.productname], (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        } else {
            return res.status(200).json({ message: "Product added successfully" });
        }
    });
});
app.get("/Productform", (req, res) => {
    const sql = "SELECT * FROM productinfo";

    db.query(sql, (err, result) => {
        if (err) {
            console.log("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "No product found" });
        }
        return res.status(200).json(result); // Return the customer list
    });
});
app.put("/Productform/:id", async (req, res) => {
    const { id } = req.params;
    const { productname } = req.body;
    
    if (!productname) {
      return res.status(400).json({ error: "Product name is required." });
    }
    
    try {
      const result = db.query("UPDATE productinfo SET productname = ? WHERE productid = ?", [productname, id]);
      if (err) {
        console.log("Database error:", err);
        return res.status(500).json({ error: "Database error" });
    }
    return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
app.post('/logout', (req, res) => {
  
    // Clear the 'session' cookie
    res.clearCookie('session');
    res.status(200).json({ message: 'Logged out successfully' });
});
  
app.listen(8081, () => {
    console.log("Server running on http://localhost:8081");
});
