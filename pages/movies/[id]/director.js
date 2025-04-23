import path from 'path';
import fs from 'fs';

export default function DirectorPage({ director }) {
  if (!director) return <p>Director not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎬 Director Info</h1>
      <h2>{director.name}</h2>
      <p>{director.biography}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map(movie => ({
    params: { id: movie.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find(m => m.id.toString() === params.id);
  if (!movie) return { notFound: true };

  const director = data.directors.find(d => d.id === movie.directorId);

  return {
    props: {
      director: director || null
    },
    revalidate: 60
  };
}
