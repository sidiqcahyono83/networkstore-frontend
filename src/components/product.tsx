import { Card } from "flowbite-react";
import type { Product } from "../types/product";
import { useLoaderData } from "react-router-dom";

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

export function Product() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div>
      <div className=" items-center justify-center grid grid-cols-3 gap-3">
        {products.map((product) => {
          return (
            <Card
              key={product.id}
              href={`/product/${product.id}`}
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
  );
}
