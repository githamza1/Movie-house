import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const { id } = req.query; // still a string
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const allMovies = data.movies;

  console.log('Looking for genreId:', id);
  console.log('Sample movie:', allMovies[0]);

  const filtered = allMovies.filter(movie => movie.genreId === id);

  console.log('Filtered movies:', filtered);

  res.status(200).json(filtered);
}
