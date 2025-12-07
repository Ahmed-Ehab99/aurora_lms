"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LoginBtn = () => {
  const router = useRouter();

  return <Button onClick={() => router.push("/login")}>Login in</Button>;
};

export default LoginBtn;
