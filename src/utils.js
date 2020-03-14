export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const ratingTransition = (rating) => {

  let filmRating;
  switch (true) {
    case (rating <= 3):
      filmRating = `Bad`;
      break;
    case (rating <= 5):
      filmRating = `Normal`;
      break;
    case (rating <= 8):
      filmRating = `Good`;
      break;
    case (rating < 10):
      filmRating = `Very Good`;
      break;
    default:
      filmRating = `Awesome`;
  }
  return filmRating;
};
