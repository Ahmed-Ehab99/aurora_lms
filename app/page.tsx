import { ThemeToggle } from "@/components/ui/theme-toggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
// import { redirect } from "next/navigation";
import LoginBtn from "./LoginBtn";
import SignoutBtn from "./SignoutBtn";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // IF you need to force user to login to use the platform, uncomment blow line
  // if (!session) redirect("/login");

  return (
    <div>
      <h1 className="text-red-500">Home Page</h1>
      <ThemeToggle />
      {session ? (
        <>
          <span>{session.user.name}</span>
          <SignoutBtn />
        </>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
}
