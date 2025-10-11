import { getUserSession } from "./services.js";

const navbar = document.getElementById("navbar");

function buildLinkHtml(link, isActive) {
  // Define icons for navigation links
  const iconMap = {
    'Home': 'fa-home',
    'About': 'fa-info-circle',
    'Packages': 'fa-box-open',
    'Cars': 'fa-car',
    'Contact': 'fa-envelope',
    'Sign In': 'fa-sign-in-alt',
    'Sign Out': 'fa-sign-out-alt',
    'Book Package': 'fa-shopping-cart',
    'Book Car': 'fa-car-side',
    'History': 'fa-history',
    'Admin Cars': 'fa-car-alt',
    'Admin Packages': 'fa-boxes',
    'Bookings': 'fa-calendar-check',
    'Users': 'fa-users'
  };

  const icon = iconMap[link.name] || 'fa-link';

  return `
    <a href="${link.href}"
       class="group relative px-4 py-2 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-300 overflow-hidden ${
         isActive
           ? 'active-gradient text-black shadow-md'
           : 'bg-white text-black hover:bg-gray-100 hover:shadow-md'
       }"
    >
      <span class="relative z-10 flex items-center gap-2.5">
        <i class="fas ${icon} ${isActive ? 'animate-bounce-small' : 'group-hover:animate-bounce-small'} text-base"></i>
        <span class="relative font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
          ${link.name}
        </span>
      </span>
      <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
      ${isActive ? '<div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-white/80 via-white to-white/80 animate-pulse"></div>' : ''}
    </a>
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
        { name: "About", href: "about.html" },
        { name: "Packages", href: "packagedetails.html" },
        { name: "Cars", href: "carDetails.html" },
        { name: "Contact", href: "contact.html" },
        { name: "Sign In", href: "login.html" },
      ];
    } else if (LoggedIn && userType === "guest") {
      links = [
        { name: "Home", href: "index.html" },
        { name: "About", href: "about.html" },
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
      <div class="w-full bg-gradient-to-r from-white/95 via-white/95 to-white/95 text-black backdrop-blur-lg supports-[backdrop-filter]:bg-opacity-95 animate-nav-slide-down shadow-xl shadow-black/10 border-b border-slate-200">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Decorative blur circles and patterns -->
          <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <!-- Animated gradient circles -->
            <div class="absolute -left-4 top-0 w-40 h-40 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl transform -translate-y-1/2 animate-pulse-slow"></div>
            <div class="absolute right-0 bottom-0 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 rounded-full blur-3xl animate-float"></div>

            <!-- Subtle grid pattern -->
            <div class="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-slate-700/20 mask-grid"></div>

            <!-- Additional decorative elements -->
            <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-sky-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div class="absolute top-1/4 right-1/3 w-20 h-20 bg-indigo-400/10 rounded-full blur-2xl animate-float animation-delay-2000"></div>
          </div>

          <div class="relative flex items-center justify-between h-20">
            <!-- Enhanced Logo -->
            <div class="flex-shrink-0">
              <a href="index.html" class="group flex items-center gap-4 hover:opacity-95 transition-all duration-300">
                <div class="relative">
                  <!-- Enhanced Logo glow effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-sky-500/40 to-indigo-500/40 rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500"></div>
                  <div class="absolute inset-0 bg-white/30 rounded-full blur-md transform group-hover:scale-110 transition-transform"></div>
                  <img
                    src="./assets/images/logo.png"
                    alt="Kashika"
                    class="relative h-12 w-12 rounded-full object-cover ring-2 ring-white/70 shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <!-- Additional glow on hover -->
                  <div class="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </div>
                <div class="hidden md:block">
                  <div class="relative overflow-hidden">
                    <span class="block text-black font-bold text-2xl tracking-wide animate-fade-in">
                      Kashika
                      <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                    </span>
                    <span class="block text-black/90 text-sm font-semibold animate-fade-in animation-delay-200">
                      Travels & Tours
                    </span>
                  </div>
                </div>
              </a>
            </div>

            <!-- Enhanced Desktop Navigation -->
            <div class="hidden md:flex md:items-center">
              <div class="bg-gray-100/80 backdrop-blur-xl rounded-2xl p-2 shadow-md border border-gray-200">
                <div class="flex items-center gap-2">
                  ${links.map(l => buildLinkHtml(l, l.href.endsWith(current))).join('')}
                </div>
              </div>
            </div>

            <!-- Enhanced Mobile menu button -->
            <div class="flex md:hidden">
              <button
                id="mobileMenuBtn"
                aria-label="Toggle menu"
                class="relative p-3 rounded-xl text-black transition-all duration-300 hover:scale-105 focus:outline-none group bg-gray-200 hover:bg-gray-300 border border-gray-300 shadow-sm"
              >
                <!-- Button background effects -->
                <div class="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-indigo-400/20 rounded-xl blur-lg transform transition-transform group-hover:scale-110"></div>
                <div class="absolute inset-0 bg-white/10 rounded-xl blur transform transition-transform"></div>

                <!-- Animated hamburger icon -->
                <div class="relative">
                  <svg class="h-6 w-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      class="origin-center transform transition-all duration-300"
                      id="menuIcon"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    >
                    </path>
                  </svg>

                  <!-- Hover glow effect -->
                  <div class="absolute inset-0 bg-black/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Mobile menu with animations -->
        <div id="mobileMenu" class="md:hidden hidden">
          <div class="relative px-4 pt-2 pb-6 space-y-2 bg-gradient-to-b from-transparent via-black/5 to-black/10 backdrop-blur-md">
            <!-- Decorative elements for mobile menu -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-sky-400/10 to-indigo-400/10 blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-tl from-indigo-400/10 to-rose-400/10 blur-3xl"></div>
            </div>

            <!-- Mobile menu items with enhanced animations -->
            ${links.map((l, i) => {
              const icon = {
                'Home': 'fa-home',
                'About': 'fa-info-circle',
                'Packages': 'fa-box-open',
                'Cars': 'fa-car',
                'Contact': 'fa-envelope',
                'Sign In': 'fa-sign-in-alt',
                'Sign Out': 'fa-sign-out-alt',
                'Book Package': 'fa-shopping-cart',
                'Book Car': 'fa-car-side',
                'History': 'fa-history',
                'Admin Cars': 'fa-car-alt',
                'Admin Packages': 'fa-boxes',
                'Bookings': 'fa-calendar-check',
                'Users': 'fa-users'
              }[l.name] || 'fa-link';

              return `
                <a href="${l.href}"
                  class="nav-item group block p-3 rounded-xl text-sm font-medium text-black ${l.href.endsWith(current) ? 'active-gradient' : 'bg-gray-100'} hover:text-black transition-all duration-300 hover:bg-gray-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                  style="animation: slide-up 0.5s ease forwards ${i * 0.05}s; opacity: 0; transform: translateY(20px)">
                  <div class="relative flex items-center gap-3">
                    <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 group-hover:bg-sky-500/20 transition-colors duration-300">
                      <i class="fas ${icon} text-slate-300 group-hover:text-white group-hover:scale-110 transition-all"></i>
                    </div>
                    <span class="relative z-10 font-medium">${l.name}</span>
                    <div class="ml-auto opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <i class="fas fa-arrow-right text-sky-400"></i>
                    </div>
                  </div>
                  <!-- Hover effects -->
                  <div class="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <style>
        .active-gradient {
          background: linear-gradient(
            135deg,
            white 0%,
            #cce7ff 25%,
            #dfe3eb 50%,
            #ffd6d6 100%
          );
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes bounce-small {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-small {
          animation: bounce-small 1s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .mask-grid {
          mask-image: linear-gradient(to bottom, transparent, black);
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      </style>
    `;

    // mobile toggle with animation
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileBtn && mobileMenu) {
      let isOpen = false;

      mobileBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        // Animate hamburger to X
        if (isOpen) {
          menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
          menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }

        // Toggle menu with animation
        if (isOpen) {
          mobileMenu.style.display = 'block';
          mobileMenu.style.animation = 'fade-in 0.3s ease forwards';
        } else {
          mobileMenu.style.animation = 'fade-out 0.3s ease forwards';
          setTimeout(() => {
            mobileMenu.style.display = 'none';
          }, 300);
        }
      });

      // Close menu on window resize if open
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) { // md breakpoint
          isOpen = false;
          menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
          mobileMenu.style.display = 'none';
        }
      });
    }
  } catch (err) {
    navbar.innerHTML = '<div class="p-4 bg-slate-800 text-white"><a href="index.html">Home</a></div>';
  }
}

loadNavbar();
