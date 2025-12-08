"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignoutBtn = () => {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed Out Successfully");
        },
        onError: (error) => {
          console.error(error);
          toast.error(error.error.statusText || "Internal Server Error");
        },
      },
    });
  };

  return <Button onClick={handleSignout}>Sign out</Button>;
};

export default SignoutBtn;
