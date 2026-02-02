# Y2K Portfolio Website

A modern portfolio website with a Y2K aesthetic, built with Next.js 16 and MongoDB. Features a complete admin dashboard for managing projects, skills, certifications, and social links.

## Features

- 🎨 Y2K-themed design with bold borders and bright colors
- 📱 Fully responsive layout
- 🔐 Secure admin authentication with JWT
- 📊 Complete CRUD operations for all content
- 🗄️ MongoDB database integration
- ⚡ Built with Next.js 16 App Router

## Getting Started

### Prerequisites

- Node.js 20+ 
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Required variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (generate a random string)

### Database Setup

Create an admin user to access the admin dashboard:

```bash
npm run seed:admin
```

This creates a default admin user with:
- Email: `admin@portfolio.com`
- Password: `admin123`

⚠️ **Change these credentials after first login!**

To create an admin with custom credentials:

```bash
ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npm run seed:admin
```

### Running the Development Server

### Running the Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## Project Structure

- `/app` - Next.js app router pages and API routes
  - `/admin` - Admin dashboard pages
  - `/api` - REST API endpoints
  - `/models` - MongoDB schemas
- `/components` - React components organized by feature
- `/lib` - Utility functions and configurations
- `/public` - Static assets
- `/scripts` - Database seed scripts

## Admin Dashboard

The admin dashboard provides full CRUD functionality for:

- **Projects** - Portfolio projects with images, descriptions, and links
- **Skills** - Technical skills with categories and proficiency levels
- **Certifications** - Professional certifications with credentials
- **Social Links** - Social media and contact links

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed:admin` - Create admin user
- `npm run lint` - Run ESLint

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

MIT
