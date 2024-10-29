import { Area } from "../data/typedata";

export const getArea = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/area`);
  const data: Area[] = await response.json();

  return data;
};

export const getAreaById = async (id: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/area/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch area");
  }
  const areaById = response.json();
  return areaById;
};
