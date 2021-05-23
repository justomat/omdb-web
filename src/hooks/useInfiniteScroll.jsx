import { useCallback, useEffect } from "react";
import throttle from "lodash.throttle";

export function useInfiniteScroll(ref, handleNextPage) {
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
    if (ref.current) {
      observer.observe(ref.current);
      console.log("observing");
    }
    return () => observer.disconnect();
  }, []);
}
