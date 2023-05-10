import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db, auth, database } from "../../../lib/server/firebase";
import type { Preview, Article } from "../../../lib/server/firebase";

export const load: PageServerLoad = async ({ params }) => {
  let article: Article;
  let user = auth.currentUser?.email;
  let returnedUser = undefined;
  if (user !== "" || user !== null || user !== undefined) {
    returnedUser = user;
  }
  article = (await db.queryArticle(params.slug)) as Article;
  console.log(article);
  if (article === undefined) {
    throw redirect(303, "/home");
  }
  return {
    article,
    user,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("delete") as string;
    console.log(name);
    await db.deleteArticle(name);
  },
};
