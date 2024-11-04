import { Area } from "../data/typedata";

export async function getaAreas(): Promise<Area[]> {
  try {
    const areaResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/area`
    );

    if (!areaResponse.ok) throw new Error("Failed to fetch area data");

    const responseJSONArea = await areaResponse.json();

    // Log data lengkap untuk memastikan struktur respons
    console.log("Area Response:", responseJSONArea);

    // Pastikan bahwa responseJSONArea.area adalah array dan memiliki `user`
    const areas: Area[] = (responseJSONArea.area || []).map((area: Area) => ({
      ...area,
      user: area.user || [], // Inisialisasi user sebagai array kosong jika undefined
    }));

    return areas;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Mengembalikan array kosong saat terjadi error
  }
}
