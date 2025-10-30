import type { MovieProp, Review, ZaalProp, ShowProp } from "./fake-data";
import { fakeMovies, fakeReviews, fakeZalen, fakeShows } from "./fake-data";

const STORAGE_KEY = "movieAppData";

export interface AppData {
  fakeMovies: MovieProp[];
  fakeReviews: Review[];
  fakeZalen: ZaalProp[];
  fakeShows: ShowProp[];
}

export function initStorage() {
  if (!sessionStorage.getItem(STORAGE_KEY)) {
    const data: AppData = {
      fakeMovies: fakeMovies,
      fakeReviews: fakeReviews,
      fakeZalen: fakeZalen,
      fakeShows: fakeShows,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

export function getAppData(): AppData {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) {
    initStorage();
    return getAppData();
  }
  return JSON.parse(raw);
}

export function setAppData(data: AppData) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addItem(key: keyof AppData, newItem: any) {
  const data = getAppData();

  switch (key) {
    case "fakeMovies":
      data.fakeMovies.push(newItem as MovieProp);
      break;

    case "fakeShows":
      data.fakeShows.push(newItem as ShowProp);
      break;

    case "fakeZalen":
      data.fakeZalen.push(newItem as ZaalProp);
      break;

    default:
      throw new Error(`Unknown key: ${key}`);
  }

  setAppData(data);
}

export function updateItem(key: keyof AppData, updatedItem: any) {
  const data = getAppData();

  switch (key) {
    case "fakeMovies":
      data.fakeMovies = data.fakeMovies.map(item =>
        item.id === updatedItem.id ? (updatedItem as MovieProp) : item
      );
      break;

    case "fakeShows":
      data.fakeShows = data.fakeShows.map(item =>
        item.id === updatedItem.id ? (updatedItem as ShowProp) : item
      );
      break;

    case "fakeZalen":
      data.fakeZalen = data.fakeZalen.map(item =>
        item.id === updatedItem.id ? (updatedItem as ZaalProp) : item
      );
      break;

    default:
      throw new Error(`Unknown key: ${key}`);
  }

  setAppData(data);
}

export function deleteItem<K extends keyof AppData>(key: K, id: string) {
  const data = getAppData();

  switch (key) {
    case "fakeMovies":
      data.fakeMovies = data.fakeMovies.filter(m => m.id !== id);
      data.fakeShows = data.fakeShows.filter(s => s.movieId !== id);
      data.fakeReviews = data.fakeReviews.filter(r => r.movieId !== id);
      break;

    case "fakeZalen":
      data.fakeZalen = data.fakeZalen.filter(z => z.id !== id);
      data.fakeShows = data.fakeShows.filter(s => s.zaalId !== id);
      break;

    case "fakeShows":
      data.fakeShows = data.fakeShows.filter(s => s.id !== id);
      break;

    default:
      throw new Error(`Unknown key: ${key}`);
  }

  setAppData(data);
}
