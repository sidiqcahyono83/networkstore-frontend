/// loader function
export async function GetPaketOdpAreaModem() {
  const token = localStorage.getItem("token");
  try {
    // If token is not passed in, try to retrieve it from localStorage
    const authToken = token;

    // Ensure we have a token before making requests
    if (!authToken) throw new Error("Authorization token is missing");

    const apiUrl = import.meta.env.VITE_BACKEND_API_URL;
    const headers = {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    };

    const [paketResponse, odpResponse, areaResponse, modemResponse] =
      await Promise.all([
        fetch(`${apiUrl}/paket`, { method: "GET", headers }),
        fetch(`${apiUrl}/odp`, { method: "GET", headers }),
        fetch(`${apiUrl}/area`, { method: "GET", headers }),
        fetch(`${apiUrl}/modem`, { method: "GET", headers }),
      ]);

    // Check each response for success and throw an error for any failures
    if (!paketResponse.ok) throw new Error("Failed to fetch paket data");
    if (!odpResponse.ok) throw new Error("Failed to fetch odp data");
    if (!areaResponse.ok) throw new Error("Failed to fetch area data");
    if (!modemResponse.ok) throw new Error("Failed to fetch modem data");

    // Parse JSON and ensure they are arrays
    const paketData = await paketResponse.json();
    const odpData = await odpResponse.json();
    const areaData = await areaResponse.json();
    const modemData = await modemResponse.json();

    // Extract arrays from responses, falling back to empty arrays if undefined
    const paket = paketData.paket || [];
    const odp = odpData.odp || [];
    const area = areaData.area || [];
    const modem = modemData.modem || [];

    return { paket, odp, area, modem };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Returning empty arrays if there's an error
    return { paket: [], odp: [], area: [], modem: [] };
  }
}
