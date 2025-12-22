# Karunia Motor Sales Landing Pages

A Next.js application for displaying personalized sales representative landing pages for Karunia Motor. Customers can scan QR codes to view a salesperson's profile and contact them via WhatsApp.

## Features

- **Dynamic Routes**: Individual pages for each sales representative at `/profile/[uid]`
- **Strapi Integration**: Fetches salesperson data from a Strapi CMS
- **Mobile-First Design**: Optimized for mobile devices (QR code scanning)
- **WhatsApp Integration**: Direct chat functionality with formatted numbers
- **Responsive UI**: Clean, professional design using Tailwind CSS
- **Error Handling**: Friendly "Sales Not Found" pages for invalid UIDs

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Strapi (headless CMS)
- **Deployment**: Vercel (recommended) / Netlify / Any Node.js host

## Prerequisites

- Node.js 18+ installed
- Strapi instance with salesperson data
- Environment variables configured

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd landing
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and configure:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-api.com
   ```

## Strapi Data Structure

Your Strapi API should have a `salespeople` collection with the following structure:

```typescript
interface Salesperson {
  id: number;
  uid: string;          // Unique identifier for URL
  name: string;         // Salesperson's full name
  photo: {              // Profile photo
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
    };
  };
  whatsappNumber: string; // WhatsApp phone number
  createdAt: string;
  updatedAt: string;
}
```

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Testing URLs

After setting up, you can test these URLs (assuming you have the corresponding data in Strapi):
- `/` - Homepage with sample links
- `/profile/john123` - Example salesperson profile
- `/profile/sarah456` - Another example profile
- `/profile/invalid` - Will show "Sales Not Found" page

## WhatsApp Integration

The app automatically formats WhatsApp numbers:
- Adds Indonesian country code (62) if missing
- Removes leading zeros from local numbers
- Opens WhatsApp with a pre-filled message

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `.next` folder to your hosting provider

## Customization

### Brand Colors

Colors are configured in `tailwind.config.js`. Modify the `karunia-red` color palette to match your brand.

### API Configuration

Update `src/lib/strapi.ts` to match your Strapi API structure and authentication requirements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary to Karunia Motor.

## Support

For support, please contact the development team.# karunialandingsales
