import { useLoaderData } from "react-router-dom";
import { Product } from "../types/product";
import { Card } from "flowbite-react";
export async function loader() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products`
    );
    const responseJSON = await response.json();

    const products: Product[] = responseJSON.data;

    // console.log(products);
    return { products };
  } catch (error) {
    return { products: [] };
  }
}
export function App() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div>
      <div>
        <div className="flex items-center justify-center space-x-2 my-6 mx4  grid grid-cols-3 gap-3">
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                href="/product/"
                className="w-[303px] h-[404px] bg-transparent"
              >
                <div>
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {product.description}
                </p>
                <p className="text-center font-bold">{product.price}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
import { Card, Carousel } from "flowbite-react";
import { Product } from "../data/product";
import { useLoaderData } from "react-router-dom";

export async function loader() {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_BACKEND_API_URL}/products`
		);
		const products: Product[] = await response.json();
		return { products };
	} catch (error) {
		return { products: [] };
	}
}

export function App() {
	const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
	return (
		<div>
			<div className="max-w-full mx-auto items-center h-[1203px]">
				<div className="h-54 sm:h-64 xl:h-80 2xl:h-90 mt-4 bg-stone-300">
					<Carousel slideInterval={5000}>
						<img src="/CCR.png" alt="..." />
						<img src="/4011.png" alt="..." />
						<img src="/CCr3.png" alt="..." />
					</Carousel>
				</div>
				<div className="flex items-center justify-center space-x-2 my-6 mx4">
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						{" "}
						{products.map((product) => (
							<div key={product.id}>
								<div>
									<img
										src={product.imageUrl}
										alt={product.name}
									/>
								</div>
								<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									Routerboard CCR2004-1G-12S+2XS
								</h5>
								<p className="font-normal text-gray-700 dark:text-gray-400">
									The Connectivity Router - your best
									companion when it comes to SFP, SFP+ and
									SFP28 management! 1, 10 and 25 Gbps ports in
									a single device to make your life easier
								</p>
								<p className="text-center font-bold">
									Rp. 8.240.000,00
								</p>
							</div>
						))}
					</Card>{" "}
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						<div>
							<img src="/CCR3.png" alt="CCR3" />
						</div>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							Routerboard CCR2004-1G-12S+2XS
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							The Connectivity Router - your best companion when
							it comes to SFP, SFP+ and SFP28 management! 1, 10
							and 25 Gbps ports in a single device to make your
							life easier
						</p>
						<p className="text-center font-bold">
							Rp. 8.240.000,00
						</p>
					</Card>{" "}
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						<img src="/CCR3.png" alt="CCR3" />
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							Routerboard CCR2004-1G-12S+2XS
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							The Connectivity Router - your best companion when
							it comes to SFP, SFP+ and SFP28 management! 1, 10
							and 25 Gbps ports in a single device to make your
							life easier
						</p>
						<p className="text-center font-bold">
							Rp. 8.240.000,00
						</p>
					</Card>
				</div>
				<div className="flex items-center justify-center space-x-2 my-6 mx4">
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						<div>
							<img src="/4011.png" alt="4011" />
						</div>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							RB4011iGS+RM
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							10xGigabit port router with a Quad-core 1.4Ghz CPU
							1GB RAM, SFP+ 10Gbps cage and desktop case with rack
							ears
						</p>
						<p className="text-center font-bold">
							Rp. 3.500.000,00
						</p>
					</Card>{" "}
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						<div>
							<img src="/4011.png" alt="4011" />
						</div>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							RB4011iGS+RM
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							10xGigabit port router with a Quad-core 1.4Ghz CPU
							1GB RAM, SFP+ 10Gbps cage and desktop case with rack
							ears
						</p>
						<p className="text-center font-bold">
							Rp. 3.500.000,00
						</p>
					</Card>{" "}
					<Card
						href="#"
						className="w-[303px] h-[404px] bg-transparent"
					>
						<div>
							<img src="/4011.png" alt="4011" />
						</div>
						<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							RB4011iGS+RM
						</h5>
						<p className="font-normal text-gray-700 dark:text-gray-400">
							10xGigabit port router with a Quad-core 1.4Ghz CPU
							1GB RAM, SFP+ 10Gbps cage and desktop case with rack
							ears
						</p>
						<p className="text-center font-bold">
							Rp. 3.500.000,00
						</p>
					</Card>
				</div>
			</div>
		</div>
	);
}
