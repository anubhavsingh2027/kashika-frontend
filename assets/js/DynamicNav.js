import { getUserSession } from "./services.js";

const navbar = document.getElementById("navbar");

function buildLinkHtml(link, isActive) {
  return `
    <a href="${link.href}" class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'}">${link.name}</a>
  `;
}

async function loadNavbar() {
  try {
    const session = await getUserSession();
    const { loggedIn: LoggedIn, user } = session || {};
    const userType = user?.userType || null;

    let links = [];

    if (!LoggedIn) {
      links = [
        { name: "Home", href: "index.html" },
        { name: "Packages", href: "packagedetails.html" },
        { name: "Cars", href: "carDetails.html" },
        { name: "Contact", href: "contact.html" },
        { name: "About", href: "about.html" },
        { name: "Sign In", href: "login.html" },
      ];
    } else if (LoggedIn && userType === "guest") {
      links = [
        { name: "Home", href: "index.html" },
        { name: "Packages", href: "packagedetails.html" },
        { name: "Cars", href: "carDetails.html" },
        { name: "Book Package", href: "packageBook.html" },
        { name: "Book Car", href: "carBook.html" },
        { name: "History", href: "userHistory.html" },
        { name: "Contact", href: "contact.html" },
        { name: "Sign Out", href: "login.html?logoutRequest=true" },
      ];
    } else if (LoggedIn && userType === "host") {
      links = [
        { name: "Home", href: "index.html" },
        { name: "Packages", href: "packagedetails.html" },
        { name: "Cars", href: "carDetails.html" },
        { name: "Admin Cars", href: "adminCarSet.html" },
        { name: "Admin Packages", href: "adminPackageSet.html" },
        { name: "Bookings", href: "allBookingHistory.html" },
        { name: "Users", href: "userTypeAccess.html" },
        { name: "Sign Out", href: "login.html?logoutRequest=true" },
      ];
    }

    const current = window.location.pathname.split('/').pop() || 'index.html';

    // Build navbar markup
    navbar.innerHTML = `
      <div class="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-rose-500 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <a href="index.html" class="flex items-center gap-3">
                <img src="./assets/images/logo.png" alt="Kashika" class="h-10 w-10 rounded-full object-cover shadow-md"/>
                <span class="hidden md:inline text-white font-semibold text-lg tracking-wide">Kashika Travels</span>
              </a>
            </div>
            <div class="hidden md:flex md:items-center md:space-x-2">
              ${links.map(l => buildLinkHtml(l, l.href.endsWith(current))).join('')}
            </div>
            <div class="flex md:hidden">
              <button id="mobileMenuBtn" aria-label="Toggle menu" class="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div id="mobileMenu" class="md:hidden hidden px-4 pb-4">
          <div class="flex flex-col space-y-1">
            ${links.map(l => `<a href="${l.href}" class="block px-3 py-2 rounded-md text-base font-medium text-white/90 hover:bg-white/10">${l.name}</a>`).join('')}
          </div>
        </div>
      </div>
    `;

    // mobile toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('animate-fade-in');
      });
    }
  } catch (err) {
    console.error('Navbar load failed:', err);
    navbar.innerHTML = '<div class="p-4 bg-slate-800 text-white"><a href="index.html">Home</a></div>';
  }
}

loadNavbar();
