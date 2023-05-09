import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  let article = cookies.get("article");
  if (article !== undefined) {
    throw redirect(303, "/" + article);
  } else {
    throw redirect(303, "/home");
  }
};
