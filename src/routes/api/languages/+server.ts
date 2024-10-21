import { json } from '@sveltejs/kit';
import { getLanguagesData } from '$lib/server/sql/dbsql';
import type { RequestHandler } from "@sveltejs/kit";
import type { Lang } from '$lib/server/sql/sqltypes';

export const GET = (({ url }) => {
  const languagesParam = url.searchParams.get('languages');

  let languagesToQuery: string[] = [];
  if (languagesParam) {
    languagesToQuery = languagesParam.split(',').map(lang => lang.trim());
  }

  if (languagesToQuery.length === 0) {
    return json({ languages: [] });
  }

  const languages = getLanguagesData(languagesToQuery);
  return json({ languages });
}) satisfies RequestHandler;
