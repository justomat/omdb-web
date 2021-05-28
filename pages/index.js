import Head from "next/head";
import { useCallback, useRef } from "react";
import MovieList from "../src/components/MovieList";

export default function Home() {
  const input = useRef(null);
  const search = useCallback((e) => {
    e.preventDefault();

    const query = input.current.value;
    if (query) window.location.href = `/search?s=${query}`;
  }, []);

  return (
    <>
      <Head>
        <title>Index</title>
      </Head>

      <nav style={{ display: "inline", flexDirection: "row" }}>
        <h1>Home</h1>
        <input ref={input} />
        <button onClick={search}>search</button>
      </nav>

      <main>
        <MovieList keyword="Batman" />
      </main>
    </>
  );
}
