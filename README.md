# Aurora LMS

A modern B2C learning management system built with Next.js, featuring comprehensive course management, secure authentication, and integrated payment processing.

## Project Overview

Aurora LMS is a full-stack learning platform designed for businesses and educators to create, manage, and deliver online courses. The platform provides a seamless experience for both administrators managing course content and students consuming educational materials.

Built with performance and security as core priorities, Aurora LMS implements multi-layer security protections, role-based access control, and optimized rendering strategies to deliver a fast and secure learning experience.

**Target Audience:** Educational institutions, course creators, and organizations delivering online training programs.

**Value Proposition:** A production-ready LMS solution with enterprise-grade security, intuitive course management tools, and integrated payment processing, enabling rapid deployment of online learning platforms.

## Tech Stack

### Frontend

- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **TailwindCSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Motion (Framer Motion)** - Animation library
- **TipTap** - Rich text editor
- **dnd-kit** - Drag and drop functionality
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Server-side API endpoints
- **Server Actions** - Next.js server actions for mutations
- **Prisma 7.1.0** - Type-safe ORM
- **Neon PostgreSQL** - Serverless Postgres database

### Styling & UI

- **TailwindCSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **next-themes** - Theme management (dark/light mode)
- **Lucide React** - Icon library
- **Recharts** - Charting library

### Data Fetching

- **Server Components** - React Server Components
- **Server Actions** - Form mutations and data updates
- **React Cache** - Request deduplication
- **Prisma Client** - Database queries

### Authentication

- **Better Auth 1.4.5** - Authentication framework
- **OAuth Providers** - Google and GitHub integration
- **Email OTP** - One-time password authentication via Resend

### Payment Processing

- **Stripe** - Payment processing and webhooks
- **Stripe Checkout** - Hosted payment pages

### Storage

- **AWS S3** - Object storage for course media
- **Presigned URLs** - Secure, time-limited upload/download URLs

### Security

- **Arcjet** - Bot detection, rate limiting, XSS/SQL injection protection
- **Shield** - Automated attack protection
- **Rate Limiting** - Fixed and sliding window rate limits
- **Bot Detection** – Implements bot detection mechanisms to prevent automated or malicious bot activity across the platform, while safely allowing trusted services such as search engine crawlers (SEO) and Stripe webhook bots to operate without restrictions.

### Tooling & Utilities

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **T3 Env** - Environment variable validation
- **React Compiler** - Automatic React optimizations
- **UUID** - Unique identifier generation
- **html-react-parser** - Safe HTML parsing

## Key Features

### Authentication & Authorization

- Multi-provider authentication (Google, GitHub, Email OTP)
- Session-based authentication with secure cookie storage
- Role-based access control (Admin and User roles)
- Server-side session validation with cached session checks
- Automatic redirect handling for authenticated and unauthenticated users
- User ban system with expiration dates and reasons

### Security

- Arcjet integration for comprehensive protection
  - Bot detection and blocking (whitelist for search engines, monitoring, and preview bots)
  - Rate limiting on auth endpoints and mutations (5 operations per minute)
  - XSS and SQL injection protection via Shield
  - Email validation (blocks disposable emails, invalid formats, domains without MX records)
- Multi-layer security architecture
  - Middleware-level route protection
  - Route handler-level Arcjet protection
  - Server action-level rate limiting
  - Session validation in data access layer

### Course Management

- Full CRUD operations for courses, chapters, and lessons
- Course status management (Draft, Published, Archived)
- Course categorization and level assignment (Beginner, Intermediate, Advanced)
- Course structure with drag-and-drop reordering
  - Chapter-level reordering
  - Lesson-level reordering within chapters
  - Keyboard-accessible drag and drop
- Rich text editor for course descriptions
  - TipTap-based editor with formatting options
  - Headings, lists, text alignment, bold, italic, strikethrough
  - Safe HTML rendering with html-react-parser (prevents XSS)
- Course media management
  - Image and video uploads via S3
  - Custom dropzone component with drag-and-drop support
  - Presigned URL generation for secure uploads
  - Thumbnail and video file storage

### Student Features

- Course enrollment with Stripe payment integration
- Course progress tracking
  - Lesson completion tracking
  - Progress percentage calculation
  - Visual progress indicators
- Student dashboard
  - Enrolled courses view
  - Available courses for purchase
  - Course navigation with sidebar
- Lesson viewing with video player
  - Lazy-loaded video playback
  - Thumbnail preview with play overlay
  - Lesson description rendering

### Admin Dashboard

- Course management interface
- Analytics and statistics
  - Enrollment charts
  - Recent courses overview
  - Dashboard statistics
- Course creation and editing workflows
- Course structure management with visual drag-and-drop interface
- Lesson and chapter management

### Payment Integration

- Stripe Checkout integration
- Webhook handling for payment confirmation
- Enrollment status management (Pending, Active, Cancelled)
- Customer ID management for recurring payments
- Transaction amount tracking

### Performance Optimizations

- React Server Components for server-side rendering
- Incremental Static Regeneration (ISR) for course pages (1-hour revalidation)
- Static site generation with generateStaticParams for course slugs
- Streaming with Suspense boundaries
- Loading states with dedicated loading.tsx files
- React cache for request deduplication in data access layer
- useTransition for optimistic UI updates (replaces separate loading/error states)
- React Compiler for automatic optimizations
- Image optimization with Next.js Image component
- Font optimization with next/font (Geist Sans and Mono)

### User Experience

- Dark and light theme support with system preference detection
- Animated theme transitions with View Transitions API
- Confetti animations for course creation and lesson completion
- Responsive design with mobile navigation
- Pagination for course listings
- Empty states for better UX feedback
- Toast notifications with Sonner
- Accessible components built on Radix UI primitives
- Screen reader support and ARIA labels

### Developer Experience

- Vertical slice architecture for feature organization
- Data Access Layer (DAL) pattern for centralized database queries
- Type-safe API responses with TypeScript
- Custom hooks for reusable logic
- Environment variable validation with T3 Env
- Consistent error handling patterns
- Server-only modules to prevent client-side exposure

## Architecture & Design Decisions

### Folder-Based Routing (Next.js App Router)

The application uses Next.js App Router with route groups for logical organization:

- `(auth)` - Authentication-related routes (login, verify-request)
- `(public)` - Public-facing routes (course browsing)
- `(require-user)` - Protected routes requiring authentication (dashboard, admin)

This structure enables route-level code splitting and clear separation between public and protected content.

### Vertical Slice Architecture

Features are organized vertically, with related components, actions, data access functions, and types grouped together. This approach improves maintainability and makes features self-contained.

### Data Access Layer (DAL)

Database queries are centralized in the `app/data` directory:

- `app/data/admin` - Admin-specific data queries
- `app/data/user` - User-specific data queries

Functions like `requireAdmin()` and `requireUser()` use React's `cache()` for request deduplication and session validation. This pattern:

- Ensures consistent session checking
- Prevents duplicate database queries within a request
- Provides type-safe session data
- Centralizes authorization logic

### Server Components & Server Actions

The application leverages Next.js Server Components for initial page loads and Server Actions for mutations. This pattern:

- Reduces client-side JavaScript bundle size
- Enables direct database access without API routes
- Provides better SEO through server-side rendering
- Simplifies data fetching with async/await syntax

### Security Architecture

Multi-layer security is implemented at different levels:

1. **Middleware (proxy.ts)** - Route-level protection and session cookie checks
2. **Route Handlers** - Arcjet protection on API endpoints
3. **Server Actions** - Rate limiting and Arcjet protection on mutations
4. **Data Access Layer** - Session validation before data access

This defense-in-depth approach ensures security at every entry point.

### Error Handling Strategy

Consistent error handling patterns:

- Custom `tryCatch` utility for promise-based error handling
- Standardized `ApiResponse` type for server actions
- Arcjet decision handlers for security-related errors
- User-friendly error messages in toast notifications

### Component Organization

- Shared UI components in `components/ui`
- Feature-specific components in route `_components` directories
- Reusable business logic in custom hooks
- Global components in `components/globals`

This organization balances reusability with feature co-location.

## Main Folder Structure

```
app/
├── (auth)/                    # Authentication routes
│   ├── login/                 # Login page with OAuth and email OTP
│   └── verify-request/        # Email verification page
├── (public)/                  # Public routes (no authentication required)
│   ├── courses/               # Public course browsing
│   │   └── [slug]/            # Individual course detail page (SSG with ISR)
│   └── page.tsx               # Landing page
├── (require-user)/            # Protected routes (authentication required)
│   ├── admin/                 # Admin-only routes
│   │   ├── courses/           # Course management interface
│   │   │   ├── create/        # Course creation
│   │   │   └── [courseId]/    # Course editing
│   │   │       └── edit/      # Course structure and details editing
│   │   └── page.tsx           # Admin dashboard
│   └── dashboard/             # User dashboard
│       ├── [slug]/            # Enrolled course view
│       │   └── [lessonId]/    # Individual lesson view
│       └── page.tsx           # Dashboard home
├── api/                       # API routes
│   ├── auth/                  # Better Auth handlers
│   ├── s3/                    # S3 presigned URL generation
│   └── webhook/               # External webhooks (Stripe)
├── data/                      # Data Access Layer (DAL)
│   ├── admin/                 # Admin data queries and session checks
│   └── user/                  # User data queries and session checks
├── layout.tsx                 # Root layout with providers
└── globals.css                # Global styles

components/
├── dashboard-layout/          # Dashboard-specific layout components
├── globals/                   # Shared global components (CourseCard, etc.)
├── rich-text-editor/          # TipTap editor components
└── ui/                        # shadcn/ui component library

hooks/                         # Custom React hooks
lib/                           # Shared utilities and configurations
├── auth.ts                    # Better Auth configuration
├── auth-client.ts             # Client-side auth utilities
├── arcjet.ts                  # Arcjet configuration
├── db.ts                      # Prisma client instance
├── env.ts                     # Environment variable validation
├── s3-client.ts               # AWS S3 client
├── stripe.ts                  # Stripe client
└── types.ts                   # Shared TypeScript types

prisma/
├── schema.prisma              # Database schema
└── migrations/                # Database migration history
```

## Authentication & Authorization Flow

### Authentication Process

Aurora LMS uses Better Auth for authentication management:

1. **Session Storage**: Sessions are stored in the database (PostgreSQL) with encrypted tokens
2. **Cookie Management**: Session tokens are stored in HTTP-only cookies for security
3. **OAuth Flow**: Google and GitHub OAuth follow the standard OAuth 2.0 flow with Better Auth handling the callback
4. **Email OTP Flow**:
   - User requests OTP via email
   - Resend service sends OTP to registered email (sadly,only for me for free plan)
   - User submits OTP for verification
   - Session created upon successful verification

### Session Validation

Session validation happens at multiple levels:

1. **Middleware Level** (`proxy.ts`): Fast cookie check for route protection
2. **Data Access Layer**: Full session validation using `requireUser()` or `requireAdmin()`
   - Uses React `cache()` to deduplicate session checks
   - Fetches full session from database via Better Auth API
   - Redirects unauthenticated users to login
   - Redirects non-admin users attempting admin access

### Role-Based Access Control

Two roles are defined:

- **User**: Default role for enrolled students
- **Admin**: Elevated role for course creators and administrators

Role checks are performed in the data access layer using `requireAdmin()`, which validates both authentication status and admin role. Non-admin users accessing admin routes are redirected to `/not-admin`.

### Client-Side vs Server-Side

- **Server-Side**: All session validation and authorization occurs server-side using Server Components and Server Actions
- **Client-Side**: `authClient` from Better Auth provides client-side session access for UI state (showing user dropdown, etc.)
- **Security**: Sensitive operations (database queries, admin checks) are marked with `"server-only"` to prevent client-side exposure

## Performance & Optimization

### Rendering Strategies

The application employs multiple rendering strategies based on content type:

- **Server-Side Rendering (SSR)**: Dynamic content requiring real-time data (user dashboards, admin pages)
- **Static Site Generation (SSG)**: Course detail pages with `generateStaticParams()` for all course slugs
- **Incremental Static Regeneration (ISR)**: Course pages revalidate every hour (`revalidate = 3600`)
- **Client-Side Rendering (CSR)**: Interactive components (forms, drag-and-drop interfaces)

### Code Splitting & Lazy Loading

- Automatic code splitting via Next.js route-based splitting
- Dynamic imports for heavy components where appropriate
- React Suspense boundaries for progressive loading
- Video lazy loading with thumbnail preview (loads on play)

### Request Optimization

- **React Cache**: Session validation and data queries use `cache()` to prevent duplicate requests within a single render
- **Request Deduplication**: Multiple components requesting the same data share a single database query
- **Selective Queries**: Prisma queries use `select` to fetch only required fields

### State Management

- **useTransition**: Replaces separate `useState` hooks for loading/error states, providing better UX with optimistic updates
- **Server State**: Data fetched in Server Components eliminates need for client-side state management
- **Form State**: React Hook Form for efficient form state management with minimal re-renders

### Image Optimization

- Next.js Image component with optimized loading
- Lazy loading for below-fold images
- Eager loading for LCP images (lesson thumbnails)
- Proper sizing and aspect ratios

### Font Optimization

- Self-hosted fonts via `next/font` (Geist Sans and Mono)
- Font display swap for performance
- Preloaded critical fonts

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn package manager
- PostgreSQL database (Neon recommended)
- Tigris account with S3 bucket configured
- Stripe account
- Resend account (for email OTP)
- Arcjet account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd aurora_lms
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://..."

# Better Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Security (Arcjet)
ARCJET_KEY="your-arcjet-key"

# Tigris S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_ENDPOINT_URL_S3="https://..."
AWS_ENDPOINT_URL_IAM="https://..."
AWS_REGION="your-region"
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your-bucket-name"

# Stripe
STRIPE_SECRETE_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-webhook-secret"

# Optional: Admin Emails
ADMIN_EMAILS="admin@example.com"
```

4. Set up the database:

```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Future Improvements

### Scalability

- Add courses filtering in admin courses for easy searching
- Implement Redis for session caching to reduce database load
- Add CDN integration for static assets and media files
- Consider database read replicas for improved read performance
- Implement connection pooling optimization for high-traffic scenarios

### Feature Enhancements

- Student discussion forums or Q&A functionality
- Course reviews and ratings system
- Certificate generation upon course completion
- Course search and filtering capabilities
- Email notifications for course updates and lesson releases
- Multi-language support and internationalization
- Course analytics for instructors (student engagement metrics)

### Technical Debt

- Implement comprehensive error boundaries for better error recovery
- Add end-to-end testing with Playwright or Cypress
- Expand unit test coverage for critical business logic
- Implement API response caching strategies
- Add monitoring and logging infrastructure (e.g., Sentry, LogRocket)
- Consider implementing a queue system for background jobs (email sending, video processing)

### Security Enhancements

- Implement two-factor authentication (2FA)
- Add audit logging for admin actions
- Implement content security policy (CSP) headers
- Add API rate limiting for authenticated endpoints
- Consider implementing user activity monitoring

## License

This project is private and proprietary. All rights reserved.
