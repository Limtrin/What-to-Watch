import {extend} from "./utils.js";
import {FilmsList} from "./mocks/films.js";
import {Film} from "./mocks/film.js";

const initialState = {
  genre: `All genres`,
  filmsList: FilmsList,
  filmsCurrent: FilmsList,
  showedFilms: FilmsList.slice(0, 8),
  filmsCount: 8,
  film: Film,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS_LIST: `CHANGE_FILMS_LIST`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_FILMS_COUNT: `RESET_FILMS_COUNT`,
};

const ActionCreator = {
  changeGenre: (chosenGenre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  changeFilmsList: () => ({
    type: ActionType.CHANGE_FILMS_LIST
  }),

  showMoreFilms: () => ({
    type: ActionType.SHOW_MORE_FILMS,
    payload: 8,
  }),

  resetFilmsCount: () => ({
    type: ActionType.RESET_FILMS_COUNT,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });

    case ActionType.CHANGE_FILMS_LIST:
      const {genre, filmsList} = state;

      if (genre === `All genres`) {
        return extend(state, {
          filmsCurrent: filmsList
        });
      }

      return extend(state, {
        filmsCurrent: filmsList.filter((film) => film.genre === genre),
      });

    case ActionType.SHOW_MORE_FILMS:
      const filmsCount = state.filmsCount + action.payload;
      return extend(state, {
        filmsCount,
        showedFilms: state.filmsCurrent.slice(0, filmsCount),
      });

    case ActionType.RESET_FILMS_COUNT:
      return extend(state, {
        filmsCount: 0
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
