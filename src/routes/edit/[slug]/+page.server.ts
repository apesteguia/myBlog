import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db, auth, database } from "../../../lib/server/firebase";
import type { Preview, Article } from "../../../lib/server/firebase";

export const load: PageServerLoad = async ({ params }) => {
  let article: Article;
  let user = auth.currentUser?.email;
  let returnedUser = undefined;
  if (user !== "" && user !== null && user !== undefined) {
    returnedUser = user;
  } else {
    throw redirect(303, "/home");
  }
  article = (await db.queryArticle(params.slug)) as Article;
  return {
    article,
    user,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    let title = data.get("title") as string;
    title = title.replace(/ /g, "-");
    const preview = data.get("preview") as string;
    const desc = data.get("desc") as string;
    const topic = data.get("topic") as string;
    const img = data.get("img") as string;
    const text = data.get("text") as string;
    const date = JSON.parse(JSON.stringify(new Date()));

    await db.editArticle(
      { title, text, img, date, topic, desc },
      { title, preview, img, date, topic }
    );
    throw redirect(303, "/articles/" + title);
  },
};
