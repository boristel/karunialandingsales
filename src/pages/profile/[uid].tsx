import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Salesperson, getSalespersonByUid, getImageUrl } from '@/lib/strapi';
import { createWhatsAppLink } from '@/lib/whatsapp-utils';

interface ProfilePageProps {
  salesperson: Salesperson | null;
  error?: string;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ salesperson, error }) => {
  const handleWhatsAppClick = () => {
    if (!salesperson) return;

    const whatsappUrl = createWhatsAppLink(salesperson.wanumber);
    window.open(whatsappUrl, '_blank');
  };

  if (error || !salesperson) {
    return (
      <>
        <Head>
          <title>Sales Not Found - Karunia Motor</title>
          <meta name="description" content="Sales representative not found" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Sales Not Found</h1>
              <p className="text-gray-600 mb-6">
                The sales representative you're looking for doesn't exist or has been removed.
              </p>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 bg-karunia-red-600 text-white font-medium rounded-lg hover:bg-karunia-red-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{salesperson.surename} - Authorized Sales | Karunia Motor</title>
        <meta name="description" content={`${salesperson.surename} - Authorized Sales Representative at Karunia Motor`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${salesperson.surename} - Karunia Motor`} />
        <meta property="og:description" content="Authorized Sales Representative at Karunia Motor" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Header with Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center">
              <div className="w-12 h-12 bg-karunia-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-3">
                KM
              </div>
              <span className="text-xl font-semibold text-gray-800">Karunia Motor</span>
            </div>
          </div>

          {/* Profile Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Profile Photo Section */}
              <div className="relative pt-8 pb-4 px-8 bg-gradient-to-br from-karunia-red-500 to-karunia-red-600">
                <div className="relative">
                  {/* Profile Photo */}
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                    {salesperson.photo_profile?.url ? (
                      <Image
                        src={getImageUrl(salesperson.photo_profile.formats?.medium?.url || salesperson.photo_profile.formats?.small?.url || salesperson.photo_profile.url) || ''}
                        alt={salesperson.surename}
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                        priority
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Verification Badge */}
                  <div className="absolute bottom-0 right-1/4 transform translate-x-8">
                    <div className="bg-green-500 rounded-full p-1 border-2 border-white shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sales Information */}
              <div className="px-8 py-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {salesperson.surename}
                </h1>

                <div className={`inline-flex items-center ${salesperson.online_stat ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border rounded-full px-4 py-2 mb-6`}>
                  <div className={`w-4 h-4 ${salesperson.online_stat ? 'bg-green-500' : 'bg-gray-400'} rounded-full flex items-center justify-center mr-2`}>
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className={`text-sm font-medium ${salesperson.online_stat ? 'text-green-800' : 'text-gray-600'}`}>
                    {salesperson.online_stat ? 'Online - Available Now' : 'Offline - Available Soon'}
                  </span>
                </div>

                <p className="text-gray-600 mb-8">
                  Trusted sales representative ready to help you find the perfect vehicle. Contact me for personalized service and exclusive offers.
                </p>

                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-lg">Chat on WhatsApp</span>
                </button>

                {/* Additional Trust Indicators */}
                <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-karunia-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-karunia-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span>{salesperson.city}</span>
                  </div>
                  {salesperson.online_stat && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-sm text-gray-500">
              <p>&copy; 2024 Karunia Motor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ params }) => {
  const uid = params?.uid as string;

  if (!uid) {
    return {
      props: {
        salesperson: null,
        error: 'No UID provided',
      },
    };
  }

  try {
    const salesperson = await getSalespersonByUid(uid);

    if (!salesperson) {
      return {
        props: {
          salesperson: null,
          error: 'Salesperson not found',
        },
      };
    }

    return {
      props: {
        salesperson,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        salesperson: null,
        error: 'Failed to fetch salesperson data',
      },
    };
  }
};

export default ProfilePage;