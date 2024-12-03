import { redirect } from "react-router-dom";
import { User } from "../data/typedata";

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized, return a specific message
        return { error: "Unauthorized access, please login again", users: [] };
      }
      // Handle other error codes like 500
      return { error: "Failed to fetch users, server error", users: [] };
    }

    const users: User = await response.json();

    return { users: users };
  } catch (err) {
    // Handle network errors or unexpected issues
    return { error: "Failed to fetch users, network error", users: [] };
  }
}

//Get User By Id
export async function getUsersById(id: string) {
  const token = localStorage.getItem("token");

  // Cek token dan params.id
  if (!token) {
    return redirect("/login");
  }
  if (!id) {
    return { error: "User ID is missing" };
  }
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        // Unauthorized, return a specific message
        return { error: "Unauthorized access, please login again" };
      }
      // Handle other error codes like 500
      return { error: "Failed to fetch users, server error", users: [] };
    }

    const userResponse = await response.json();
    const user = userResponse;
    // console.log(userResponse);

    return user;
  } catch (err) {
    return { error: "Failed to fetch users, network error" };
  }
}

export async function updateUserById(id: string, updates: string) {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/users/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return await response.json();
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
}

// export async function createUser(formData: FormData) {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     // Handle redirection differently if using a router or return null if not authorized
//     window.location.href = "/login";
//     return;
//   }

//   // Convert formData to a plain object for JSON.stringify
//   const data = {
//     username: formData.get("username") as string,
//     fullname: formData.get("fullname") as string,
//     ontName: formData.get("ontName") as string,
//     redamanOlt: formData.get("redamanOlt") as string,
//     address: formData.get("address") as string,
//     phoneNumber: formData.get("phoneNumber") as string,
//     paketId: formData.get("paketId") as string,
//     diskon: parseFloat(formData.get("diskon") as string),
//     odpId: formData.get("odpId") as string,
//     areaId: formData.get("areaId") as string,
//     modemId: formData.get("modemId") as string,
//   };

//   // Send the request with JSON-encoded data
//   const response = await fetch(
//     `${import.meta.env.VITE_BACKEND_API_URL}/users`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to create user");
//   }

//   // Assuming `User` is your user type
//   const newUser = (await response.json()) as User;

//   // Update users list in your local state or storage if necessary
//   const users = await getAllUsers();
//   const newUsers = [...users, newUser];
//   await set(newUsers);

//   return newUser;
// }
