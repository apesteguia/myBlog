import type { LayoutServerLoad } from "./$types";
import { db, auth } from "../lib/server/firebase";
import type { User, Preview } from "../lib/server/firebase";

export const load: LayoutServerLoad = async () => {
  const articlesPreview: Preview[] = await db.queryPreviews();
  const user = auth.currentUser?.email;
  return {
    articlesPreview,
    user,
  };
};
