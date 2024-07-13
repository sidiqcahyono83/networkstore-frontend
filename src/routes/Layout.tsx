import { Outlet } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export function Layout() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <section className="bg-stone-500 font-bold">
        <Header />
      </section>
      <Outlet />
      <Footer />
    </div>
  );
}
