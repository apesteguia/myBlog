import type { LayoutServerLoad } from "./$types";
import { db } from "../lib/server/firebase";
import type { User, Preview } from "../lib/server/firebase";

export const load: LayoutServerLoad = async () => {
  const articlesPreview: Preview[] = await db.queryPreviews();
  return {
    articlesPreview,
  };
};
