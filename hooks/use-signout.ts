import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignout() {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed Out Successfully");
          router.refresh();
          router.push("/");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Failed to Sign Out");
        },
      },
    });
  };

  return handleSignout;
}
