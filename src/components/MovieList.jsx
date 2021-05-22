import { useQuery } from "@redux-requests/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { searchMovies, SEARCH_MOVIES } from "../redux/action";
import { Movie } from "./Movie";
import PosterModal from "./PosterModal";

function useInfiniteScroll(ref, handleNextPage) {
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      handleNextPage();
    }
  };
}

export default function MovieList({ keyword, page = 1 }) {
  const { data, error, loading } = useQuery({
    type: SEARCH_MOVIES,
    action: searchMovies,
    variables: [keyword, page],
    autoLoad: true,
    requestKey: `${keyword}/${page}`,
  });

  const loader = useRef(null);

  useInfiniteScroll(loader, () => {});

  const { selectedPoster } = useSelector((state) => state.modal);

  if (error) return error;
  if (loading || data == null) return "Loading...";
  return (
    <>
      <PosterModal selectedPoster={selectedPoster} />

      <div>
        {data.Search.map((m) => (
          <Movie key={m.imdbID} data={m} />
        ))}
      </div>
    </>
  );
}
