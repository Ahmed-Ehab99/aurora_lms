import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignout() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      // 1️⃣ WAIT for signout to finish
      await authClient.signOut();

      toast.success("Signed Out Successfully");

      // 2️⃣ Navigate first
      router.replace("/");

      // 3️⃣ THEN force server re-render
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Sign Out");
    }
  };

  return handleSignout;
}
