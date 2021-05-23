import { useQuery } from "@redux-requests/react";
import uniq from "lodash.uniq";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { searchMovies, SEARCH_MOVIES } from "../redux/action";
import { Movie } from "./Movie";
import PosterModal from "./PosterModal";

ReactModal.setAppElement("#__next");

export default function MovieList({ keyword, page: pageProp = 1 }) {
  const [movies, setMovies] = useState([]);

  // pagination
  const [page, setPage] = useState(pageProp);
  const [lastPage, setLastPage] = useState(-1);
  useEffect(() => setPage(1), [keyword]); // reset page on keyword change

  // fetch movie list
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchNextPage() {
      const { data } = await dispatch(searchMovies(keyword, page));
      if (!data) return;
      if (page === 1) setLastPage(Math.floor(data.totalResults / 10) + 1);
      if (data.Response === "True" && data.Search) {
        setMovies((movies) => uniq([...movies, ...data.Search], "imdbID"));
      }
    }

    if (lastPage === -1 || page <= lastPage) fetchNextPage();
  }, [keyword, page]);

  // infinite scroll
  const loader = useRef(null);
  useInfiniteScroll(loader, () => setPage((p) => p + 1));

  // poster popup
  const { selectedPoster } = useSelector((state) => state.modal);

  const { error, loading } = useQuery({ type: SEARCH_MOVIES });
  if (error) return JSON.stringify(error);
  if (loading) return "Loading...";
  return (
    <>
      <PosterModal selectedPoster={selectedPoster} />

      <div style={{ marginBottom: 40 }}>
        {movies.map((m) => (
          <Movie key={m.imdbID} data={m} />
        ))}
      </div>
      <div ref={loader} />
    </>
  );
}
