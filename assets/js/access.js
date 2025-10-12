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
      setTimeout(()=>{
        
        console.log("user session :",d);
        console.log("data from access :",data)
        window.location.href="unauthorised403.html";
      },10000)
    }
  } catch (error) {
    console.log("error");
    window.location.href="index.html"
  }
}

document.addEventListener("DOMContentLoaded",checkAccess);
