# MediCare+ | Doctor Consulting & Healthcare Platform

MediCare+ is a full-stack digital telehealth and doctor consultation platform designed to seamlessly connect patients with verified doctors and specialists for on-demand consultations, appointment management, and virtual care.

---

## 🌟 Key Features

### 🩺 Patient Experience & Discovery
- **Modern Landing Interface**: High-performance UI built with Next.js (App Router), React 19, and Tailwind CSS.
- **Doctor Directory & Filtering**: Discover specialists by category, medical specialization, city, consultation fee range, and experience.
- **Search Capabilities**: Fast multi-field search across doctor names, specializations, and affiliated medical clinics/hospitals.
- **Appointment Scheduling**: Real-time slot availability checking, instant appointment booking, and booking conflict prevention.
- **Interactive Landing Elements**: Health category exploration, patient reviews & testimonials carousel, dynamic FAQ accordion, and booking CTA banners.

### 👨‍⚕️ Doctor Dashboard & Management
- **Doctor Profile & Verification**: Doctor credentials, bio, hospital affiliation, consultation pricing, and verified status management.
- **Appointment Lifecycle**: Track upcoming, active, completed, and cancelled appointments with patient history details.
- **Consultation Dashboard**: Summary metrics and dashboard analytics for patient flow and appointment volume.

### 🔐 Security & Architecture
- **Multi-Role Authentication**: Dedicated authentication flows for doctors and patients with JWT token generation and role-based access control (RBAC).
- **Google OAuth 2.0**: Seamless social login support using Passport.js with automatic role detection and secure callback handling.
- **Unified API Response Envelope**: Consistent response formatting middleware (`res.ok`, `res.created`, `res.badRequest`, `res.unauthorized`, `res.notFound`, `res.serverError`).
- **Data Validation & Sanitization**: Comprehensive request payload and query validation powered by `express-validator`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Lucide React, Radix UI / shadcn/ui components, date-fns |
| **Backend** | Node.js, Express.js 5, Mongoose / MongoDB Atlas, Passport.js, JWT, bcryptjs |
| **Security & Utilities** | Helmet, CORS, Morgan logging, Express-Validator |

---

## 📁 Project Structure

```text
Doctor_Consulting_Platform/
├── frontend/                     # Next.js frontend application
│   ├── src/
│   │   ├── app/                  # App Router pages and layouts
│   │   │   ├── auth/             # Authentication pages (login/register/callback)
│   │   │   └── page.tsx          # Landing hero and home page
│   │   ├── components/           # Reusable UI components & layouts
│   │   │   ├── Header.tsx        # Responsive navigation bar
│   │   │   ├── LandingHero.tsx   # Hero showcase & booking call-to-action
│   │   │   ├── CategoryCard.tsx  # Specialization / department cards
│   │   │   ├── Testimonials.tsx  # Patient reviews section
│   │   │   ├── Faq.tsx           # Frequently asked questions accordion
│   │   │   └── Footer.tsx        # Platform footer
│   │   └── lib/                  # Utility helpers and UI configuration
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                      # Express.js REST API server
│   ├── config/
│   │   └── passport.js           # Google OAuth 2.0 strategy configuration
│   ├── middleware/
│   │   ├── auth.js               # JWT verification & role authorization (RBAC)
│   │   ├── response.js           # Standardized API response helpers
│   │   └── validate.js           # Express-validator error handler
│   ├── modal/                    # Mongoose database models
│   │   ├── Doctor.js             # Doctor profile and credential schema
│   │   ├── Patient.js            # Patient profile schema
│   │   └── appointment.js        # Appointment and consultation schema
│   ├── routes/                   # API endpoint controllers
│   │   ├── auth.js               # Registration, login, and Google OAuth
│   │   ├── doctor.js             # Doctor directory, search, profile, & dashboard
│   │   ├── patient.js            # Patient profile and preferences
│   │   └── appointment.js        # Slot queries, booking, and teleconsultation
│   ├── server.js                 # Express server bootstrap & MongoDB connection
│   └── package.json
│
└── README.md
```

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/doctor/register` | Register a new doctor account | Public |
| `POST` | `/api/auth/doctor/login` | Authenticate doctor with email & password | Public |
| `POST` | `/api/auth/patient/register` | Register a new patient account | Public |
| `POST` | `/api/auth/patient/login` | Authenticate patient with email & password | Public |
| `GET` | `/api/auth/google` | Initiate Google OAuth 2.0 authentication | Public |
| `GET` | `/api/auth/google/callback`| Google OAuth callback and JWT issuance | Public |

### 👨‍⚕️ Doctors (`/api/doctor`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/doctor/list` | Filter & search doctors (specialization, city, fee, etc.) | Public |
| `GET` | `/api/doctor/me` | Retrieve currently logged-in doctor profile | Doctor |
| `PUT` | `/api/doctor/profile` | Update doctor profile and consultation information | Doctor |
| `GET` | `/api/doctor/dashboard` | Retrieve doctor consultation & appointment statistics | Doctor |
| `GET` | `/api/doctor/:doctorId` | Retrieve single doctor details by ID | Public |

### 🧑‍💼 Patients (`/api/patient`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/patient/me` | Retrieve currently logged-in patient profile | Patient |
| `PUT` | `/api/patient/profile` | Update patient personal details | Patient |

### 📅 Appointments (`/api/appointment`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/appointment/booked-slots/:doctorId/:date` | Get occupied time slots for a doctor on a specific date | Public |
| `POST` | `/api/appointment/book` | Book an appointment with a doctor | Patient |
| `GET` | `/api/appointment/patient` | Get all appointments for the authenticated patient | Patient |
| `GET` | `/api/appointment/doctor` | Get all appointments for the authenticated doctor | Doctor |
| `GET` | `/api/appointment/:id` | Fetch single appointment details | Authenticated |
| `GET` | `/api/appointment/join/:id` | Join consultation room / start session | Authenticated |
| `PUT` | `/api/appointment/end/:id` | Mark consultation completed and calculate duration | Authenticated |
| `PUT` | `/api/appointment/status/:id` | Update appointment status (confirmed, cancelled, etc.) | Doctor |

### 🩺 Health Check
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check and timestamp | Public |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster URI)
- Git

### 1. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ALLOWED_ORIGINS=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Google OAuth (Optional / For Social Auth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server with auto-reload
npm run dev
```
The backend server will run on `http://localhost:8000`.

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 License

This project is licensed under the ISC License.
