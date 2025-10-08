export async function getUserSession() {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/session-user", {
      credentials: "include",
    });

    const data = await response.json();
    console.log("data :",data)
    return data; // now returns JWT decoded info
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return { loggedIn: false, user: { userType: "guest" } };
  }
}
