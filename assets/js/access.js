async function  checkAccess (){
  try {
    const response = await fetch(`https://kashika-backend.onrender.com/kashikaTravel/admin`,{
        method: "GET",
        credentials: "include",
      }
);
    const data = await response.json();
    console.log("data :",data);
    if(!data.access){
      window.location.href="unauthorised403.html";
    }
  } catch (error) {
    console.log("error");
    window.location.href="index.html"
  }
}

document.addEventListener("DOMContentLoaded",checkAccess);
