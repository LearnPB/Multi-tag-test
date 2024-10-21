// sql.ts
export const getLanguageDataQuery = (numLanguages: number) => `
    SELECT Language, Year, Ranking
    FROM Mylangs
    WHERE Language COLLATE NOCASE IN (${Array(numLanguages).fill('?').join(',')})
`;

