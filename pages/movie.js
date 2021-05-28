import Head from "next/head";
import { useRouter } from "next/router";
import MovieDetail from "../src/components/MovieDetail";

export default function MoviePage() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <>
      <Head>
        <title>Details</title>
      </Head>

      <nav style={{ display: "inline", flexDirection: "row" }}>
        <h1>Details</h1>
      </nav>

      <main>
        <MovieDetail id={id} />
      </main>
    </>
  );
}
