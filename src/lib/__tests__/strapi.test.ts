import { formatWhatsAppNumber, createWhatsAppLink } from '../whatsapp-utils';

// Mock testing for WhatsApp number formatting
describe('WhatsApp Utils', () => {
  test('should add Indonesian country code to local number starting with 0', () => {
    const result = formatWhatsAppNumber('08123456789');
    expect(result).toBe('628123456789');
  });

  test('should keep number if already has Indonesian country code', () => {
    const result = formatWhatsAppNumber('628123456789');
    expect(result).toBe('628123456789');
  });

  test('should add Indonesian country code to number without prefix', () => {
    const result = formatWhatsAppNumber('8123456789');
    expect(result).toBe('628123456789');
  });

  test('should remove all non-digit characters', () => {
    const result = formatWhatsAppNumber('+62-812-345-6789');
    expect(result).toBe('628123456789');
  });
});