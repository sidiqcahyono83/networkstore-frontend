import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export function Layout() {
  return (
    <div className="w-full mx-auto">
      <main className="max-w-screen-lg mx-auto">
        <section className="bg-stone-500 font-bold">
          <Header />
        </section>
        <Outlet />
        <section className="bg-stone-400 dark:bg-gray-900">
          <Footer />
        </section>
      </main>
    </div>
  );
}
