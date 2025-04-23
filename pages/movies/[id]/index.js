import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function MovieDetails({ movie, directorName }) {
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{movie.title}</h1>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Director:</strong> 
        <Link href={`/movies/${movie.id}/director`}>
          {' '}{directorName}
        </Link>
      </p>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map(movie => ({   // tells Next.js which movie detail pages to pre-render.
    params: { id: movie.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking', // allows on-demand generation
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find(m => m.id.toString() === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find(d => d.id === movie.directorId);
  const directorName = director ? director.name : 'Unknown';

  return {
    props: {
      movie,
      directorName,
    },
    revalidate: 60,
  };
}
