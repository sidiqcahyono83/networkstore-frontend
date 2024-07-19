import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";
import Navbar from "../components/nav";

export function Layout() {
	return (
		<>
			<div className="w-full mx-auto  h-[1203px]">
				<main className="max-w-screen-lg mx-auto h-[1203px]">
					<section className="bg-gray-900-500 font-bold">
						<Navbar />
					</section>
					<Outlet />
					<section className="bg-gray-900-500">
						<Footer />
					</section>
				</main>
			</div>
		</>
	);
}
