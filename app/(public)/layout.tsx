import Navbar from "./_components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4">{children}</main>
    </div>
  );
}
