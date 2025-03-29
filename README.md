# Client Portal SaaS

A secure, modern client portal built with Next.js 14, TypeScript, and Auth.js.

## Features

- **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS
- **Authentication**: Secure authentication using Auth.js (NextAuth)
- **Internationalization**: Multi-language support with locale-based routing
- **Responsive Design**: Mobile-first design approach
- **Server Components**: Leverages Next.js 14 Server Components for improved performance
- **Server Actions**: Uses Next.js Server Actions for form handling and mutations
- **Database**: Prisma ORM for type-safe database access
- **Testing**: Jest and React Testing Library for unit testing

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Copy the `.env.local.example` file to `.env.local` and fill in the required values:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/client_portal"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Run database migrations:

```bash
npm run prisma:migrate:dev
# or
yarn prisma:migrate:dev
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
client-portal-saas/
├── app/                      # Next.js App Router
│   ├── [locale]/             # Locale-specific routes
│   │   ├── dashboard/        # Dashboard page
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   └── page.tsx          # Home page
│   ├── api/                  # API routes
│   │   └── auth/             # Auth.js API routes
│   ├── error.tsx             # Error page
│   ├── layout.tsx            # Root layout
│   ├── loading.tsx           # Loading page
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Root page (redirects to default locale)
├── components/               # React components
│   ├── __tests__/            # Component tests
│   ├── AuthProvider.tsx      # Auth.js provider
│   ├── Footer.tsx            # Footer component
│   └── Header.tsx            # Header component
├── config/                   # Configuration files
│   └── site.ts               # Site configuration
├── context/                  # React context providers
├── lib/                      # Library code
│   └── prisma.js             # Prisma client
├── middleware.ts             # Next.js middleware for auth and i18n
├── prisma/                   # Prisma schema and migrations
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── styles/                   # Global styles
    └── globals.css           # Global CSS
```

## Authentication

The application uses Auth.js (NextAuth) for authentication. It supports:

- Credentials authentication (email/password)
- JWT-based sessions
- Protected routes via middleware

## Internationalization

The application supports multiple languages through locale-based routing:

- English (`/en/*`)
- Traditional Chinese (`/tw/*`)

The middleware automatically redirects users to their preferred language based on the `Accept-Language` header.

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## License

ISC
