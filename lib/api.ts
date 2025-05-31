import { User } from "@/types/user";

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  return response.json();
}

export async function addUser(userData: Partial<User>): Promise<User> {
  // In a real app, this would actually post to an API
  // For this demo, we're just simulating a successful response
  
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  
  return response.json();
}