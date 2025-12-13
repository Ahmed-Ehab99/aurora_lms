import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import { SectionCards } from "./_components/section-cards";
import data from "./data.json";
// import { requireAdmin } from "../data/admin/require-admin";

export default async function AdminPage() {
  // await requireAdmin();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </>
  );
}
