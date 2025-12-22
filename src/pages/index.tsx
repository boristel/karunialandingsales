import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';

interface HomePageProps {}

const HomePage: NextPage<HomePageProps> = () => {
  return (
    <>
      <Head>
        <title>Karunia Motor - Landing Pages</title>
        <meta name="description" content="Karunia Motor Sales Representative Landing Pages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-karunia-red-50 to-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-karunia-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                KM
              </div>
              <span className="text-2xl font-bold text-gray-800">Karunia Motor</span>
            </div>

            {/* Welcome Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Karunia Motor
            </h1>

            <p className="text-gray-600 mb-8">
              Access your sales representative's profile by scanning their QR code or entering their profile ID.
            </p>

            {/* Sample Profile Links */}
            <div className="space-y-3 mb-8">
              <p className="text-sm text-gray-500 font-medium">Sample Profiles:</p>
              <div className="space-y-2">
                <Link href="/profile/SALES-1766286554860" className="block w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
                  <span className="text-gray-700">/profile/SALES-1766286554860</span>
                  <span className="text-xs text-gray-500 ml-2">- Ujang (Sales Representative)</span>
                </Link>
                <Link href="/profile/SALES-1766196285333" className="block w-full text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors">
                  <span className="text-gray-700">/profile/SALES-1766196285333</span>
                  <span className="text-xs text-gray-500 ml-2">- Borist (Sales Representative)</span>
                </Link>
              </div>
            </div>

            {/* Instructions */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-2">How to use:</h3>
              <ol className="text-sm text-gray-600 space-y-1 text-left">
                <li>1. Scan the QR code with your phone</li>
                <li>2. You'll be redirected to the salesperson's profile</li>
                <li>3. Click "Chat on WhatsApp" to connect</li>
              </ol>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500">
                &copy; 2024 Karunia Motor. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;