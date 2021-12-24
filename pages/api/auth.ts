/* 
  pages/api/auth.ts
  ------------------------
  This component fetches a cookie from the server to login the user automatically
  TODO: has a delay before allowing the user in - fix that
 */

import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/supabase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}
