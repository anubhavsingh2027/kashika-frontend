import { getUserSession } from "./services.js";

const navbar = document.getElementById("navbar");

async function loadNavbar() {
  try {
    const session = await getUserSession();
    console.log("session kuch deraha hai :",session);
    const { LoggedIn, user } = session || {};
    const userType = user?.userType || null;

    let links = [];

    // 🧭 CASE 1: Not Logged In
    if (!LoggedIn) {
      links = [
        { name: "index", href: "index.html" },
        { name: "packagedetails", href: "packagedetails.html" },
        { name: "carDetails", href: "carDetails.html" },
        { name: "contact", href: "contact.html" },
        { name: "about", href: "about.html" },
        { name: "login", href: "login.html" },
      ];
    }

    // 👤 CASE 2: Logged In (Guest)
    else if (LoggedIn && userType === "guest") {
      links = [
        { name: "index", href: "index.html" },
        { name: "packagedetails", href: "packagedetails.html" },
        { name: "carDetails", href: "carDetails.html" },
        { name: "contact", href: "contact.html" },
        { name: "about", href: "about.html" },
        { name: "Book Package", href: "packageBook.html" },
        { name: "Book Car", href: "carBook.html" },
        { name: "History", href: "userHistory.html" },
        { name: "signout", href: "login.html?logoutRequuest=true" },
      ];
    }

    // 🛠️ CASE 3: Logged In (Admin or Other)
    else if (LoggedIn && userType !== "guest") {
      links = [
        { name: "index", href: "index.html" },
        { name: "about", href: "about.html" },
        { name: "packagedetails", href: "packagedetails.html" },
        { name: "carDetails", href: "carDetails.html" },
        { name: "Admin Car Set", href: "adminCarSet.html" },
        { name: "Admin Package Set", href: "adminPackageSet.html" },
        { name: "Admin History", href: "allBookingHistory.html" },
        { name: "Access Grant", href: "userTypeAccess.html" },
        { name: "signout", href: "login.html?logoutRequuest=true" },
      ];
    }

    // 🧱 Render Navbar Links
    navbar.innerHTML = links
      .map(link => `<a href="${link.href}">${link.name}</a>`)
      .join(" ");

  } catch (err) {
    console.error("Navbar load failed:", err);
    // 🧩 Fallback in case of server or fetch issue
    navbar.innerHTML = `
      <a href="index.html">index</a>
      <a href="packagedetails.html">packagedetails</a>
      <a href="carDetails.html">carDetails</a>
      <a href="contact.html">contact</a>
      <a href="about.html">about</a>
      <a href="login.html">login</a>
    `;
  }
}

loadNavbar();
