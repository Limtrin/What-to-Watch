import {reducer, ActionType} from "./data.js";
import {FilmsList} from "../../mocks/films.js";
import {Film} from "../../mocks/film.js";

const changedFilms = [{
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
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    },
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    },
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    },
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
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
  favorite: false,
},
{
  id: `no-country-for-old-men`,
  name: `Snatch`,
  genre: `Dramas`,
  year: 2009,
  image: `img/no-country-for-old-men.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  cover: `img/bg-the-grand-budapest-hotel.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  time: `2h 22m`,
  rating: 9.5,
  votes: 123,
  director: `Frank Spaskukotski`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes).`,
  reviews: [
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    },
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    },
    {
      rating: 10,
      date: `March 15, 2019`,
      author: {
        id: 1,
        name: `Jane Doe`
      },
      text: `Fantastic!`
    }
  ],
  starring: [
    `Keanu Reeves`,
    `Laurence Fishburne`,
    `Carrie-Anne Moss`,
    `Hugo Weaving`,
    `Joe Pantoliano`
  ],
  favorite: false,
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    filmsList: [],
    filmsCount: 8,
    film: {},
    myListFilms: null,
  });
});

it(`Reducer should change film list`, () => {
  expect(reducer({
    filmsList: [],
    genre: `All genres`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_FILMS_LIST,
    payload: FilmsList,
  })).toEqual({
    filmsList: FilmsList,
    genre: `All genres`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Comedies`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should change films count`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_FILMS_COUNT,
    payload: 16,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCount: 16,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should change promo film`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `All genres`,
    filmsCount: 8,
    film: [],
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_PROMO_FILM,
    payload: Film,
  })).toEqual({
    filmsList: FilmsList,
    genre: `All genres`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should load MyList`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.LOAD_MY_LIST_FILMS,
    payload: changedFilms,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCount: 8,
    film: Film,
    myListFilms: changedFilms,
  });
});
