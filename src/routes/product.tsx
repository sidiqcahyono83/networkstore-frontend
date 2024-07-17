import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import type { Product } from "../types/product";
import { Card } from "flowbite-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const productId = String(params.productId);

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/products/${productId}`
    );
    const responseJSON = await response.json();

    const product: Product = responseJSON.data;

    console.log(product);
    return { product };
  } catch (error) {
    return { product: null };
  }
}

export function Product() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  if (!product) {
    return "Product not found";
  }

  return (
    <div className="mx-auto">
      <div className="items-center justify-center grid grid-cols-3 gap-4 my-4">
        <Card key={product.id} className="w- bg-transparent mx-auto">
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
      </div>
    </div>
  );
}