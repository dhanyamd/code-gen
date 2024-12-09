import { SupabaseClient } from "@supabase/supabase-js";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import AuthForm from "./auth-form";
import { AuthViewType } from "@/app/lib/auth";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export function AuthDialog({
  open,
  setOpen,
  supabase,
  view,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  supabase: SupabaseClient;
  view: AuthViewType;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Sign in to CodeCapsule</DialogTitle>
        </VisuallyHidden>
        <AuthForm supabase={supabase} view={view} />
      </DialogContent>
    </Dialog>
  );
}