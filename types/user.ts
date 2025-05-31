export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    suite?: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
  company?: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
  website?: string;
  username?: string;
}

export interface UserFormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  
  // Step 2: Address
  street: string;
  city: string;
  zipcode: string;
  
  // Additional fields
  phone?: string;
}