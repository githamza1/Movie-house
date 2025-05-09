import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const movie = data.movies.find(m => m.id.toString() === id);

  if (movie) res.status(200).json(movie);
  else res.status(404).json({ error: 'Movie not found' });
}
