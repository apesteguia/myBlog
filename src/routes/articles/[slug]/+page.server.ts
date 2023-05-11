import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db, auth, database } from "../../../lib/server/firebase";
import type { Preview, Article, Comment } from "../../../lib/server/firebase";

let articleName: string = "";

export const load: PageServerLoad = async ({ params }) => {
  let article: Article;
  let comments: Comment[];
  let user = auth.currentUser?.email;
  let returnedUser = undefined;
  if (user !== "" || user !== null || user !== undefined) {
    returnedUser = user;
  }
  articleName = params.slug;
  article = (await db.queryArticle(params.slug)) as Article;
  comments = await db.getComments(params.slug);
  if (article === undefined) {
    throw redirect(303, "/home");
  }
  return {
    article,
    user,
    comments,
  };
};

export const actions: Actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("delete") as string;
    console.log(name);
    await db.deleteArticle(name);
  },
  Comment: async ({ request }) => {
    const data = await request.formData();
    const user = data.get("user") as string;
    const comment = data.get("comment") as string;
    const likes: number = 0;
    const date = JSON.parse(JSON.stringify(new Date()));
    if (articleName !== "") {
      await db.newComment({ user, comment, likes, date }, articleName);
    }
  },
};
