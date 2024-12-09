import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export type AuthViewType =
  | "sign_in"
  | "sign_up"
  | "magic_link"
  | "forgotten_password"
  | "update_password"
  | "verify_otp";

