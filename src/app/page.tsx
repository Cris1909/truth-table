import { TruthTableGenerator } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-24">
      <TruthTableGenerator />
    </main>
  );
}
