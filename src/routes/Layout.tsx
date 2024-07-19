import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function Layout() {
	return (
		<>
			<div className="w-full mx-auto  h-[1203px]">
				<main className="max-w-screen-lg mx-auto h-[1203px]">
					<section className="bg-stone-500 font-bold">
						<Header />
					</section>
					<Outlet />
					<section className="bg-stone-500">
						<Footer />
					</section>
				</main>
			</div>
		</>
	);
}
