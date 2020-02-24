import {extend} from "./utils.js";
import {FilmsList} from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  filmsList: FilmsList,
  filmsCurrent: FilmsList
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS_LIST: `CHANGE_FILMS_LIST`,
};

const ActionCreator = {
  changeGenre: (chosenGenre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  changeFilmsList: () => ({
    type: ActionType.CHANGE_FILMS_LIST
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
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
