"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import GithubLogo from "@/public/github.svg";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

const SigninGithubBtn = () => {
  const [githubPending, startGithubTransition] = useTransition();

  const signInWithGithub = () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed In with Github, You will be Redirected...");
          },
          onError: (error) => {
            console.error(error);
            toast.error(error.error.statusText || "Internal Server Error");
          },
        },
      });
    });
  };

  return (
    <Button
      disabled={githubPending}
      onClick={signInWithGithub}
      className="w-full"
      variant="outline"
    >
      {githubPending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <Image
            src={GithubLogo}
            alt="Github Logo"
            width={18}
            height={18}
            className="dark:invert"
          />
          <span>Sign in with Github</span>
        </>
      )}
    </Button>
  );
};

export default SigninGithubBtn;
