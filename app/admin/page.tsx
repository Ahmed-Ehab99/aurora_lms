import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "../data/admin/require-admin";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { SectionCards } from "./_components/section-cards";

export default async function AdminPage() {
  const isAdmin = await requireAdmin();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session && !isAdmin) redirect("/login");

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
    </>
  );
}
