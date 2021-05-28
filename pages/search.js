import Head from "next/head";
import { useRouter } from "next/router";
import MovieList from "../src/components/MovieList";
import SearchForm from "../src/components/SearchForm";

export default function SearchPage() {
  const router = useRouter();
  const s = router.query.s;

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>

      <nav style={{ display: "inline", flexDirection: "row" }}>
        <h1>Search result for '{s}'</h1>
        <SearchForm />
      </nav>

      <main>
        <MovieList keyword={s} />
      </main>
    </>
  );
}
