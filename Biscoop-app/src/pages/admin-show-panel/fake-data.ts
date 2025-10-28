interface ZaalProp {
  id: string;
  naam: string;
  rijen: number;
  stoelen_per_rij: number;
}

interface MovieProp {
  id: string;
  title: string;
  duration: number;
  rating: string;
  genre: string;
  description: string;
}

interface ShowProp {
  id: string;
  start_date: Date;
  end_date: Date;
  movie: MovieProp;
  zaal: ZaalProp;
}

export const fakeShows: ShowProp[] = [
  {
    id: "show-1",
    start_date: new Date("2025-10-28T18:00:00"),
    end_date: new Date("2025-10-28T20:30:00"),
    movie: {
      id: "movie-1",
      title: "The Silent Horizon",
      duration: 150,
      rating: "PG-13",
      genre: "Sci-Fi",
      description: "A team of astronauts discovers a mysterious signal from a dying star that could change the fate of humanity.",
    },
    zaal: {
      id: "zaal-1",
      naam: "Zaal 1",
      rijen: 10,
      stoelen_per_rij: 15,
    },
  },
  {
    id: "show-2",
    start_date: new Date("2025-10-28T21:00:00"),
    end_date: new Date("2025-10-28T23:00:00"),
    movie: {
      id: "movie-2",
      title: "Echoes of Tomorrow",
      duration: 120,
      rating: "R",
      genre: "Thriller",
      description: "A detective races against time to stop a series of crimes predicted by a mysterious AI system.",
    },
    zaal: {
      id: "zaal-2",
      naam: "Zaal 2",
      rijen: 8,
      stoelen_per_rij: 12,
    },
  },
  {
    id: "show-3",
    start_date: new Date("2025-10-29T16:30:00"),
    end_date: new Date("2025-10-29T18:30:00"),
    movie: {
      id: "movie-3",
      title: "Whispers in the Wind",
      duration: 120,
      rating: "PG",
      genre: "Drama",
      description: "A small-town musician rediscovers her passion for life after returning to her childhood home.",
    },
    zaal: {
      id: "zaal-3",
      naam: "Zaal 3",
      rijen: 12,
      stoelen_per_rij: 18,
    },
  },
  {
    id: "show-4",
    start_date: new Date("2025-10-30T19:00:00"),
    end_date: new Date("2025-10-30T21:30:00"),
    movie: {
      id: "movie-4",
      title: "Crimson Shadows",
      duration: 150,
      rating: "PG-13",
      genre: "Action",
      description: "A retired agent is forced back into the field when a ghost from his past resurfaces.",
    },
    zaal: {
      id: "zaal-1",
      naam: "Zaal 1",
      rijen: 10,
      stoelen_per_rij: 15,
    },
  },
  {
    id: "show-5",
    start_date: new Date("2025-10-31T17:30:00"),
    end_date: new Date("2025-10-31T19:00:00"),
    movie: {
      id: "movie-5",
      title: "The Laughing Planet",
      duration: 90,
      rating: "G",
      genre: "Animation",
      description: "An adventurous robot travels the galaxy to bring laughter to every corner of the universe.",
    },
    zaal: {
      id: "zaal-2",
      naam: "Zaal 2",
      rijen: 8,
      stoelen_per_rij: 12,
    },
  },
];

export const fakeMovies: MovieProp[] = [
  {
    id: "movie-1",
    title: "The Silent Horizon",
    duration: 150,
    rating: "PG-13",
    genre: "Sci-Fi",
    description: "A team of astronauts discovers a mysterious signal from a dying star that could change the fate of humanity.",
  },
  {
    id: "movie-2",
    title: "Echoes of Tomorrow",
    duration: 120,
    rating: "R",
    genre: "Thriller",
    description: "A detective races against time to stop a series of crimes predicted by a mysterious AI system.",
  },
  {
    id: "movie-3",
    title: "Whispers in the Wind",
    duration: 120,
    rating: "PG",
    genre: "Drama",
    description: "A small-town musician rediscovers her passion for life after returning to her childhood home.",
  },
  {
    id: "movie-4",
    title: "Crimson Shadows",
    duration: 150,
    rating: "PG-13",
    genre: "Action",
    description: "A retired agent is forced back into the field when a ghost from his past resurfaces.",
  },
  {
    id: "movie-5",
    title: "The Laughing Planet",
    duration: 90,
    rating: "G",
    genre: "Animation",
    description: "An adventurous robot travels the galaxy to bring laughter to every corner of the universe.",
  }
];

export const fakeRooms: ZaalProp[] = [
  { id: "zaal-1", naam: "Zaal 1 - Grote Zaal", rijen: 15, stoelen_per_rij: 20 },
  { id: "zaal-2", naam: "Zaal 2 - Middenzaal", rijen: 10, stoelen_per_rij: 15 },
  { id: "zaal-3", naam: "Zaal 3 - Kleine Zaal", rijen: 8, stoelen_per_rij: 12 },
  { id: "zaal-4", naam: "Zaal 4 - VIP Lounge", rijen: 5, stoelen_per_rij: 10 },
  { id: "zaal-5", naam: "Zaal 5 - IMAX", rijen: 20, stoelen_per_rij: 25 },
];