import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import { getLanguageDataQuery } from './sql';
import type { Lang, LangRow } from './sqltypes';

// Create a new database connection with verbose logging enabled
const db = new Database(DB_PATH, { verbose: console.log });

// Function to get language data by names
export function getLanguagesData(languages: string[]): Lang[] | null {
  if (languages.length === 0) return null; // Return null if no languages provided

  const sql = getLanguageDataQuery(languages.length); // Create SQL query
  const stmt = db.prepare(sql); // Prepare SQL statement

  const rows = stmt.all(languages) as LangRow[]; // Execute statement and assert type

  // Map the rows to Lang type and return
  return rows.map(row => ({
    Language: row.Language,
    Year: row.Year,
    Ranking: row.Ranking
  })) as Lang[];
}
