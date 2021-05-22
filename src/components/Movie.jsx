import Image from "next/image";

export function Movie({ data }) {
  return (
    <div
      style={{
        border: "1px solid black",
        margin: "24px 4px",
        padding: 8,
      }}
    >
      <h3>
        {data.Title} ({data.Year})
      </h3>

      <Image src={data.Poster} width={150} height={225} />
    </div>
  );
}
