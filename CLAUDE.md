# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Karunia Motor Sales Landing Pages is a Next.js 14 application that creates personalized landing pages for sales representatives. Customers scan QR codes to view a salesperson's profile and contact them via WhatsApp.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- Next.js 14 with TypeScript (Pages Router)
- Tailwind CSS for styling
- Strapi as headless CMS
- Server-side rendering with getServerSideProps

### Key Directories Structure
```
src/
├── lib/
│   ├── strapi.ts         # Strapi API client and type definitions
│   └── whatsapp-utils.ts # WhatsApp integration utilities
├── pages/
│   ├── _app.tsx          # Next.js app component
│   ├── _document.tsx     # Custom document configuration
│   ├── index.tsx         # Homepage with sample links
│   └── profile/
│       └── [uid].tsx     # Dynamic salesperson profile pages
└── styles/
    └── globals.css       # Global styles and Tailwind imports
```

### Core Components

#### Strapi Integration (`src/lib/strapi.ts`)
- Fetches salesperson data using UID filter
- Type-safe interfaces for Salesperson and StrapiResponse
- Configurable API URL via environment variable
- Error handling for failed requests

#### Dynamic Profile Pages (`src/pages/profile/[uid].tsx`)
- Server-side rendered pages using getServerSideProps
- Fetches salesperson data based on UID parameter
- Graceful error handling with "Sales Not Found" page
- WhatsApp integration with formatted phone numbers

#### WhatsApp Integration (`src/lib/whatsapp-utils.ts`)
- Formats Indonesian phone numbers with country code (62)
- Creates wa.me links with pre-filled messages
- Removes non-digit characters from phone numbers

### Environment Variables
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-api.com
```

### Strapi Data Structure
The app expects a `salespeople` collection with:
- `uid`: Unique identifier for URLs
- `name`: Salesperson's full name
- `photo`: Profile photo with multiple format options
- `whatsappNumber`: WhatsApp contact number

### Branding
- Custom color palette `karunia-red` defined in `tailwind.config.js`
- Mobile-first design optimized for QR code scanning
- Professional, clean UI with Tailwind CSS

### Development Notes
- Uses Next.js Pages Router (not App Router)
- No external component libraries - pure React/Next.js
- TypeScript throughout for type safety
- Responsive design with mobile priority
- WhatsApp links open in new tabs