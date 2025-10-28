export interface MovieVoorsetllingenProps {
  poster: string;
  title: string;
  duration: number;
  rating: string;
  genre: string;
  description: string;
  voorstelingen: showProps[];
  reviews: Review[];
}

type Review = {
  name: string;
  text: string;
  rating: number;
};

export interface showProps {
  begintijd: string;
  eindtijd: string;
  zaal: zaal;
}

export interface zaal {
  naam: string;
  rijen: number;
  stoeln_per_rij: number;
}

export interface MovieList {
  info: MovieVoorsetllingenProps[];
}

export const fakeMovies: MovieList = {
  info: [
    {
      poster: "https://image.tmdb.org/t/p/w500/inception.jpg",
      title: "Inception",
      duration: 148,
      rating: "PG-13",
      genre: "Sci-Fi, Thriller",
      description:
        "A skilled thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.",
      voorstelingen: [
        {
          begintijd: "12:30",
          eindtijd: "15:00",
          zaal: { naam: "Zaal 1", rijen: 10, stoeln_per_rij: 20 },
        },
        {
          begintijd: "16:15",
          eindtijd: "18:45",
          zaal: { naam: "Zaal 2", rijen: 8, stoeln_per_rij: 15 },
        },
        {
          begintijd: "20:00",
          eindtijd: "22:30",
          zaal: { naam: "Zaal 3", rijen: 12, stoeln_per_rij: 18 },
        },
      ],
      reviews: [
        { name: "Sophie", text: "Mind-blowing concept!", rating: 5 },
        { name: "Tom", text: "Complex but amazing visuals.", rating: 4 },
      ],
    },
    {
      poster: "https://image.tmdb.org/t/p/w500/interstellar.jpg",
      title: "Interstellar",
      duration: 169,
      rating: "PG-13",
      genre: "Adventure, Drama, Sci-Fi",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      voorstelingen: [
        {
          begintijd: "11:00",
          eindtijd: "13:50",
          zaal: { naam: "Zaal 1", rijen: 10, stoeln_per_rij: 20 },
        },
        {
          begintijd: "14:30",
          eindtijd: "17:20",
          zaal: { naam: "Zaal 2", rijen: 8, stoeln_per_rij: 15 },
        },
        {
          begintijd: "19:00",
          eindtijd: "21:50",
          zaal: { naam: "Zaal 3", rijen: 12, stoeln_per_rij: 18 },
        },
      ],
      reviews: [
        { name: "Anna", text: "Emotionally powerful and beautiful.", rating: 5 },
        { name: "Mark", text: "A masterpiece of sci-fi.", rating: 5 },
      ],
    },
    {
      poster: "https://image.tmdb.org/t/p/w500/dune2.jpg",
      title: "Dune: Part Two",
      duration: 166,
      rating: "PG-13",
      genre: "Action, Adventure, Drama",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      voorstelingen: [
        {
          begintijd: "13:00",
          eindtijd: "15:45",
          zaal: { naam: "Zaal 1", rijen: 9, stoeln_per_rij: 18 },
        },
        {
          begintijd: "17:00",
          eindtijd: "19:45",
          zaal: { naam: "Zaal 2", rijen: 10, stoeln_per_rij: 16 },
        },
        {
          begintijd: "21:00",
          eindtijd: "23:45",
          zaal: { naam: "Zaal 3", rijen: 11, stoeln_per_rij: 20 },
        },
      ],
      reviews: [
        { name: "Joris", text: "Epic continuation!", rating: 4 },
        { name: "Lena", text: "Visually stunning!", rating: 5 },
      ],
    },
    {
      poster: "https://image.tmdb.org/t/p/w500/joker.jpg",
      title: "Joker",
      duration: 122,
      rating: "PG-13",
      genre: "Crime, Drama, Thriller",
      description:
        "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society, leading him into a downward spiral of revolution and crime.",
      voorstelingen: [
        {
          begintijd: "10:30",
          eindtijd: "12:30",
          zaal: { naam: "Zaal 1", rijen: 8, stoeln_per_rij: 14 },
        },
        {
          begintijd: "14:00",
          eindtijd: "16:00",
          zaal: { naam: "Zaal 2", rijen: 9, stoeln_per_rij: 15 },
        },
        {
          begintijd: "19:00",
          eindtijd: "21:00",
          zaal: { naam: "Zaal 3", rijen: 10, stoeln_per_rij: 16 },
        },
      ],
      reviews: [
        { name: "Lisa", text: "Dark and intense!", rating: 4 },
        { name: "Arno", text: "Phoenix is brilliant.", rating: 5 },
      ],
    },
    {
      poster: "https://image.tmdb.org/t/p/w500/spiderman.jpg",
      title: "Spider-Man: No Way Home",
      duration: 148,
      rating: "8.3",
      genre: "Action, Adventure, Fantasy",
      description:
        "With Spider-Man's identity now revealed, Peter Parker seeks help from Doctor Strange, but the spell goes wrong and dangerous foes from other worlds start to appear.",
      voorstelingen: [
        {
          begintijd: "11:00",
          eindtijd: "13:30",
          zaal: { naam: "Zaal 1", rijen: 12, stoeln_per_rij: 18 },
        },
        {
          begintijd: "15:00",
          eindtijd: "17:30",
          zaal: { naam: "Zaal 2", rijen: 10, stoeln_per_rij: 20 },
        },
        {
          begintijd: "20:00",
          eindtijd: "22:30",
          zaal: { naam: "Zaal 3", rijen: 14, stoeln_per_rij: 22 },
        },
      ],
      reviews: [
        { name: "Daan", text: "Best Spider-Man ever!", rating: 5 },
        { name: "Eva", text: "Fun and emotional.", rating: 4 },
      ],
    },
  ],
};
