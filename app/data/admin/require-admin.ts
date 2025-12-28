import { auth } from "@/lib/auth";
import { Role } from "@/prisma/generated/prisma/enums";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import "server-only";

export const requireAdmin = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  if (session.user.role !== Role.Admin) {
    return redirect("/not-admin");
  }

  return session;
});
