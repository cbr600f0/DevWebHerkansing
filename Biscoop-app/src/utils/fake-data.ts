// ----- Interfaces -----
export interface ZaalProp {
  id: string;
  naam: string;
  rijen: number;
  stoelen_per_rij: number;
}

export interface MovieProp {
  id: string;
  title: string;
  duration: number;
  rating: string;
  genre: string;
  description: string;
}

export type Review = {
  name: string;
  text: string;
  rating: number;
  movieId: string;
};

export interface ShowProp {
  id: string;
  start_date: Date;
  end_date: Date;
  movieId: string;
  zaalId: string;
}

// ----- Fake Zalen -----
export const fakeZalen: ZaalProp[] = [
  { id: "zaal-1", naam: "Grote Zaal", rijen: 12, stoelen_per_rij: 20 },
  { id: "zaal-2", naam: "Middelgrote Zaal", rijen: 10, stoelen_per_rij: 15 },
  { id: "zaal-3", naam: "Kleine Zaal", rijen: 8, stoelen_per_rij: 10 },
];

// ----- Fake Movies -----
export const fakeMovies: MovieProp[] = [
  {
    id: "movie-1",
    title: "The Time Traveler",
    duration: 120,
    rating: "PG-13",
    genre: "Sci-Fi",
    description: "A scientist discovers a way to travel through time, but at a cost.",
  },
  {
    id: "movie-2",
    title: "Love in Paris",
    duration: 105,
    rating: "PG",
    genre: "Romance",
    description: "Two strangers meet in Paris and find love in unexpected ways.",
  },
  {
    id: "movie-3",
    title: "The Silent Forest",
    duration: 130,
    rating: "R",
    genre: "Thriller",
    description: "A detective investigates mysterious disappearances in a quiet forest.",
  },
];

// ----- Fake Reviews -----
export const fakeReviews: Review[] = [
  { name: "Sophie", text: "Incredible story with great visuals!", rating: 5, movieId: "movie-1" },
  { name: "Mark", text: "A bit confusing, but very entertaining.", rating: 4, movieId: "movie-1" },
  { name: "Emma", text: "So romantic and beautifully shot.", rating: 5, movieId: "movie-2" },
  { name: "Liam", text: "Predictable, but still enjoyable.", rating: 3, movieId: "movie-2" },
  { name: "Noah", text: "Suspenseful and chilling!", rating: 5, movieId: "movie-3" },
  { name: "Ava", text: "Too dark for my taste, but well made.", rating: 4, movieId: "movie-3" },
];

// ----- Fake Shows -----
export const fakeShows: ShowProp[] = [
  {
    id: "show-1",
    start_date: new Date("2025-10-28T14:00:00"),
    end_date: new Date("2025-10-28T16:00:00"),
    movieId: "movie-1",
    zaalId: "zaal-1",
  },
  {
    id: "show-2",
    start_date: new Date("2025-10-28T17:00:00"),
    end_date: new Date("2025-10-28T19:00:00"),
    movieId: "movie-2",
    zaalId: "zaal-2",
  },
  {
    id: "show-3",
    start_date: new Date("2025-10-28T20:00:00"),
    end_date: new Date("2025-10-28T22:10:00"),
    movieId: "movie-3",
    zaalId: "zaal-3",
  },
  {
    id: "show-4",
    start_date: new Date("2025-10-29T14:00:00"),
    end_date: new Date("2025-10-29T16:00:00"),
    movieId: "movie-2",
    zaalId: "zaal-1",
  },
];
