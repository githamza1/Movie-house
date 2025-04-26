import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function GenresPage({ genres }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎭 Movie Genres</h1>
      <ul>
        {genres.map(genre => (
          <li key={genre.id}>
            <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres
    }
  };
}
