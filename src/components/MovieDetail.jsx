import { useQuery } from "@redux-requests/react";
import { getMovie, GET_MOVIE } from "../redux/action";

function render(key, value) {
  if (key === "Response") return null;

  let content = null;
  switch (key) {
    case "Poster":
      content = <a href={value}>see</a>;
      break;
    case "Ratings":
      content = value.map((s) => Object.values(s).join("=")).join(", ");
      break;
    default:
      content = value;
      break;
  }
  return (
    <tr key={key}>
      <th>{key}</th>
      <td>{content}</td>
    </tr>
  );
}

export default function MovieDetail({ id }) {
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
