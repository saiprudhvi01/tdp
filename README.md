# TDP MLA Portal - Damacharla Janardhana Rao

A high-end, native-app-like MERN stack web application for Damacharla Janardhana Rao (MLA - Kondepi / Prakasam Region).

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React Icons
- **Backend**: Node.js, Express, MongoDB
- **Styling**: Tailwind CSS with custom glassmorphism design
- **Animations**: Framer Motion for smooth transitions

## Features

### User Features
- Language Switcher (English/Telugu)
- User Registration & Login
- Submit Complaints
- View Complaint Status
- Browse Completed Programs
- Responsive Design

### Admin Features
- Admin Login
- Manage Schedules/Programs
- Add/Edit/Delete Programs
- Upload Images for Programs
- Permanence Retention Checkbox (30-day auto-delete)
- Manage User Complaints
- Update Complaint Status
- Dashboard Statistics

## Design Specifications

### Color Palette
- Primary Yellow: #F4C400
- Deep Yellow: #E6B800
- Light Background: #FFF9E6
- White: #FFFFFF
- Background Gradient: linear-gradient(135deg, #FFFDF5 0%, #FFF6CC 35%, #FFE066 100%)

### Text Colors
- Primary Text: #1F2937
- Secondary Text: #4B5563
- Light Text: #6B7280

### Card Design
- Glassmorphism cards (rgba(255,255,255,0.85))
- Rounded 24px corners
- Subtle yellow borders (#F4C40020)
- Soft drop shadows

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm run install:all
   ```

2. **Configure Environment Variables**
   - Edit `backend/.env`:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/tdp-portal
     JWT_SECRET=tdp_mla_portal_secret_key_2024
     NODE_ENV=development
     ```

3. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Or update MONGODB_URI with your MongoDB Atlas connection string

4. **Run the Application**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) concurrently.

## Project Structure

```
tdp/
├── backend/
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   ├── uploads/        # Image uploads
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # Language context
│   │   └── main.jsx    # Entry point
│   └── public/
│       └── images/     # Static images
└── images/             # Source images
```

## Usage

### User Flow
1. Visit home page to see completed programs
2. Click floating chat button to raise complaints
3. Register/Login to submit complaints
4. Track complaint status in dashboard

### Admin Flow
1. Login to admin panel
2. View dashboard statistics
3. Add new programs with images
4. Set permanence option for posts
5. Manage and resolve complaints

## API Endpoints

### Authentication
- POST `/api/auth/user/register` - User registration
- POST `/api/auth/user/login` - User login
- POST `/api/auth/admin/login` - Admin login

### Schedules
- GET `/api/schedules` - Get all schedules
- POST `/api/schedules` - Create schedule (admin)
- PUT `/api/schedules/:id` - Update schedule (admin)
- DELETE `/api/schedules/:id` - Delete schedule (admin)

### Complaints
- POST `/api/complaints` - Submit complaint
- GET `/api/complaints` - Get all complaints
- PUT `/api/admin/complaints/:id` - Update complaint status (admin)

## Features in Detail

### Language Switcher
- Available on all pages
- Toggles between English and Telugu
- Includes cultural quotes

### Floating Chat Button
- Yellow (#F4C400) floating button
- Bottom-right corner
- Navigates to user login/complaint page

### Schedule Management
- Upload primary image, cover banner, and gallery
- Permanence checkbox for long-term posts
- Auto-delete after 30 days if not permanent
- Status tracking (upcoming, completed, ongoing)

### Complaint System
- Multiple categories (infrastructure, water, electricity, etc.)
- Status tracking (pending, in-progress, resolved, rejected)
- Admin response functionality

## Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

## Deployment

### Frontend (Vercel/Netlify)
1. Build frontend: `cd frontend && npm run build`
2. Deploy `dist` folder

### Backend (Render/Heroku)
1. Set environment variables
2. Deploy backend folder
3. Ensure MongoDB is accessible

## Notes
- Demo mode: Login works without backend for testing
- Images are included in `public/images/`
- Cultural overlays and backgrounds implemented
- Glassmorphism UI throughout
- Smooth page transitions with Framer Motion

## Credits
- Designed for Damacharla Janardhana Rao (MLA - Kondepi)
- Telugu Desam Party (TDP)
- Prakasam Region, Andhra Pradesh
