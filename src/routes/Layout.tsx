// src/routes/Layout.tsx

// import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="w-full rounded-md mx-auto">
      <section className="w-full mx-auto justify-center bg-slate-700">
        <Navbar />
      </section>
      <section>
        <main className="max-w-screen-2xl mx-auto">
          <Outlet />
        </main>
      </section>
      {/* <Footer /> */}
    </div>
  );
};
