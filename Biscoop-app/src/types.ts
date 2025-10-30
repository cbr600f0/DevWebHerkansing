// User types
export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
}

// Movie types
export interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string;
  year: number;
  duration: number;
  rating: number;
  watchedDate: string;
  review?: string;
}

// Showtime types
export interface Showtime {
  time: string;
  room: string;
  total: number;
  available: number;
}