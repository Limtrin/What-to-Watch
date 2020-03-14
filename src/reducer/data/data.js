import {extend} from "../../utils.js";
import adapter from "./adapter.js";
import {commentsAdapter} from "./adapter.js";

const initialState = {
  filmsList: [],
  film: {},
  genre: `All genres`,
  filmsCurrent: [],
  showedFilms: [],
  filmsCount: 8,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS_LIST: `CHANGE_FILMS_LIST`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
  RESET_FILMS_COUNT: `RESET_FILMS_COUNT`,
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  CHANGE_FAVORITE_STATUS: `CHANGE_FAVORITE_STATUS`,
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

  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
  },

  loadPromoFilm: (films) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: films,
    };
  },

  changeFavoriteStatus: (filmId) => {
    return {
      type: ActionType.CHANGE_FAVORITE_STATUS,
      payload: filmId,
    };
  },
};

const loadComments = (item) => (dispatch, getState, api) => {
  return api.get(`/comments/${item.id}`)
    .then((response) => {
      item.reviews = response.data.map((review) => commentsAdapter(review));
    });
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const adaptedData = response.data.map((item) => {
          const adaptedItem = adapter(item);
          dispatch(loadComments(adaptedItem));
          return adaptedItem;
        });
        dispatch(ActionCreator.loadFilms(adaptedData));
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const adaptedData = adapter(response.data);
        dispatch(ActionCreator.loadPromoFilm(adaptedData));
      });
  },
  changeFavoriteStatus: (filmId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/${status}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(ActionCreator.changeFavoriteStatus(filmId));
        }
      });
  },
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

    case ActionType.LOAD_FILMS:
      return extend(state, {
        filmsList: action.payload,
        filmsCurrent: action.payload,
        showedFilms: action.payload.slice(0, state.filmsCount),
      });

    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        film: action.payload,
      });

    case ActionType.CHANGE_FAVORITE_STATUS:
      const changedFilmsList = state.filmsList.map((film) => {
        if (film.id === action.payload) {
          film.favorite = !film.favorite;
        } return film;
      });
      let filmsCurrent;
      if (state.genre === `All genres`) {
        filmsCurrent = state.filmsList;
      } else {
        filmsCurrent = state.filmsList.filter((film) => film.genre === state.genre);
      }
      const showedFilms = filmsCurrent.slice(0, state.filmsCount);
      const promoFilm = state.film.id === action.payload ? extend(state, extend(state.film, {favorite: !state.film.favorite})) : state.film;
      return extend(state, {
        filmsList: changedFilmsList,
        filmsCurrent,
        showedFilms,
        film: promoFilm,
      });
  }

  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
