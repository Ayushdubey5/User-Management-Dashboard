import { UserFormData } from '@/types/user';

const STORAGE_KEY = 'user-form-data';

export function saveFormData(data: UserFormData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function loadFormData(): UserFormData | null {
  if (typeof window !== 'undefined') {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error('Failed to parse saved form data:', error);
        return null;
      }
    }
  }
  return null;
}

export function clearFormData() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}