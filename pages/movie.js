import { useRouter } from "next/router";
import { useQuery } from "@redux-requests/react";
import { getMovie, GET_MOVIE } from "../src/redux/action";

function render(key, value) {
  if (key === "Response") return null;
  switch (typeof value) {
    case "string":
      return (
        <tr>
          <th>{key}</th>
          <td>{key === "Poster" ? <a href={value} target="_blank">see</a> : value}</td>
        </tr>
      );
    case "object":
      return (
        <tr>
          <th>{key}</th>
          <td>{value.map((s) => Object.values(s).join("=")).join(", ")}</td>
        </tr>
      );
  }
}

export default function MoviePage() {
  const router = useRouter();
  const id = router.query.id;

  const { data, error, loading } = useQuery({
    type: GET_MOVIE,
    action: getMovie,
    variables: [id],
    autoLoad: true,
    requestKey: id,
  });

  if (error) return error;
  if (loading || data == null) return "Loading...";
  return <table>{Object.entries(data).map((m) => render(...m))}</table>;
}
