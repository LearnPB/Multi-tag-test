// src/routes/multisql/+page.server.ts

import type { PageServerLoad } from './$types';
import { getLanguagesData } from '$lib/server/sql/dbsql';

export const load: PageServerLoad = async ({ url }) => {
  // Read the 'languages' query parameter from the URL
  const languagesParam = url.searchParams.get('languages');

  // Parse the query parameter into an array of languages
  const languagesToQuery = languagesParam
    ? languagesParam.split(',').map((lang) => lang.trim())
    : ['JavaScript', 'Python', 'C++', 'PHP']; // Default languages

  // Fetch the language data from the database
  const languages = getLanguagesData(languagesToQuery);

  // Compute notFoundLanguages
  const fetchedLanguageNames = new Set(
    languages.map((lang) => lang.Language.toLowerCase())
  );

  const notFoundLanguages = languagesToQuery.filter(
    (lang) => !fetchedLanguageNames.has(lang.toLowerCase())
  );

  // Return data to the page component
  return {
    languages,
    notFoundLanguages,
    languagesToQueryStr: languagesToQuery.join(', ')
  };
};
