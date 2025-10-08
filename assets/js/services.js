// === API: Create Package ===
export async function createPackage(packageData) {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/admin/createPackage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(packageData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Network response was not ok");
    }

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: error.message };
  }
}


// === API: Add Car ===
export async function addCar(carData) {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/admin/addCar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(carData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Network response was not ok");
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: error.message };
  }
}


// === API: Register User ===
export async function registerUser(userData) {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Network response was not ok");
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: error.message };
  }
}



// === API: User Login ===
export async function loginUser(loginData) {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Network response was not ok");
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: error.message };
  }
}


// === API: Book Package ===
export async function bookPackage(bookingData) {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/bookPackage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Network response was not ok",{
      credentials: "include"
    });
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: error.message };
  }
}


//=== Get all Cars ===
export async function getAllCars() {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/getCar",{
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error: true };
  }
}

//=== Get all Packages ===
export async function getAllPackages() {
  try {
    const response = await fetch("http://localhost:8000/kashikaTravel/getpackage",{
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return { error: true };
  }
}
