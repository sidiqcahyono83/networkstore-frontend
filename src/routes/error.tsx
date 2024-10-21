import Navbar from "../components/nav";
import { Footer } from "../components/footer";

export function ErrorPage() {
	return (
		<div id="error-page" className="flex flex-col min-h-screen">
			<Navbar />

			<div className="flex-[1]">
				<main className="flex justify-center pt-10">
					<div className="space-y-2">
						<h1 className="text-xl font-medium">Error</h1>

						<p>Sorry, an unexpected error has occurred.</p>
						<p></p>
					</div>
				</main>
			</div>

			<Footer />
		</div>
	);
}
