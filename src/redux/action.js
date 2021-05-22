export const SEARCH_MOVIES = "SEARCH_MOVIES";

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
