import throttle from "lodash.throttle";
import uniq from "lodash.uniq";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies } from "../redux/action";
import { Movie } from "./Movie";
import PosterModal from "./PosterModal";

ReactModal.setAppElement("#__next");

export default function MovieList({ keyword, page: pageProp = 1 }) {
  const [page, setPage] = useState(pageProp);
  useEffect(() => setPage(1), [keyword]); // reset page on keyword change

  // fetch movie list
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(-1);

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchNextPage() {
      const { data } = await dispatch(searchMovies(keyword, page));
      if (!data) return;
      if (page === 1) setTotal(data.totalResults);
      if (data.Response === "True" && data.Search) {
        setMovies((movies) => uniq([...movies, ...data.Search], "imdbID"));
      }
    }

    const hasMore = page <= Math.floor(total / 10) + 1;
    if (total === -1 || hasMore) fetchNextPage();
  }, [keyword, page]);

  // infinite scroll
  const loader = useRef(null);
  const handleNextPage = () => setPage((p) => p + 1);
  const handleObserver = useCallback(
    throttle(([target]) => {
      if (target.isIntersecting) handleNextPage();
    }, 500),
    []
  );
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });
    if (loader.current) {
      observer.observe(loader.current);
      console.log("observing");
    }
    return () => observer.disconnect();
  }, []);

  // poster popup
  const { selectedPoster } = useSelector((state) => state.modal);

  // if (error) return JSON.stringify(error);
  // if (loading || data == null) return "Loading...";
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
