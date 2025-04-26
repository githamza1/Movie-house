import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function GenreDetailPage({ genre, movies }) {
  if (!genre) return <p>Genre not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎭 {genre.name} Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found in this genre.</p>
      ) : (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <strong>{movie.title}</strong> ({movie.releaseYear})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.genres.map(genre => ({
    params: { id: genre.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find(g => g.id.toString() === params.id);
  if (!genre) return { notFound: true };

  const filteredMovies = data.movies.filter(m => m.genreId === genre.id);

  return {
    props: {
      genre,
      movies: filteredMovies
    },
    revalidate: 60
  };
}
