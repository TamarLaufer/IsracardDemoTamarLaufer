import { Book } from './types/navigation';

export enum SortBy {
  TITLE_AZ = 'TITLE_AZ',
  PAGES = 'PAGES',
  RELEASE_DATE = 'RELEASE_DATE',
}

const comparators: Record<SortBy, (a: Book, b: Book) => number> = {
  [SortBy.TITLE_AZ]: (a, b) => (a.title ?? '').localeCompare(b.title ?? ''),
  [SortBy.PAGES]: (a, b) => (a.pages ?? 0) - (b.pages ?? 0),
  [SortBy.RELEASE_DATE]: (a, b) =>
    new Date(a.releaseDate ?? 0).getTime() -
    new Date(b.releaseDate ?? 0).getTime(),
};

export function sortBooks(books: Book[], sortBy: SortBy): Book[] {
  return [...books].sort(comparators[sortBy]);
}
