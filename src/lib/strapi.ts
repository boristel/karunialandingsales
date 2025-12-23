// Strapi API configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Helper function to get full image URL
export function getImageUrl(imagePath: string | null | undefined): string | null {
  if (!imagePath) return null;

  // If it's already an absolute URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Otherwise, prepend the Strapi base URL
  return `${STRAPI_URL}${imagePath}`;
}

// Photo interface
export interface PhotoProfile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    small?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    thumbnail?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    medium?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
    large?: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: string | null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Salesperson interface matching the actual API response
export interface Salesperson {
  id: number;
  documentId: string;
  sales_uid: string;
  email: string;
  surename: string;
  address: string;
  city: string;
  province: string;
  phonenumber: string;
  wanumber: string;
  namasupervisor: string;
  approved: boolean;
  blocked: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  online_stat: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo_profile?: PhotoProfile;
}

export interface Branch {
  id: number;
  documentId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  province: string;
  phone_number: string;
  whatsapp_number: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fetch salesperson by UID from sales-profiles endpoint
export async function getSalespersonByUid(uid: string): Promise<Salesperson | null> {
  try {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    // Add API key if available
    if (process.env.STRAPI_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.STRAPI_API_KEY}`;
    }

    // Build URL with proper encoding
    const url = new URL(`${STRAPI_URL}/api/sales-profiles`);
    url.searchParams.append('filters[sales_uid][$eq]', uid);
    url.searchParams.append('populate', '*');

    // console.log('Fetching URL:', url.toString());

    const response = await fetch(
      url.toString(),
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StrapiResponse<Salesperson> = await response.json();
    // console.log('API Data:', JSON.stringify(data, null, 2));

    if (data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error('Error fetching salesperson:', error);
    return null;
  }
}

// Fetch all branches
export async function getBranches(): Promise<Branch[]> {
  try {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (process.env.STRAPI_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.STRAPI_API_KEY}`;
    }

    const response = await fetch(`${STRAPI_URL}/api/branches`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StrapiResponse<Branch> = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
}