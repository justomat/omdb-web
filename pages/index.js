import Head from "next/head";
import MovieList from "../src/components/MovieList";
import SearchForm from "../src/components/SearchForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>

      <nav style={{ display: "inline", flexDirection: "row" }}>
        <h1>Home</h1>
        <SearchForm />
      </nav>

      <main>
        <MovieList keyword="Batman" />
      </main>
    </>
  );
}
