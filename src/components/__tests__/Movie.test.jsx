import { render, screen } from "@testing-library/react";
import React from "react";
import { Movie } from "../Movie";

jest.mock("next/image", () => {
  return ({ src }) => <img src={src} />;
});

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

const mockData = {
  Title: "Batman Begins",
  Year: "2005",
  imdbID: "tt0372784",
  Type: "movie",
  Poster: "http://placehold.it/150x225",
};

describe("Movie", () => {
  beforeEach(() => {
    render(<Movie data={mockData} />);
  });

  it("renders title correctly", () => {
    expect(
      screen.getByText(`${mockData.Title} (${mockData.Year})`)
    ).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/movie?id=" + mockData.imdbID
    );
  });

  it("renders poster correctly", () => {
    const image = screen.getByRole("img");
    expect(image.src).toContain(mockData.Poster);
  });
});
