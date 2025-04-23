import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Movie House</h1>
      <h2>🔥 Trending Movies</h2>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.releaseYear}) - Rating: {movie.rating}
          </li>
        ))}
      </ul>

      <button onClick={() => router.push('/genres')} style={{ marginTop: '2rem' }}>
        Browse Genres
      </button>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const trendingMovies = data.movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return {
    props: { trendingMovies },
    revalidate: 60, // ISR: regenerate page every 60 seconds
  };
}
