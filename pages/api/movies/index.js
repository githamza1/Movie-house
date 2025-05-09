import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.status(200).json(data.movies);
}
