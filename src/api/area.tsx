import { type Area } from "../data/typedata";

const API_URL = "https://teranet.cahyonomuslimsidiq.com";

// Fetch jobs from the backend
export async function getAreas(query?: string) {
  await fakeNetwork(`getAreas:${query}`);
  const response = await fetch(`${API_URL}/area`);
  let areas: Area[] = await response.json();

  if (query) {
    areas = matchSorter(areas, query, { keys: ["name"] });
  }
  return areas.sort(sortBy("last", "id"));
}

// Create a new job
export async function createJob(formData: FormData) {
  await fakeNetwork(``);

  const newArea: Area = {
    name: String(formData.get("name")),
  };

  const response = await fetch(`${API_URL}/area`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArea),
  });

  if (!response.ok) {
    throw new Error("Failed to create job");
  }

  return await response.json();
}

// Fetch a specific job by ID
export async function getArea(id: number) {
  await fakeNetwork(`job:${id}`);
  const response = await fetch(`${API_URL}/area/${id}`);

  if (!response.ok) {
    throw new Error("Area not found");
  }

  return await response.json();
}

// Update a job by ID
export async function updateArea(id: number, updates: Partial<Area>) {
  await fakeNetwork(``);

  const response = await fetch(`${API_URL}/area/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update job");
  }

  return await response.json();
}

// Delete a job by ID
export async function deleteArea(id: number) {
  const response = await fetch(`${API_URL}/area/${id}`, {
    method: "DELETE",
  });

  return response.ok;
}

// Simulate network delay
let fakeCache = {};

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}

// function matchSorter(
//   areas: Area[],
//   query: string,
//   arg2: { keys: string[] }
// ): Area[] {
//   throw new Error("Function not implemented.");
// }
// function sortBy(
//   arg0: string,
//   arg1: string
// ): ((a: Area, b: Area) => number) | undefined {
//   throw new Error("Function not implemented.");
// }
