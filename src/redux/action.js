export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const GET_MOVIE = "GET_MOVIES";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

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

export const openModal = (url) => ({
  type: OPEN_MODAL,
  payload: { url },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
