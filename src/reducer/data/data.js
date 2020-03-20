import {extend} from "../../utils.js";
import adapter from "./adapter.js";
import {commentsAdapter} from "./adapter.js";

const initialState = {
  filmsList: [],
  film: {},
  genre: `All genres`,
  filmsCount: 8,
  myListFilms: null,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_FILMS_LIST: `CHANGE_FILMS_LIST`,
  CHANGE_PROMO_FILM: `CHANGE_PROMO_FILM`,
  LOAD_MY_LIST_FILMS: `LOAD_MY_LIST_FILMS`,
  CHANGE_FILMS_COUNT: `CHANGE_FILMS_COUNT`
};

const ActionCreator = {
  changeGenre: (chosenGenre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: chosenGenre,
  }),

  changeFilmsList: (filmsList) => ({
    type: ActionType.CHANGE_FILMS_LIST,
    payload: filmsList,
  }),

  changeFilmsCount: (count) => ({
    type: ActionType.CHANGE_FILMS_COUNT,
    payload: count
  }),

  changePromoFilm: (film) => {
    return {
      type: ActionType.CHANGE_PROMO_FILM,
      payload: film,
    };
  },

  loadMyListFilms: (films) => {
    return {
      type: ActionType.LOAD_MY_LIST_FILMS,
      payload: films,
    };
  },
};

export const loadComments = (item) => (dispatch, getState, api) => {
  return api.get(`/comments/${item.id}`)
    .then((response) => {
      item.reviews = response.data.map((review) => commentsAdapter(review));
    })
    .catch(() => {
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
        dispatch(ActionCreator.changeFilmsList(adaptedData));
      })
      .catch(() => {
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const adaptedData = adapter(response.data);
        dispatch(ActionCreator.changePromoFilm(adaptedData));
      })
      .catch(() => {
      });
  },
  changeFavoriteStatus: (filmId, status) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/${status}`)
      .then((response) => {
        if (response.status === 200) {

          const state = getState().DATA;
          const filmsList = state.filmsList;
          const promoFilm = state.film;

          if (promoFilm.id === filmId) {
            const changedPromoFilm = extend(promoFilm, {favorite: !promoFilm.favorite});
            dispatch(ActionCreator.changePromoFilm(changedPromoFilm));
          }

          const changedFilmList = filmsList.map((item) => {
            if (item.id === filmId) {
              item.favorite = !item.favorite;
            }
            return item;
          });
          dispatch(ActionCreator.changeFilmsList(changedFilmList));
        }
      })
      .catch(() => {
      });
  },
  loadMyListFilms: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const adaptedData = response.data.map((item) => {
          const adaptedItem = adapter(item);
          dispatch(loadComments(adaptedItem));
          return adaptedItem;
        });
        dispatch(ActionCreator.loadMyListFilms(adaptedData));
      })
      .catch(() => {
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
      return extend(state, {
        filmsList: action.payload,
      });

    case ActionType.CHANGE_FILMS_COUNT:
      return extend(state, {
        filmsCount: action.payload,
      });

    case ActionType.CHANGE_PROMO_FILM:
      return extend(state, {
        film: action.payload,
      });

    case ActionType.LOAD_MY_LIST_FILMS:
      return extend(state, {
        myListFilms: action.payload,
      });
  }

  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
