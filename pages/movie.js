import { useRouter } from "next/router";
import { useQuery } from "@redux-requests/react";
import { getMovie, GET_MOVIE } from "../src/redux/action";

function render(key, value) {
  if (key === "Response") return null;

  let content = null;
  switch (typeof value) {
    case "string":
      if (key === "Poster") {
        content = (
          <a href={value} target="_blank">
            see
          </a>
        );
      } else {
        content = value;
      }
      break;
    case "object":
      content = value.map((s) => Object.values(s).join("=")).join(", ");
      break;
  }
  return (
    <tr key={key}>
      <th>{key}</th>
      <td>{content}</td>
    </tr>
  );
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
  return (
    <table>
      <tbody>{Object.entries(data).map((m) => render(...m))}</tbody>
    </table>
  );
}
