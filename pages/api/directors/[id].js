import path from 'path'; // get director details
import fs from 'fs';

export default function handler(req, res) {
  const { id } = req.query;
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const director = data.directors.find(d => d.id.toString() === id);
  if (!director) return res.status(404).json({ error: 'Director not found' });

  const movies = data.movies.filter(m => m.directorId.toString() === id);

  res.status(200).json({ ...director, movies });
}
