import type { Action } from "../$types";
import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { db, auth } from "../../lib/server/firebase";
import type { User } from "../../lib/server/firebase";

export const load: PageServerLoad = async () => {
  const user = auth.currentUser?.email;
  console.log("user" + user);
  if (user === "" || user === null || user === undefined) {
    throw redirect(303, "/home");
  }
};
