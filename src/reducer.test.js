import {reducer, ActionType} from "./reducer.js";
import {FilmsList} from "./mocks/films.js";
import {Film} from "./mocks/film.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  });
});

it(`Reducer should change film list`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  }, {
    type: ActionType.CHANGE_FILMS_LIST,
  })).toEqual({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: [{
      id: `shutter-island`,
      name: `Shutter Island`,
      genre: `Documentary`,
      year: 2010,
      image: `img/shutter-island.jpg`,
      poster: `img/the-grand-budapest-hotel-poster.jpg`,
      cover: `img/bg-the-grand-budapest-hotel.jpg`,
      preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
      time: `2h 23m`,
      rating: 9.2,
      votes: 1800,
      director: `Steven Spilberg`,
      description: `When one of Gustaves lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
      reviews: [
        {
          rating: 10,
          date: `March 15, 2019`,
          author: `Jane Doe`,
          text: `Fantastic!`
        },
        {
          rating: 10,
          date: `March 15, 2019`,
          author: `Jane Doe`,
          text: `Fantastic!`
        },
        {
          rating: 10,
          date: `March 15, 2019`,
          author: `Jane Doe`,
          text: `Fantastic!`
        },
        {
          rating: 10,
          date: `March 15, 2019`,
          author: `Jane Doe`,
          text: `Fantastic!`
        }
      ],
      starring: [
        `Christian Bale`,
        `Michael Caine`,
        `Heath Ledger`,
        `Gary Oldman`,
        `Aaron Eckhart`,
        `Maggie Gyllenhaal`,
        `Morgan Freeman`
      ],
    }],
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    genre: `Comedies`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  });
});

it(`Reducer should show more films`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
    payload: 8,
  })).toEqual({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 16),
    filmsCount: 16,
    film: Film,
  });
});


it(`Reducer should reset films count`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 16,
    film: Film,
  }, {
    type: ActionType.RESET_FILMS_COUNT,
  })).toEqual({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 0,
    film: Film,
  });
});

