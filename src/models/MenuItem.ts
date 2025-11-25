import { Schema, model, models } from "mongoose";

export interface MenuItem {
  _id: string;
  restaurantId: string;
  categoryId: string;
  name: {
    [key: string]: string; // pt, en, es, etc.
  };
  description: {
    [key: string]: string;
  };
  price: number;
  image?: string;
  tags: string[];
  allergens: string[];
  isAvailable: boolean;
  order: number;
  originalLanguage: string;
  lastTranslatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<MenuItem>(
  {
    restaurantId: {
      type: String,
      required: true,
      index: true,
    },

    categoryId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: Object,
      required: true,
    },

    description: {
      type: Object,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    allergens: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    originalLanguage: {
      type: String,
      default: "pt",
    },

    lastTranslatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const MenuItemModel =
  models.MenuItem || model<MenuItem>("MenuItem", MenuItemSchema);