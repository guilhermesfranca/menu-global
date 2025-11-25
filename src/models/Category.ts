import { Schema, model, models } from "mongoose";

export interface Category {
  _id: string;
  restaurantId: string;
  name: {
    [key: string]: string; // pt, en, es, etc.
  };
  order: number;
  icon?: string;
}

const CategorySchema = new Schema<Category>(
  {
    restaurantId: {
      type: String,
      required: true,
      index: true, // mais rápido para filtrar categorias por restaurante
    },

    name: {
      type: Object,
      required: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    icon: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Evita recriar o model no Hot Reload do Next.js
export const CategoryModel =
  models.Category || model<Category>("Category", CategorySchema);
