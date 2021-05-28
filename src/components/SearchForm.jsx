import { useCallback, useRef } from "react";

export default function SearchForm() {
  const input = useRef(null);
  const search = useCallback((e) => {
    e.preventDefault();

    const query = input.current.value;
    if (query) window.location.href = `/search?s=${query}`;
  }, []);

  return (
    <>
      <input ref={input} />
      <button onClick={search}>search</button>
    </>
  );
}
