import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OtpInput from "./_components/OtpInput";

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

      <OtpInput />
    </Card>
  );
};

export default VerifyRequestPage;
