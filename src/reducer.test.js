import {reducer, ActionType} from "./reducer.js";
import {FilmsList} from "./mocks/films.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList
  });
});

it(`Reducer should change film list`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList
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
    }]
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    genre: `Documentary`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    genre: `Comedies`,
    filmsList: FilmsList,
    filmsCurrent: FilmsList
  });
});
