import {extend} from "./utils.js";
import {FilmsList} from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  filmsList: FilmsList,
  filmsCurrent: FilmsList,
  showedFilms: FilmsList.slice(0, 8),
  filmsCount: 8,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS_LIST: `CHANGE_FILMS_LIST`,
  CHANGE_FILMS_COUNT: `CHANGE_FILMS_COUNT`,
  CHANGE_SHOWED_FILMS: `CHANGE_SHOWED_FILMS`,
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

  changeShowedFilms: () => ({
    type: ActionType.CHANGE_SHOWED_FILMS,
  }),

  changeFilmsCount: () => ({
    type: ActionType.CHANGE_FILMS_COUNT,
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

    case ActionType.CHANGE_FILMS_COUNT:
      return extend(state, {
        filmsCount: state.filmsCount + action.payload,
      });

    case ActionType.CHANGE_SHOWED_FILMS:
      return extend(state, {
        showedFilms: state.filmsCurrent.slice(0, state.filmsCount),
      });

    case ActionType.RESET_FILMS_COUNT:
      return extend(state, {
        filmsCount: 8
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
