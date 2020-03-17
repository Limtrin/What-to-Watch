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
}];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    filmsList: [],
    filmsCurrent: [],
    showedFilms: [],
    filmsCount: 8,
    film: {},
    myListFilms: null,
  });
});

it(`Reducer should change film list`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `All genres`,
    filmsCurrent: [],
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_FILMS_LIST,
  })).toEqual({
    filmsList: FilmsList,
    genre: `All genres`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should change genre`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_GENRE,
    payload: `Comedies`,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Comedies`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should show more films`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
    payload: 8,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 16),
    filmsCount: 16,
    film: Film,
    myListFilms: null,
  });
});


it(`Reducer should reset films count`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 16,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.RESET_FILMS_COUNT,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 0,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should load films`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.LOAD_FILMS,
    payload: changedFilms,
  })).toEqual({
    filmsList: changedFilms,
    genre: `Documentary`,
    filmsCurrent: changedFilms,
    showedFilms: changedFilms.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});

it(`Reducer should load promo film`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: {},
    myListFilms: null,
  }, {
    type: ActionType.LOAD_PROMO_FILM,
    payload: changedFilms[0],
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: changedFilms[0],
    myListFilms: null,
  });
});

it(`Reducer should change favorite status`, () => {
  expect(reducer({
    filmsList: changedFilms,
    genre: `Documentary`,
    filmsCurrent: changedFilms,
    showedFilms: changedFilms.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.CHANGE_FAVORITE_STATUS,
    payload: `shutter-island`,
  })).toEqual({
    filmsList: [{
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
      favorite: true,
    }],
    genre: `Documentary`,
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
      favorite: true,
    }],
    showedFilms: [{
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
      favorite: true,
    }].slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  });
});


it(`Reducer should load MyList`, () => {
  expect(reducer({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: null,
  }, {
    type: ActionType.LOAD_MY_LIST_FILMS,
    payload: changedFilms,
  })).toEqual({
    filmsList: FilmsList,
    genre: `Documentary`,
    filmsCurrent: FilmsList,
    showedFilms: FilmsList.slice(0, 8),
    filmsCount: 8,
    film: Film,
    myListFilms: changedFilms,
  });
});
