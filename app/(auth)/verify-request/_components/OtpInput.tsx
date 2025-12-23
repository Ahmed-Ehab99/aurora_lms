"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader, Shield } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const OtpInput = () => {
  const [otp, setOtp] = useState("");
  const [otpPending, startOtpTransition] = useTransition();
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  const verifyOtp = () => {
    startOtpTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Verified");
            router.push("/");
          },
          onError: () => {
            toast.error("Error Verifying Email/OTP");
          },
        },
      });
    });
  };

  return (
    <CardContent className="space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <InputOTP
          maxLength={6}
          className="gap-2"
          value={otp}
          onChange={(value) => setOtp(value)}
          disabled={otpPending}
          aria-busy={otpPending}
          aria-disabled={otpPending}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <p className="text-muted-foreground text-xs">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <Button
        disabled={otpPending || !isOtpCompleted}
        onClick={verifyOtp}
        className="w-full"
        aria-disabled={otpPending || !isOtpCompleted}
      >
        {otpPending ? (
          <>
            <Loader className="size-4 animate-spin" />
            <span>Verifing...</span>
          </>
        ) : (
          <>
            <Shield className="size-4" />
            <span>Verify Account</span>
          </>
        )}
      </Button>

      {/* Live region for screen readers: announces start/finish of verification */}
      <div role="status" aria-live="polite" className="sr-only">
        {otpPending ? "Verifying code…" : ""}
      </div>
    </CardContent>
  );
};

export default OtpInput;
