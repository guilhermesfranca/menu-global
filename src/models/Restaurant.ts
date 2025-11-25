import { Schema, model, models } from "mongoose";

export interface Restaurant {
  _id: string;
  name: string;
  slug: string;
  primaryColor: string;
  logo: string;
  defaultLanguage: string;
  enabledLanguages: string[];
}

const RestaurantSchema = new Schema<Restaurant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    primaryColor: { type: String, default: "#667eea" },
    logo: { type: String, required: false },
    defaultLanguage: { type: String, default: "pt" },
    enabledLanguages: { type: [String], default: ["pt"] },
  },
  { timestamps: true }
);

// Evita recriar o modelo durante hot reload no Next.js
export const RestaurantModel =
  models.Restaurant || model<Restaurant>("Restaurant", RestaurantSchema);
