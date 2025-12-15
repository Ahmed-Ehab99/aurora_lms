import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireAdmin } from "../data/admin/require-admin";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import data from "./data.json";

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
      <DataTable data={data} />
    </>
  );
}
