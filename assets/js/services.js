// === API: Create Package ===
export async function createPackage(packageData) {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/admin/createPackage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(packageData),
    });

    const data = await response.json();



    return data;
  } catch (error) {
    return { error: true, message: "Network Error " };
  }
}


// === API: Add Car ===
export async function addCar(carData) {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/admin/addCar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(carData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: "Network Error " };
  }
}


// === API: Register User ===
export async function registerUser(userData) {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: "Network Error " };
  }
}


// === API: User Login ===
export async function loginUser(loginData) {
  console.log|("data kya aaraha hai login me hu ",loginData);
  fetch("https://kashika-backend.onrender.com/kashikaTravel/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({ email: "test@test.com", password: "123456" }),
})
.then(r => r.json())
.then(console.log)
.catch(console.error);

  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { status: false, message: "Network Error " };
  }
}

//===forget Password ===
export  async function forgetPass(forgetData){
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/forgetPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(forgetData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: "Network Error " };
  }
}

//===session  required====
export async function getUserSession() {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/session-user", {
      credentials: "include",
    });

    const data = await response.json();
    console.log("data :",data)
    return data;
  } catch (error) {
    console.error("Failed to fetch session:", error);
    return { loggedIn: false, user: { userType: "guest" } };
  }
}


// === API: Book Package ===
export async function bookPackage(bookingData) {
  const userId=bookingData.userId;
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/bookPackage/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: "Network Error " };
  }
}


// === API: Book Car ===
export async function bookingCar(bookingData) {
  const userId=bookingData.userId;
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/carbooking/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API call failed:", error);
    return { error: true, message: "Network Error " };
  }
}


//===API: Get all Cars ===
export async function getAllCars() {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/getCar",{
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error: true,message:"Network Error" };
  }
}


//===API: Get all Packages ===
export async function getAllPackages() {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/getPackage",{
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return { error: true,message:"Network Error" };
  }
}


//===API: Delete Car ===
export async function deleteCar(id) {
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/admin/carDelete/${id}`,{
      method: "DELETE",
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    return { error: true,message:"Network Error" };
  }
}


//===API: Delete Package ===
export async function deletePackage(id) {
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/admin/packageDelete/${id}`,{
      method: "DELETE",
      credentials: "include"
    });
    const data = await response.json();
    console.log("here is data :",data);
    return data;
  } catch (error) {
    return { error: true,message:"Network Problem" };
  }
}


//=== API: Get all user ===
export async function getUsers(){
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/getUser",{
      credentials: "include"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error: true,message:"Network Error" };
  }
}

//===API :Type changed ===
export async function userTypeChanged(typeData){
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/changeUserType`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(typeData)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: true, message: "Network Error" };
  }
}

//===API :Log out ===

// === API: User Logout ===
export async function logoutRequested() {
  try {
    const response = await fetch("https://kashika-backend.onrender.com/kashikaTravel/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { status: false, message: "Network Error" };
  }
}