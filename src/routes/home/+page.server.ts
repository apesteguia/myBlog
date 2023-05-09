import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db, auth, database } from "../../lib/server/firebase";
import type { Preview, Article } from "../../lib/server/firebase";

export const load: PageServerLoad = async ({ cookies }) => {
  let articlesPreview: Preview[] = [];
  let error;
  try {
    articlesPreview = await db.queryPreviews();
  } catch (e) {
    error = e;
    console.error(e);
  }
  console.log(articlesPreview);
  return {
    articlesPreview,
    error: error,
  };
};
