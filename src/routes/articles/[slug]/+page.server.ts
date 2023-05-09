import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db, auth, database } from "../../../lib/server/firebase";
import type { Preview, Article } from "../../../lib/server/firebase";

export const load: PageServerLoad = async ({ params }) => {
  const article: Article | undefined = await db.queryArticle(params.slug);
  return {
    article,
  };
};
