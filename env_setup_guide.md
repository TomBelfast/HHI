# 🔧 Environment Setup Guide
## HHI Client Notification Dashboard

---

## 📋 **Prerequisites**

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git installed
- VS Code (recommended)

---

## 🚀 **Quick Setup**

### **1. Navigate to project directory**
```bash
cd C:\HHI
```

### **2. Install dependencies**
```bash
npm install

# Additional packages for dashboard
npm install @microsoft/microsoft-graph-client
npm install @azure/msal-node
npm install resend
npm install @tanstack/react-query
npm install @hello-pangea/dnd
npm install @dnd-kit/core @dnd-kit/sortable
npm install recharts
npm install date-fns
```

### **3. Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local
```

### **4. Update .env.local**
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hhi_dashboard"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_key_here"
CLERK_SECRET_KEY="sk_test_your_secret_here"

# Microsoft Graph (OneDrive)
MICROSOFT_CLIENT_ID="your_azure_app_id"
MICROSOFT_CLIENT_SECRET="your_azure_app_secret"
MICROSOFT_TENANT_ID="your_tenant_id"

# Email Service
RESEND_API_KEY="re_your_resend_key"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
WEBHOOK_URL="http://localhost:3000/api/onedrive/webhook"
```

### **5. Database Setup**
```bash
npm run db:generate
npm run db:migrate
```

### **6. Start Development Server**
```bash
npm run dev
```

---

## 🔑 **API Keys Setup Guide**

### **Clerk Authentication**
1. Go to [clerk.com](https://clerk.com)
2. Create account and new application
3. Copy publishable and secret keys
4. Enable Organizations in settings

### **Microsoft Graph (OneDrive)**
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "App registrations"
3. Create new app registration
4. Add permissions: Files.ReadWrite.All, Sites.ReadWrite.All
5. Create client secret

### **Resend Email Service**
1. Go to [resend.com](https://resend.com)
2. Create account
3. Generate API key
4. Verify domain for sending emails

---

## 📁 **Project Structure**
```
C:\HHI/
├── .env.local (create this)
├── src/
│   ├── models/
│   │   └── DashboardSchema.ts (add this)
│   ├── libs/
│   │   ├── ProjectService.ts (add this)
│   │   ├── OneDriveService.ts (add this)
│   │   └── EmailService.ts (add this)
│   ├── components/
│   │   └── dashboard/ (create folder)
│   └── app/
│       └── api/
│           └── onedrive/ (create folder)
└── docs/ (create folder)
```

---

## ✅ **Verification Steps**

### **Test Database Connection**
```bash
npm run db:studio
# Should open Drizzle Studio in browser
```

### **Test Authentication**
```bash
npm run dev
# Visit http://localhost:3000
# Click "Sign In" - should redirect to Clerk
```

### **Test Email Service**
```bash
# Create test file: test-email.js
node test-email.js
```

---

## 🐛 **Common Issues & Solutions**

### **Database Connection Failed**
- Check PostgreSQL is running
- Verify DATABASE_URL format
- Ensure database exists

### **Clerk Authentication Error**
- Verify keys are correct
- Check organization settings enabled
- Clear browser cache

### **Build Errors**
- Run `npm run build` to check for TypeScript errors
- Ensure all imports are correct
- Check for missing dependencies

---

## 📦 **Development Commands**

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build production
npm run start           # Start production server

# Database
npm run db:generate     # Generate migrations
npm run db:migrate      # Run migrations
npm run db:studio       # Open database studio
npm run db:seed         # Seed demo data

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript check
npm run test            # Run tests
```

---

## 🚀 **Ready for Next Steps**

Once environment is set up:
1. ✅ Server runs on http://localhost:3000
2. ✅ Authentication works
3. ✅ Database connects
4. ✅ No TypeScript errors

**You're ready to implement the dashboard components!**