import Head from "next/head";
import MovieList from "../src/components/MovieList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Index</title>
      </Head>

      <main>
        <h1>Home</h1>
        <MovieList keyword="Batman" page={1}/>
      </main>

      <footer>
        
      </footer>
    </div>
  );
}
