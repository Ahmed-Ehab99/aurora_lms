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

  const signInWithGoogle = () => {
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
          <Loader size={16} aria-hidden={true} className="animate-spin" />
          <span>Signing In...</span>
        </>
      ) : (
        <>
          <Image
            src={GoogleLogo}
            alt="Google Logo"
            width={16}
            height={16}
            className="dark:invert"
            aria-hidden={true}
          />
          <span>Sign in with Google</span>
        </>
      )}
    </Button>
  );
};

export default SigninGoogleBtn;
