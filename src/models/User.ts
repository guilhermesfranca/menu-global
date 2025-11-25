import { Schema, model, models } from "mongoose";

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: "ADMIN" | "MANAGER";
  restaurantId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER"],
      default: "MANAGER",
    },

    restaurantId: {
      type: String,
      index: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const UserModel = models.User || model<User>("User", UserSchema);