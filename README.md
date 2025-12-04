# 🌍 MenuGlobal - Multilingual Digital Menu Platform

A SaaS platform that enables restaurants to create digital menus with AI-powered automatic translations into 9 languages.

## 📋 Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## 🎯 Overview

**MenuGlobal** is a web application designed to help restaurants in tourist destinations overcome language barriers by providing digital menus with instant translation capabilities.

### Target Users

1. **Restaurant Managers**: Create, manage, and translate menu items
2. **Restaurant Customers**: View menus in their preferred language via QR code
3. **System Administrators**: Manage restaurants and monitor platform usage

### Supported Languages

Portuguese (PT), English (EN), Spanish (ES), French (FR), Italian (IT), German (DE), Japanese (JA), Chinese (ZH), Korean (KO)

---

## 🔍 The Problem

Restaurants in tourist-heavy cities like Porto, Portugal face significant challenges:

- Most establishments offer menus only in Portuguese and English
- Language barriers frustrate international tourists (especially Asian and Eastern European visitors)
- Service staff spend excessive time explaining menu items
- Poor communication results in suboptimal customer experiences
- Manual translation of physical menus is time-consuming and expensive

---

## ✨ The Solution

MenuGlobal provides a comprehensive digital menu system with:

1. **AI-Powered Translation**: Automatic translation using OpenAI GPT-4o-mini API
2. **Instant Updates**: Changes to menu items reflect immediately across all languages
3. **QR Code Access**: Customers scan a QR code to access the menu on their devices
4. **Customization**: Restaurants can brand their menus with custom colors and logos
5. **Real-Time Management**: Easy-to-use dashboard for menu administration

---

## 🚀 Key Features

### Manager Features

- CRUD operations for menu items and categories
- One-click translation to 9 languages
- Image upload for menu items (Cloudinary integration)
- Toggle item availability (available/sold out)
- Automatic QR code generation
- Custom branding (colors, logo)
- Search and filter products

### Customer Features

- Language selector with 9 options
- Browse by category (tabs/sections)
- View item details (name, description, price, image)
- Visual indicators for dietary preferences (vegetarian, vegan, gluten-free)
- Allergen information display
- Mobile-optimized responsive design

### Admin Features (Future)

- Multi-restaurant management
- Usage analytics (views, language preferences)
- Role-based access control

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui** (component library)
- **React Query** (data fetching)

### Backend
- **Next.js API Routes**
- **Node.js 20+**
- **MongoDB** with Mongoose ODM
- **JWT** authentication (bcrypt + jsonwebtoken)

### External Services
- **OpenAI API** (GPT-4o-mini for translations)
- **Cloudinary** (image storage and optimization)
- **MongoDB Atlas** (managed database)
- **Vercel** (hosting and deployment)

---

## 🏗️ Architecture

### System Design
```
Client (Browser/Mobile)
    ↓
Next.js Frontend (React)
    ↓
Next.js API Routes (Backend)
    ↓
MongoDB (Data Storage)

External Services:
- OpenAI (Translation)
- Cloudinary (Images)
```

### User Flows

**Manager Flow: Adding a Menu Item**
1. Manager logs into dashboard
2. Clicks "Add Product"
3. Fills form (name, description, price, category, image)
4. Saves item (stored in Portuguese)
5. Clicks "Translate" button
6. System sends text to OpenAI API
7. Translations saved to database
8. Item now available in all 9 languages

**Customer Flow: Viewing Menu**
1. Customer scans QR code at restaurant table
2. Browser opens `menuglobal.app/{restaurant-slug}`
3. Menu loads with default language (Portuguese)
4. Customer selects preferred language from dropdown
5. All text updates to selected language
6. Customer browses categories and items

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- MongoDB Atlas account
- OpenAI API key
- Cloudinary account

### Installation
```bash
# Clone repository
git clone https://github.com/guilhermesfranca/menu-global.git
cd menu-global

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

### First-Time Setup

1. Create a MongoDB Atlas cluster (free tier)
2. Obtain OpenAI API key from platform.openai.com
3. Create Cloudinary account for image storage
4. Configure environment variables in `.env.local`
5. Run the application locally
6. Create first restaurant manually in MongoDB

---

## 📁 Project Structure
```
menu-global/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication pages
│   │   │   └── login/
│   │   ├── dashboard/           # Manager dashboard
│   │   │   ├── categorias/      # Categories management
│   │   │   ├── produtos/        # Products management
│   │   │   ├── configuracoes/   # Settings
│   │   │   └── qr-code/         # QR code generator
│   │   ├── [slug]/              # Public menu (dynamic route)
│   │   └── api/                 # API routes
│   │       ├── auth/            # Authentication endpoints
│   │       ├── restaurantes/    # Restaurant CRUD
│   │       ├── categorias/      # Categories CRUD
│   │       ├── produtos/        # Products CRUD
│   │       ├── traduzir/        # Translation service
│   │       ├── upload/          # Image upload
│   │       └── qr-code/         # QR generation
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── dashboard/           # Manager components
│   │   ├── cardapio/            # Public menu components
│   │   └── shared/              # Shared components
│   │
│   ├── lib/                     # Utility libraries
│   │   ├── mongodb.ts           # MongoDB connection
│   │   ├── auth.ts              # JWT helpers
│   │   ├── openai.ts            # OpenAI client
│   │   ├── cloudinary.ts        # Image upload
│   │   └── qrcode.ts            # QR generation
│   │
│   ├── models/                  # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Restaurant.ts
│   │   ├── Category.ts
│   │   ├── MenuItem.ts
│   │   └── TranslationCache.ts
│   │
│   ├── types/                   # TypeScript types
│   ├── hooks/                   # Custom React hooks
│   ├── context/                 # React Context providers
│   └── middleware.ts            # Route protection
│
├── public/                      # Static assets
├── .env.local                   # Environment variables
└── package.json
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login          # Login with email/password
POST   /api/auth/logout         # Logout (clear cookie)
GET    /api/auth/me             # Get current user
```

### Restaurants
```
GET    /api/restaurantes        # List all restaurants (admin)
POST   /api/restaurantes        # Create restaurant (admin)
GET    /api/restaurantes/:id    # Get restaurant details
PUT    /api/restaurantes/:id    # Update restaurant
DELETE /api/restaurantes/:id    # Delete restaurant
```

### Categories
```
GET    /api/categorias                    # List categories (by restaurant)
POST   /api/categorias                    # Create category
GET    /api/categorias/:id                # Get category
PUT    /api/categorias/:id                # Update category
DELETE /api/categorias/:id                # Delete category
```

### Products (Menu Items)
```
GET    /api/produtos                      # List products (with filters)
POST   /api/produtos                      # Create product
GET    /api/produtos/:id                  # Get product
PUT    /api/produtos/:id                  # Update product
DELETE /api/produtos/:id                  # Delete product
GET    /api/produtos/buscar?q=query       # Search products
PUT    /api/produtos/:id/disponibilidade  # Toggle availability
POST   /api/produtos/:id/traduzir         # Translate product
```

### Translation
```
POST   /api/traduzir              # Translate text
  Body: { text, sourceLang, targetLang }
```

### Upload
```
POST   /api/upload                # Upload image to Cloudinary
  Body: FormData with image file
```

### QR Code
```
POST   /api/qr-code               # Generate QR code
  Body: { url }
```

### Public (No Auth Required)
```
GET    /api/public/menu/:slug     # Get public menu by restaurant slug
```

---

## 🗄️ Database Schema

### User
```typescript
{
  _id: ObjectId
  email: string (unique)
  password: string (bcrypt hashed)
  name: string
  restaurantId: ObjectId (ref: Restaurant)
  createdAt: Date
}
```

### Restaurant
```typescript
{
  _id: ObjectId
  name: string
  slug: string (unique, URL-friendly)
  ownerId: ObjectId (ref: User)
  primaryColor: string (hex color)
  logo: string (Cloudinary URL)
  defaultLanguage: string (default: 'pt')
  enabledLanguages: string[] (e.g., ['pt', 'en', 'es'])
  createdAt: Date
  updatedAt: Date
}
```

### Category
```typescript
{
  _id: ObjectId
  restaurantId: ObjectId (ref: Restaurant)
  name: {
    pt: string
    en: string
    es: string
    fr: string
    it: string
    de: string
    ja: string
    zh: string
    ko: string
  }
  order: number (for sorting)
  icon: string (emoji or icon name)
  createdAt: Date
  updatedAt: Date
}
```

### MenuItem
```typescript
{
  _id: ObjectId
  restaurantId: ObjectId (ref: Restaurant)
  categoryId: ObjectId (ref: Category)
  name: {
    pt: string (required)
    en: string
    es: string
    fr: string
    it: string
    de: string
    ja: string
    zh: string
    ko: string
  }
  description: {
    pt: string
    en: string
    // ... same 9 languages
  }
  price: number
  image: string (Cloudinary URL)
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  allergens: string[] (e.g., ['gluten', 'lactose', 'nuts'])
  isAvailable: boolean (default: true)
  order: number
  createdAt: Date
  updatedAt: Date
}
```

### TranslationCache
```typescript
{
  _id: ObjectId
  text: string (original text)
  sourceLang: string (e.g., 'pt')
  targetLang: string (e.g., 'en')
  translatedText: string
  provider: 'openai' | 'google'
  createdAt: Date
}
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/menuglobal?retryWrites=true&w=majority

# JWT Secret (generate random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# OpenAI API
OPENAI_API_KEY=sk-proj-...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## 💻 Development Workflow

### Running Locally
```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Creating a New Restaurant

For MVP, restaurants are created manually:

1. Connect to MongoDB using MongoDB Compass or CLI
2. Insert document into `restaurants` collection:
```javascript
{
  name: "Bacalhau Dourado",
  slug: "bacalhau-dourado",
  ownerId: ObjectId("..."), // reference to User
  primaryColor: "#667eea",
  logo: "",
  defaultLanguage: "pt",
  enabledLanguages: ["pt", "en", "es", "fr", "it", "de", "ja", "zh", "ko"],
  createdAt: new Date()
}
```

3. Create user for the restaurant in `users` collection
4. Link `restaurantId` in user document

### Translation Strategy

**Optimization:**
- Check `TranslationCache` before calling OpenAI API
- Save all translations to cache for reuse
- Batch translate multiple items to reduce API calls

**API Usage:**
```typescript
// Example: Translating a menu item
const translation = await translateText(
  "Bacalhau à Brás", 
  "pt", 
  "ja"
);
// Returns: "バカリャウ・ア・ブラス"
```

---

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push to `main` branch
```bash
# Or deploy manually via CLI
npm install -g vercel
vercel --prod
```

### Environment Setup on Vercel

Add all environment variables from `.env.local` to Vercel project settings.

### Database

Use MongoDB Atlas with:
- M0 Cluster (free tier) for development
- M2+ Cluster for production (based on traffic)

---

## 🗺️ Roadmap

### MVP (Completed)
- [x] Project setup and architecture
- [ ] User authentication (JWT)
- [ ] Restaurant CRUD
- [ ] Category CRUD
- [ ] Product CRUD
- [ ] Image upload (Cloudinary)
- [ ] AI translation (OpenAI)
- [ ] Public menu view
- [ ] Language selector
- [ ] QR code generation

### Phase 2
- [ ] Drag-and-drop product reordering
- [ ] Advanced theme customization
- [ ] Analytics dashboard (views, popular items, language usage)
- [ ] Multiple users per restaurant
- [ ] Subscription plans (Stripe integration)

### Phase 3
- [ ] Mobile app (React Native)
- [ ] Integration with POS systems
- [ ] Customer reviews and ratings
- [ ] Menu recommendations (AI-powered)
- [ ] White-label solution for enterprises

---

## 📝 License

MIT License - see LICENSE file for details

---

## 👥 Contributing

This is currently a solo project by [@guilhermesfranca](https://github.com/guilhermesfranca).

Contributions, issues, and feature requests are welcome!

---

## 📧 Contact

Guilherme França - [@guilhermesfranca](https://github.com/guilhermesfranca)

Project Link: [https://github.com/guilhermesfranca/menu-global](https://github.com/guilhermesfranca/menu-global)

---

## 🙏 Acknowledgments

- Inspired by real-world challenges in Porto's restaurant industry
- Built with modern web technologies and AI-powered translation
- Designed for scalability and ease of use

---

**Built with ❤️ in Porto, Portugal**
