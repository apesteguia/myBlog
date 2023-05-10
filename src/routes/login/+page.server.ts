import type { Action } from "../$types";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db, auth } from "../../lib/server/firebase";
import type { User } from "../../lib/server/firebase";

export const load: PageServerLoad = async () => {
  const user = auth.currentUser?.email;
  console.log(user);
  if (user !== undefined) {
    throw redirect(303, "/create");
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const password: string = data.get("password") as string;
    const email: string = data.get("email") as string;
    db.logIn({ email, user: email, pass: password });
    throw redirect(303, "/home");
  },
};
