
export interface AuthorType {
    id: number,
    name: string,
}



export interface ReviewsType {
  id: number,
  rating: number,
  date: string,
  author: AuthorType,
  text: string,
}

export interface FilmType {
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
  reviews: ReviewsType[],
  starring: string[],
  favorite: boolean,
}

export type FilmsType = FilmType[]