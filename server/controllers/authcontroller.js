import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';

const JWT_SECRET = crypto.randomBytes(64).toString('hex');
const JWT_EXPIRY = '1h';

export const register = async (req, res) => {
  const { Name, Email, Password, ConfirmPassword } = req.body;
  if (Password !== ConfirmPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({ Name, Email, Password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ Email: user.Email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
    res.cookie("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("session");
  res.status(200).json({ message: "Logged out successfully" });
};
