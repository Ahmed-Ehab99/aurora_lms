"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import GoogleLogo from "@/public/google.svg";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const SigninGoogleBtn = () => {
  const [googlePending, startGoogleTransition] = useTransition();

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google, you will be redirected...");
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.error.statusText || "Internal server error");
          },
        },
      });
    });
  };

  return (
    <Button
      disabled={googlePending}
      onClick={signInWithGoogle}
      className="w-full"
      variant="outline"
    >
      {googlePending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <Image
            src={GoogleLogo}
            alt="Google Logo"
            width={18}
            height={18}
            className="dark:invert"
          />
          <span>Sign in with Google</span>
        </>
      )}
    </Button>
  );
};

export default SigninGoogleBtn;
