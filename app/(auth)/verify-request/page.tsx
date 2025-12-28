import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";
import OtpInput from "./_components/OtpInput";

export const metadata: Metadata = {
  title: "Verify OTP",
};

const VerifyRequestPage = () => {
  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sebt a verififcation email code to your email address. Please
          open the email and paste the code below
        </CardDescription>
      </CardHeader>

      <Suspense fallback={<OtpInputSkeleton />}>
        <OtpInput />
      </Suspense>
    </Card>
  );
};

export default VerifyRequestPage;

const OtpInputSkeleton = () => {
  return (
    <CardContent className="space-y-6">
      <div className="flex flex-col items-center space-y-2">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-4 w-58" />
      </div>
      <Skeleton className="h-9 w-full" />
    </CardContent>
  );
};
