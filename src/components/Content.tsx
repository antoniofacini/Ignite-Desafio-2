import { useState, useEffect } from "react";
import { MovieCard } from "../components/MovieCard";
import { api } from "../services/api";
import "../styles/content.scss";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface ContentProps {
  title: string;
  genreId: number;
  setter: (genre: GenreResponseProps) => void;
}

export function Content({ title, genreId, setter }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${genreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${genreId}`).then((response) => {
      setter(response.data);
    });
  }, [genreId]);

  return (
    <>
      <header>
        <span className="category">
          Categoria:<span> {title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </>
  );
}
