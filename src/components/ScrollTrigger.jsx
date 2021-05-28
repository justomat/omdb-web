import { useRef } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export function ScrollTrigger({ onReached }) {
  const loader = useRef(null);
  useInfiniteScroll(loader, onReached);
  return <div ref={loader} />;
}
