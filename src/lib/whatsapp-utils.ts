// WhatsApp utility functions
export const formatWhatsAppNumber = (number: string): string => {
  // Remove all non-digit characters
  const cleanNumber = number.replace(/\D/g, '');

  // Ensure it has country code (assuming Indonesian numbers)
  if (!cleanNumber.startsWith('62')) {
    return cleanNumber.startsWith('0') ? `62${cleanNumber.substring(1)}` : `62${cleanNumber}`;
  }

  return cleanNumber;
};

export const createWhatsAppLink = (phoneNumber: string, message?: string): string => {
  const formattedNumber = formatWhatsAppNumber(phoneNumber);
  const defaultMessage = 'Hi, I found your QR code and would like to inquire about your products.';
  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${formattedNumber}?text=${text}`;
};