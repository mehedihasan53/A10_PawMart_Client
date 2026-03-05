# � PawMart - Modern Pet Adoption & Supply Platform

![PawMart Banner](https://img.shields.io/badge/PawMart-Pet--Adoption-orange?style=for-the-badge&logo=pawprint)
[![Live Site](https://img.shields.io/badge/Live-Website-EA580C?style=for-the-badge&logo=netlify)](https://animated-gingersnap-8dfbae.netlify.app/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6.0-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

PawMart is a comprehensive, full-stack pet marketplace that connects pet lovers with adoption opportunities and premium pet supplies. Built with modern React architecture, it features a sophisticated glassmorphism design system, advanced authentication, and powerful admin controls.

---

## 🌐 Live Demo & Links 

- **🚀 Live Website:** [PawMart Live](https://animated-gingersnap-8dfbae.netlify.app/)
- **📱 Client Repository:** [GitHub - Client](https://github.com/mehedihasan53/A10_PawMart_Client.git)
- **⚙️ Server Repository:** [GitHub - Server](https://github.com/mehedihasan53/A10_PawMart_Server.git)

---

## ✨ Core Features

### 🏠 **Homepage Experience**

- **Dynamic Hero Banner:** Animated banner with professional CSS animations and floating particles
- **Category Navigation:** Interactive pet category sections with glassmorphism design
- **Recent Listings:** Compact, modern cards showcasing latest pets and supplies
- **Pet Heroes Section:** Highlighting featured pets for adoption
- **Why Adopt Section:** Educational content promoting pet adoption

### 🐕 **Pet & Supply Marketplace**

- **Advanced Filtering System:** Search by category, price range, and location with sticky filter bar
- **Real-time Search:** Instant results with pagination and sorting options
- **Detailed Listings:** Comprehensive pet profiles with images, descriptions, and contact info
- **Category-based Browsing:** Organized sections for pets, food, accessories, and care products

### 🔐 **Authentication System**

- **Firebase Integration:** Secure email/password and Google OAuth authentication
- **Persistent Sessions:** Browser local persistence with smooth loading states
- **Role-based Access:** Admin and user role management with protected routes
- **Profile Management:** Complete user profile editing with validation

### 📊 **Admin Dashboard**

- **Analytics Overview:** Visual charts showing user statistics and pet categories
- **User Management:** Complete CRUD operations for user accounts with role assignment
- **System Statistics:** Real-time metrics with growth indicators
- **Modern UI:** Glassmorphism design with smooth animations and responsive layouts

### � **User Dashboard**

- **Personal Overview:** Spending analytics with interactive charts using Recharts
- **Order Management:** Complete order history with dynamic data visualization
- **Pet Care Tips:** Personalized recommendations and health reminders
- **Quick Actions Hub:** Easy access to common tasks and profile management
- **Pet Profiles:** Manage multiple pet profiles with status tracking

### 🛍️ **Listing Management**

- **Add Listings:** Comprehensive form for pets and supplies with category-specific pricing
- **My Listings:** Full CRUD operations with responsive table/card views
- **Update System:** Edit existing listings with pre-populated data
- **Order Tracking:** Monitor purchases and adoption requests

### 🎨 **Design System**

- **Glassmorphism UI:** Modern glass-effect components with backdrop blur
- **Dark/Light Themes:** Complete theme system with CSS variables and smooth transitions
- **Responsive Design:** Mobile-first approach with adaptive layouts
- **Animation System:** CSS-based animations with Framer Motion integration
- **Fixed Navigation:** Sticky navbar with proper content spacing

### 📄 **Content Pages**

- **About Us:** Company information with modern layout
- **Contact:** Contact form and information
- **Partners:** Partner showcase section
- **Legal Pages:** Privacy Policy, Terms of Service, and FAQ with accordion UI
- **Error Handling:** Custom 404 and error pages

---

## �️ Technology Stack

### **Frontend Architecture**

- **⚛️ React 19.2.0** - Latest React with concurrent features
- **⚡ Vite 7.2.4** - Ultra-fast build tool and dev server
- **🎨 Tailwind CSS 3.4.19** - Utility-first CSS framework
- **🌈 DaisyUI 5.5.14** - Component library for Tailwind
- **📊 Recharts 3.6.0** - Data visualization library
- **🔥 Firebase 12.6.0** - Authentication and backend services

### **State Management & Data**

- **🔄 TanStack Query 5.90.16** - Server state management
- **📡 Axios 1.13.2** - HTTP client for API calls
- **🍞 React Hot Toast 2.6.0** - Notification system
- **🍯 SweetAlert2 11.26.17** - Beautiful alert dialogs

### **UI & Animation**

- **🎭 Framer Motion 12.23.25** - Animation library
- **🎯 React Icons 5.5.0** - Icon library
- **🎪 Lucide React 0.555.0** - Additional icon set
- **📝 React Simple Typewriter 5.0.1** - Typewriter effect
- **💡 React Tooltip 5.30.0** - Tooltip components

### **Routing & Navigation**

- **🛣️ React Router 7.10.0** - Client-side routing
- **📍 React Router DOM 7.10.0** - DOM bindings for React Router

### **Development Tools**

- **🔍 ESLint 9.39.1** - Code linting
- **🎯 TypeScript Support** - Type definitions included
- **🔧 Vite Plugins** - React plugin for optimal development

### **Backend Integration**

- **🌐 RESTful API** - Express.js server with MongoDB
- **🔒 JWT Authentication** - Secure token-based auth
- **📊 MongoDB** - NoSQL database for flexible data storage

---

## 📁 Project Structures

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Avatar)
│   ├── shared/          # Shared components (Contact, FAQ, etc.)
│   ├── Banner.jsx       # Hero banner component
│   ├── CategorySection.jsx
│   ├── Footer.jsx       # Site footer
│   ├── Loading.jsx      # Loading states
│   ├── Navbar.jsx       # Navigation component
│   ├── PageLoader.jsx   # Page loading animation
│   └── RecentListings.jsx
├── pages/               # Page components
│   ├── Dashboard/       # Dashboard pages
│   │   ├── AdminHome.jsx
│   │   ├── UserHome.jsx
│   │   ├── Profile.jsx
│   │   ├── ManageUsers.jsx
│   │   └── Settings.jsx
│   ├── Home.jsx         # Homepage
│   ├── PetsSupplies.jsx # Marketplace page
│   ├── AddListing.jsx   # Add new listing
│   ├── MyListings.jsx   # User's listings
│   ├── Login.jsx        # Authentication
│   └── Register.jsx     # User registration
├── layouts/             # Layout components
│   ├── Root.jsx         # Main layout
│   ├── AuthLayout.jsx   # Auth pages layout
│   └── DashboardLayout.jsx # Dashboard layout
├── provider/            # Context providers
│   ├── AuthProvider.jsx # Authentication context
│   └── PrivateRoute.jsx # Protected routes
├── hooks/               # Custom React hooks
│   ├── useAuthState.jsx # Auth state management
│   ├── useRole.jsx      # User role management
│   ├── useTheme.jsx     # Theme management
│   └── usePageLoader.jsx # Page loading states
├── utils/               # Utility functions
│   ├── cn.js           # Class name utility
│   ├── animations.js   # Animation helpers
│   └── smoothScroll.js # Smooth scrolling
├── firebase/           # Firebase configuration
│   └── firebase.config.js
├── routes/             # Routing configuration
│   └── Routes.jsx
└── index.css          # Global styles and CSS variables
```

---

## 🎨 Design Features

### **Glassmorphism Design System**

- **Glass Effects:** Backdrop blur with subtle transparency
- **CSS Variables:** Complete theme system with dark/light mode support
- **Gradient Overlays:** Orange-to-pink gradient accents throughout
- **Modern Typography:** Clean, readable fonts with proper hierarchy

### **Animation & Interactions**

- **Page Transitions:** Smooth route transitions with loading states
- **Hover Effects:** Subtle scale and shadow animations
- **Loading States:** Professional loading animations and skeletons
- **Micro-interactions:** Button animations and form feedback

### **Responsive Design**

- **Mobile-First:** Optimized for mobile devices with progressive enhancement
- **Adaptive Layouts:** Flexible grid systems and component sizing
- **Touch-Friendly:** Proper touch targets and mobile navigation

---

## 🔑 Demo Credentials

| Role      | Email               | Password    |
| :-------- | :------------------ | :---------- |
| **Admin** | `admin@pawmart.com` | `Admin@123` |
| **User**  | `user@pawmart.com`  | `User@123`  |

---

## 🚀 Installation & Setup 

### **Prerequisites**

- Node.js 18+ and npm/yarn
- Git for version control
- Firebase account for authentication

### **Local Development**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mehedihasan53/A10_PawMart_Client.git
   cd A10_PawMart_Client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   ```

4. **Start development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

### **Firebase Configuration**

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Google providers
3. Copy your Firebase config to the `.env.local` file
4. Update Firebase rules as needed for your security requirements

---

## 📱 Key Pages & Features

### **Public Pages**

- **Homepage** (`/`) - Hero banner, categories, recent listings, pet heroes
- **Pets & Supplies** (`/pets-supplies`) - Marketplace with filtering and search
- **About Us** (`/about-us`) - Company information and mission
- **Contact** (`/contact`) - Contact form and information
- **Legal Pages** - Privacy policy, terms of service, FAQ

### **Authentication**

- **Login** (`/auth/login`) - Email/password and Google OAuth
- **Register** (`/auth/register`) - User registration with validation

### **Protected User Pages**

- **Add Listing** (`/add-listing`) - Create new pet/supply listings
- **My Listings** (`/my-listings`) - Manage personal listings
- **My Orders** (`/my-orders`) - Order history and tracking
- **Listing Details** (`/listing-details/:id`) - Detailed pet/supply information

### **Dashboard Pages**

- **Profile** (`/dashboard/profile`) - User profile management
- **User Home** (`/dashboard/user-home`) - Personal dashboard with analytics
- **Admin Home** (`/dashboard/admin-home`) - Admin analytics and overview
- **Manage Users** (`/dashboard/manage-users`) - User management (Admin only)
- **Settings** (`/dashboard/settings`) - Account settings and preferences

---

## 🔧 Configuration Files

### **Vite Configuration** (`vite.config.js`)

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

### **Tailwind Configuration** (`tailwind.config.js`)

- Custom color palette with CSS variables
- Glassmorphism utilities and components
- Responsive breakpoints and spacing
- Animation and transition classes

---

## 🎯 Performance Features

- **Code Splitting:** Automatic route-based code splitting
- **Lazy Loading:** Components and images loaded on demand
- **Optimized Builds:** Vite's optimized production builds
- **Caching:** Efficient API caching with TanStack Query
- **Image Optimization:** Responsive images with proper loading states

---

## 🔒 Security Features

- **Firebase Authentication:** Secure user authentication
- **Protected Routes:** Role-based access control
- **Input Validation:** Form validation and sanitization
- **HTTPS Only:** Secure communication protocols
- **Environment Variables:** Sensitive data protection

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Mehedi Hasan**

- GitHub: [@mehedihasan53](https://github.com/mehedihasan53)
- Email: mehedihasan53@example.com

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Firebase** for authentication and backend services
- **Vite** for the lightning-fast development experience
- **Open Source Community** for the incredible libraries and tools.

---

_Built with ❤️ for pet lovers everywhere_
