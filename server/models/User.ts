import mongoose, { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string; // hashed
  role: "admin" | "teacher";
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher"], default: "teacher" },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
