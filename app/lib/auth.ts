import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { usePostHog } from "posthog-js/react";

export type AuthViewType =
  | "sign_in"
  | "sign_up"
  | "magic_link"
  | "forgotten_password"
  | "update_password"
  | "verify_otp";

export function useAuth(
  setAuthDialog: (value: boolean) => void,
  setAuthView: (value: AuthViewType) => void
) {
  const [session, setSession] = useState<Session | null>(null);
  const posthog = usePostHog();
  let recovery = false;
  useEffect(() => {
    if (!supabase) {
      console.warn("Supabase is not initialized");
      return setSession({ user: { email: "demo@codecapsule.com" } } as Session);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        posthog.identify(session?.user.id, {
          email: session?.user.email,
          supabase_id: session?.user.id,
        });
        posthog.capture("sign_in");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (_event === "PASSWORD_RECOVERY") {
        recovery = true;
        setAuthView("update_password");
        setAuthDialog(true);
      }

      if (_event === "USER_UPDATED" && recovery) {
        recovery = false;
      }

      if (_event === "SIGNED_IN" && !recovery) {
        setAuthDialog(false);
        posthog.identify(session?.user.id, {
          email: session?.user.email,
          supabase_id: session?.user.id,
        });
        posthog.capture("sign_in");
      }

      if (_event === "SIGNED_OUT") {
        setAuthView("sign_in");
        posthog.capture("sign_out");
        posthog.reset();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
  };
}