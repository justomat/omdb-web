import { useEffect, useRef } from "react";
import { useQuery } from "@redux-requests/react";
import { searchMovies, SEARCH_MOVIES } from "../redux/action";
import { Movie } from "./Movie";

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

  if (error) return error;
  if (loading || data == null) return "Loading...";
  return (
    <div
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      {data.Search.map((m) => (
        <Movie data={m} />
      ))}
    </div>
  );
}
