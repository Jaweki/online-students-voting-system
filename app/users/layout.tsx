import UserNavBar from "@/components/UserNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <UserNavBar />
      {children}
    </main>
  );
}
