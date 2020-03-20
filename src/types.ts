
export interface AuthorInterface {
    id: number,
    name: string,
}



export interface ReviewsInterface {
  id: number,
  rating: number,
  date: string,
  author: AuthorInterface,
  text: string,
}

export interface FilmInterface {
  id: string,
  name: string,
  genre: string,
  year: number,
  image: string,
  poster: string,
  cover: string,
  preview: string,
  time: string,
  rating: number,
  votes: number,
  director: string,
  description: string,
  reviews: ReviewsInterface[],
  starring: string[],
  favorite: boolean,
}

export type FilmsInterface = FilmInterface[]