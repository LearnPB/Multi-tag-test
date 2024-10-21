// sqlTypes.ts
export type Lang = {
  Language: string; // Language name
  Year: number;     // Year of the language
  Ranking: number;  // Ranking of the language
};

// Interface for the row structure returned by the SQL query
export interface LangRow {
  Language: string;
  Year: number;
  Ranking: number;
}
