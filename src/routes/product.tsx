import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import type { Product } from "../types/product";

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

  return (
    <div>
      <pre>{JSON.stringify(product)}</pre>
    </div>
  );
}
