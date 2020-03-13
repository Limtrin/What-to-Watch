import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;


export const getFilmsList = (state) => {
  return state[NAME_SPACE].filmsList;
};

export const getPromFilm = (state) => {
  return state[NAME_SPACE].film;
};

export const getGenres = (state) => {
  return state[NAME_SPACE].genre;
};

export const getfilmCurrent = (state) => {
  return state[NAME_SPACE].filmsCurrent;
};

export const getShowedFilms = (state) => {
  return state[NAME_SPACE].showedFilms;
};

export const getFilmsCount = (state) => {
  return state[NAME_SPACE].filmsCount;
};

export const getMyListFilms = (state) => {
  return state[NAME_SPACE].myListFilms;
};
