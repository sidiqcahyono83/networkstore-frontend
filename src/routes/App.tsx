import { useLoaderData } from "react-router-dom";
import { Card, Carousel } from "flowbite-react";
import { formatIDR } from "../lib/formatCurency";
import { Paket } from "../data/typedata";

export async function loader() {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/paket`
    );
    const responseJSON = await response.json();

    const profiles: Paket[] = responseJSON.data;
    // const profile = profiles;

    // console.log(profile);
    return { profiles };
  } catch (error) {
    return { profiles: [] };
  }
}

const getBandwidth = (name: string) => {
  switch (name) {
    case "Paket 1 Lama":
      return "maks 5 Mbps";
    case "Unlimited 1":
      return "10 Mbps";
    case "Unlimited 2":
      return "15 Mbps";
    case "Unlimited 3":
      return "20 Mbps";
    case "Unlimited 4":
      return "30 Mbps";
    default:
      return "Bandwidth not specified";
  }
};

export function App() {
  const { profiles } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  return (
    <div className="container mx-auto rounded-s-2xl">
      {/* Carousel Section */}
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 bg-transparent">
        <Carousel>
          <img src="/CCR.png" alt="CCR" />
          <img src="/4011.png" alt="4011" />
          <img src="/3010.png" alt="3010" />
          <img src="/2024.png" alt="2024" />
          <img src="/CRS206.png" alt="CRS206" />
          <img src="/CRS301.png" alt="CRS301" />
          <img src="/gr3.png" alt="gr3" />
        </Carousel>
      </div>

      {/* <pre>{JSON.stringify(profiles)}</pre> */}

      {/* Card Section */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-center gap-2 m-2">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            href={`/paket/${profile.id}`}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="flex justify-center items-center h-40">
              {/* Assuming you want to display an image for each profile; replace this with a valid image path */}
              <img
                src="/Pon.jpg"
                alt={profile.name}
                className="object-contain h-full w-full"
              />
            </div>
            <div className="p-4 text-center uppercase">
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {profile.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {getBandwidth(profile.name)}{" "}
                {/* Display bandwidth based on profile name */}
              </p>
              <p className="text-center font-bold">
                {formatIDR(profile.harga)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
