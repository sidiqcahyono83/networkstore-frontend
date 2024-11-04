import { Odp } from "../data/typedata";

export async function getaOdps(): Promise<Odp[]> {
  try {
    const odpResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/odp`
    );

    // Check for successful responses
    if (!odpResponse.ok) throw new Error("Failed to fetch odp data");

    const responseJSONOdp = await odpResponse.json();

    // Log the data to debug
    // console.log("Area Response:", responseJSONArea);

    // Pastikan area dikembalikan sebagai array
    return responseJSONOdp.odp || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Mengembalikan array kosong saat terjadi error
  }
}
