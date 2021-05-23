import Image from "next/image";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/action";

export function Movie({ data }) {
  const dispatch = useDispatch();
  const handleImageClick = useCallback(() => {
    const action = openModal(data.Poster);
    dispatch(action);
  }, [dispatch, data]);

  return (
    <div
      style={{
        border: "1px solid black",
        margin: "24px 4px",
        padding: 8,
      }}
    >
      <h3>
        <a href={`/movie?id=${data.imdbID}`}>
          {data.Title} ({data.Year})
        </a>
      </h3>

      <Image
        src={
          data.Poster === "N/A" ? "http://placehold.it/150x225" : data.Poster
        }
        width={150}
        height={225}
        onClick={handleImageClick}
      />
    </div>
  );
}
