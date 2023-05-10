import type { Action } from "../$types";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db, auth } from "../../lib/server/firebase";
import type { User, Preview, Article } from "../../lib/server/firebase";

export const load: PageServerLoad = async () => {
  const user = auth.currentUser?.email;
  console.log("user" + user);
  if (user === "" || user === null || user === undefined) {
    throw redirect(303, "/home");
  }
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

    await db.uploadArtricle(
      { title, preview, img, date, topic },
      { title, text, img, date, topic, desc }
    );
  },
};
