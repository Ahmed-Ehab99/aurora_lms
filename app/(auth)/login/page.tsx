import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import SigninEmail from "./_components/SigninEmail";
import SigninGithubBtn from "./_components/SigninGithubBtn";
import SigninGoogleBtn from "./_components/SigninGoogleBtn";

export const metadata: Metadata = {
  title: "Sign in/up",
};

const LoginPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>

        <CardDescription>
          Login with your Github, Google or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <SigninGithubBtn />
          <SigninGoogleBtn />
        </div>

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>

        <SigninEmail />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
