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

    interface ShowPropNoMovie {
        id: string;
        start_date: Date;
        end_date: Date;
        zaal: ZaalProp;
    }

    export interface MovieVoorsetllingenProps {
        movie: MovieProp;
        voorstelingen: ShowPropNoMovie[];
        reviews: Review[];
    }

    export type Review = {
        name: string;
        text: string;
        rating: number;
    };

    export interface MovieList {
        info: MovieVoorsetllingenProps[];
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
// ----- Show data -----
export const fakeShows: ShowProp[] = [
  {
    id: "show-1",
    start_date: new Date("2025-10-28T14:00:00"),
    end_date: new Date("2025-10-28T16:00:00"),
    movie: fakeMovies[0],
    zaal: fakeZalen[0],
  },
  {
    id: "show-2",
    start_date: new Date("2025-10-28T17:00:00"),
    end_date: new Date("2025-10-28T19:00:00"),
    movie: fakeMovies[1],
    zaal: fakeZalen[1],
  },
  {
    id: "show-3",
    start_date: new Date("2025-10-28T20:00:00"),
    end_date: new Date("2025-10-28T22:10:00"),
    movie: fakeMovies[2],
    zaal: fakeZalen[2],
  },
  {
    id: "show-4",
    start_date: new Date("2025-10-29T14:00:00"),
    end_date: new Date("2025-10-29T16:00:00"),
    movie: fakeMovies[1],
    zaal: fakeZalen[0],
  },
];

// ----- Fake Reviews -----
export const fakeReviews: Review[][] = [
  // Reviews for movie-1
  [
    { name: "Sophie", text: "Incredible story with great visuals!", rating: 5 },
    { name: "Mark", text: "A bit confusing, but very entertaining.", rating: 4 },
  ],
  // Reviews for movie-2
  [
    { name: "Emma", text: "So romantic and beautifully shot.", rating: 5 },
    { name: "Liam", text: "Predictable, but still enjoyable.", rating: 3 },
  ],
  // Reviews for movie-3
  [
    { name: "Noah", text: "Suspenseful and chilling!", rating: 5 },
    { name: "Ava", text: "Too dark for my taste, but well made.", rating: 4 },
  ],
];

// ----- Movie List -----
export const movieList: MovieList = {
  info: [
    {
      movie: fakeMovies[0],
      voorstelingen: [
        {
          id: "show-1",
          start_date: new Date("2025-10-28T14:00:00"),
          end_date: new Date("2025-10-28T16:00:00"),
          zaal: fakeZalen[0],
        },
        {
          id: "show-2",
          start_date: new Date("2025-10-29T18:00:00"),
          end_date: new Date("2025-10-29T20:00:00"),
          zaal: fakeZalen[1],
        },
      ],
      reviews: fakeReviews[0],
    },
    {
      movie: fakeMovies[1],
      voorstelingen: [
        {
          id: "show-3",
          start_date: new Date("2025-10-28T17:00:00"),
          end_date: new Date("2025-10-28T19:00:00"),
          zaal: fakeZalen[1],
        },
        {
          id: "show-4",
          start_date: new Date("2025-10-30T20:00:00"),
          end_date: new Date("2025-10-30T22:00:00"),
          zaal: fakeZalen[0],
        },
      ],
      reviews: fakeReviews[1],
    },
    {
      movie: fakeMovies[2],
      voorstelingen: [
        {
          id: "show-5",
          start_date: new Date("2025-10-29T21:00:00"),
          end_date: new Date("2025-10-29T23:10:00"),
          zaal: fakeZalen[2],
        },
        {
          id: "show-6",
          start_date: new Date("2025-10-31T22:00:00"),
          end_date: new Date("2025-11-01T00:10:00"),
          zaal: fakeZalen[1],
        },
      ],
      reviews: fakeReviews[2],
    },
  ],
};
