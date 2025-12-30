"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const SigninEmail = () => {
  const [email, setEmail] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const router = useRouter();

  const signinWithEmail = () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Sent");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Error Sending Email");
          },
        },
      });
    });
  };

  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="m@example.com"
          disabled={emailPending}
        />
      </div>

      <Button onClick={signinWithEmail} disabled={emailPending}>
        {emailPending ? (
          <>
            <Loader size={16} aria-hidden={true} className="animate-spin" />
            <span>Continuing...</span>
          </>
        ) : (
          <>
            <Send size={16} aria-hidden={true} />
            <span>Continue with Email</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SigninEmail;
