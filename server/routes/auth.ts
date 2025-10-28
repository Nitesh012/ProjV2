import { RequestHandler } from "express";
import { connectMongo } from "../db";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ensureConfig = () => {
  if (!process.env.JWT_SECRET) return "JWT_SECRET not set";
  return null;
};

export const signup: RequestHandler = async (req, res) => {
  const cfgErr = ensureConfig();
  if (cfgErr) return res.status(503).json({ error: cfgErr });
  const db = await connectMongo();
  if (!db.connected) return res.status(503).json({ error: "Database not connected" });

  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role?: string;
  };
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

  const existing = await (User as any).findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already registered" });

  const hash = await bcrypt.hash(password, 10);
  const user = await (User as any).create({ name, email, password: hash, role: role === "admin" ? "admin" : "teacher" });
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!);
  return res.json({ token });
};

export const login: RequestHandler = async (req, res) => {
  const cfgErr = ensureConfig();
  if (cfgErr) return res.status(503).json({ error: cfgErr });
  const db = await connectMongo();
  if (!db.connected) return res.status(503).json({ error: "Database not connected" });

  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const user = await (User as any).findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!);
  return res.json({ token });
};
