export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const GET_MOVIE = "GET_MOVIES";

export const searchMovies = (keyword, page) => ({
  type: SEARCH_MOVIES,
  request: {
    url: "/",
    params: {
      s: keyword,
      page,
    },
  },
  meta: {
    cache: true,
    requestKey: `${keyword}/${page}`,
  },
});

export const getMovie = (id) => ({
  type: GET_MOVIE,
  request: {
    url: "/",
    params: { i: id },
  },
  meta: {
    cache: true,
    requestKey: id,
  },
});
