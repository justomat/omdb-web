import Head from "next/head";
import { useCallback, useRef } from "react";
import { useRouter } from "next/router";
import MovieList from "../src/components/MovieList";

export default function SearchPage() {
  const input = useRef(null);
  const search = useCallback((e) => {
    e.preventDefault();

    const query = input.current.value;
    if (query) window.location.href = `/search?id=${query}`;
  }, []);

  const router = useRouter();
  const s = router.query.s;

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <nav style={{ display: "inline", flexDirection: "row" }}>
        <h1>Search result for '{s}'</h1>
        <input ref={input} />
        <button onClick={search}>search</button>
      </nav>

      <main>
        <MovieList keyword={s} />
      </main>

      <footer></footer>
    </>
  );
}
