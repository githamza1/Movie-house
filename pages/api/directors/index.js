import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR('/api/directors', fetcher); // swr using 

  if (error) return <p>Failed to load directors.</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Directors</h1>
      {data.directors.map((director) => (
        <div key={director.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <h2>{director.name}</h2>
          <p>{director.biography}</p>
          <h4>Movies Directed:</h4>
          <ul>
            {data.movies
              .filter((movie) => movie.directorId === director.id)
              .map((movie) => (
                <li key={movie.id}>
                  <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
