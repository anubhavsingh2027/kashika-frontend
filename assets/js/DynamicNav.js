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
       class="nav-link group relative px-5 py-3 rounded-2xl text-[14px] font-medium tracking-wide transition-all duration-500 overflow-hidden transform hover:scale-105 ${
         isActive
           ? 'active-gradient text-black shadow-xl ring-2 ring-white/30'
           : 'bg-white/90 text-black hover:bg-white hover:shadow-2xl backdrop-blur-xl'
       }"
    >
      <!-- Animated background layers -->
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      <!-- Glowing border effect -->
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>

      <!-- Shimmer effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      <span class="relative z-20 flex items-center gap-3">
        <!-- Enhanced icon with multiple animation layers -->
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-purple-600/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></div>
          <i class="fas ${icon} ${isActive ? 'animate-pulse-glow' : 'group-hover:animate-float-icon'} text-base relative z-10 transform group-hover:rotate-12 transition-all duration-300"></i>
        </div>

        <!-- Enhanced text with typing effect -->
        <span class="relative font-bold overflow-hidden">
          <span class="block transform group-hover:translate-y-[-2px] transition-transform duration-300">
            ${link.name}
          </span>
          <!-- Animated underline -->
          <div class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <!-- Glow effect on text -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        </span>
      </span>

      <!-- Floating particles effect -->
      <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
      </div>

      ${isActive ? `
        <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 animate-pulse-slow"></div>
      ` : ''}
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

    // Build navbar markup with enhanced styling
    navbar.innerHTML = `
      <div class="w-full bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 text-black backdrop-blur-2xl supports-[backdrop-filter]:bg-opacity-95 animate-nav-slide-down shadow-2xl shadow-black/20 border-b border-gradient relative overflow-hidden">
        <!-- Advanced animated background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <!-- Flowing gradient waves -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-600/5 animate-gradient-x"></div>

          <!-- Floating orbs with complex animations -->
          <div class="floating-orb orb-1"></div>
          <div class="floating-orb orb-2"></div>
          <div class="floating-orb orb-3"></div>
          <div class="floating-orb orb-4"></div>

          <!-- Animated mesh gradient -->
          <div class="absolute inset-0 opacity-30">
            <div class="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-300/20 to-transparent rounded-full blur-3xl animate-float-slow"></div>
            <div class="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-300/20 to-transparent rounded-full blur-3xl animate-float-reverse"></div>
            <div class="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-blue-300/20 to-transparent rounded-full blur-3xl animate-float-slow animation-delay-1000"></div>
          </div>

          <!-- Particle grid -->
          <div class="absolute inset-0 bg-dots-pattern opacity-20 animate-pulse-slow"></div>

          <!-- Scanning line effect -->
          <div class="scanning-line"></div>
        </div>

        <div class="relative flex items-center justify-between h-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Ultra-enhanced Logo -->
          <div class="flex-shrink-0">
            <a href="index.html" class="logo-container group flex items-center gap-4 hover:opacity-95 transition-all duration-500">
              <div class="relative">
                <!-- Multiple glow layers -->
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/40 via-blue-500/40 to-purple-600/40 rounded-full blur-2xl transform group-hover:scale-150 transition-all duration-700 animate-pulse-glow"></div>
                <div class="absolute inset-0 bg-white/40 rounded-full blur-lg transform group-hover:scale-125 transition-all duration-500"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-300/30 to-purple-300/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <!-- Logo image with advanced effects -->
                <div class="relative">
                  <img
                    src="./assets/images/logo.png"
                    alt="Kashika"
                    class="relative h-14 w-14 rounded-full object-cover ring-2 ring-white/70 shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 z-10"
                  />
                  <!-- Rotating ring -->
                  <div class="absolute inset-0 rounded-full border-2 border-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 animate-spin-slow transition-opacity duration-500"></div>
                </div>
              </div>

              <!-- Enhanced text with advanced animations -->
              <div class="hidden md:block">
                <div class="relative overflow-hidden">
                  <div class="relative">
                    <span class="block text-black font-black text-3xl tracking-wider animate-fade-in bg-gradient-to-r from-gray-800 via-black to-gray-800 bg-clip-text">
                      <span class="inline-block transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">K</span>
                      <span class="inline-block transform group-hover:scale-110 transition-all duration-300 animation-delay-100">a</span>
                      <span class="inline-block transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 animation-delay-200">s</span>
                      <span class="inline-block transform group-hover:scale-110 transition-all duration-300 animation-delay-300">h</span>
                      <span class="inline-block transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 animation-delay-400">i</span>
                      <span class="inline-block transform group-hover:scale-110 transition-all duration-300 animation-delay-500">k</span>
                      <span class="inline-block transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-300 animation-delay-600">a</span>
                    </span>
                    <!-- Animated gradient underline -->
                    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                  <span class="block text-gray-700 text-sm font-bold tracking-widest animate-fade-in animation-delay-300 transform group-hover:translate-x-1 transition-transform duration-300">
                    TRAVELS & TOURS
                  </span>
                </div>
              </div>
            </a>
          </div>

          <!-- Ultra-enhanced Desktop Navigation -->
          <div class="hidden md:flex md:items-center">
            <div class="nav-container relative bg-white/80 backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-white/50 overflow-hidden">
              <!-- Navigation background effects -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-500/5 to-purple-600/5 animate-gradient-x"></div>
              <div class="absolute inset-0 bg-white/20 blur-sm"></div>

              <div class="relative flex items-center gap-2">
                ${links.map(l => buildLinkHtml(l, l.href.endsWith(current))).join('')}
              </div>

              <!-- Floating highlight -->
              <div class="nav-highlight absolute inset-0 pointer-events-none"></div>
            </div>
          </div>

          <!-- Ultra-enhanced Mobile menu button -->
          <div class="flex md:hidden">
            <button
              id="mobileMenuBtn"
              aria-label="Toggle menu"
              class="mobile-menu-btn relative p-4 rounded-2xl text-black transition-all duration-500 hover:scale-110 focus:outline-none group bg-white/90 hover:bg-white border border-white/50 shadow-xl backdrop-blur-xl overflow-hidden"
            >
              <!-- Multiple background layers -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>

              <!-- Glowing ring effect -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md animate-pulse"></div>

              <!-- Enhanced hamburger icon -->
              <div class="relative z-10">
                <svg class="h-7 w-7 transform transition-all duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    class="origin-center transform transition-all duration-500"
                    id="menuIcon"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>

              <!-- Ripple effect -->
              <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/30 to-purple-600/30 scale-0 group-active:scale-100 transition-transform duration-200"></div>
            </button>
          </div>
        </div>

        <!-- Ultra-enhanced Mobile menu -->
        <div id="mobileMenu" class="md:hidden hidden">
          <div class="mobile-menu-content relative px-6 pt-4 pb-8 space-y-3 bg-gradient-to-b from-white/95 via-gray-50/95 to-white/95 backdrop-blur-2xl border-t border-white/50 overflow-hidden">
            <!-- Advanced background effects -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
              <div class="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-600/10 blur-3xl animate-float-slow"></div>
              <div class="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-tl from-purple-400/10 via-pink-400/10 to-cyan-400/10 blur-3xl animate-float-reverse"></div>
              <div class="absolute inset-0 bg-dots-pattern opacity-10"></div>
            </div>

            <!-- Enhanced mobile menu items -->
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
                  class="mobile-nav-item group block p-4 rounded-2xl text-sm font-bold text-black ${l.href.endsWith(current) ? 'active-gradient ring-2 ring-white/30' : 'bg-white/80'} hover:bg-white transition-all duration-500 border border-white/50 hover:border-white/80 hover:shadow-xl backdrop-blur-xl relative overflow-hidden transform hover:scale-105"
                  style="animation: slide-up-enhanced 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards ${i * 0.08}s; opacity: 0; transform: translateY(30px) scale(0.9)">

                  <!-- Background effects -->
                  <div class="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  <div class="relative flex items-center gap-4 z-10">
                    <!-- Enhanced icon container -->
                    <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-cyan-400/20 group-hover:to-purple-600/20 transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 group-hover:rotate-3">
                      <i class="fas ${icon} text-gray-600 group-hover:text-black group-hover:scale-125 transition-all duration-300 transform group-hover:rotate-12"></i>
                    </div>

                    <!-- Enhanced text -->
                    <span class="relative font-bold text-lg flex-1 transform group-hover:translate-x-1 transition-transform duration-300">
                      ${l.name}
                      <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </span>

                    <!-- Animated arrow -->
                    <div class="opacity-0 transform translate-x-4 scale-75 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500">
                      <div class="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg">
                        <i class="fas fa-arrow-right text-white text-sm transform group-hover:translate-x-0.5 transition-transform duration-300"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Shimmer effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                  <!-- Bottom glow line -->
                  <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <style>
        /* Enhanced Active Gradient */
        .active-gradient {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(134, 239, 255, 0.3) 15%,
            rgba(255, 255, 255, 0.95) 30%,
            rgba(168, 162, 255, 0.3) 45%,
            rgba(255, 255, 255, 0.95) 60%,
            rgba(255, 182, 255, 0.3) 75%,
            rgba(255, 255, 255, 0.95) 100%
          );
          background-size: 300% 300%;
          animation: gradient-shift-enhanced 4s ease infinite;
          position: relative;
        }

        .active-gradient::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1));
          animation: rotate-glow 6s linear infinite;
        }

        /* Advanced Keyframe Animations */
        @keyframes gradient-shift-enhanced {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slide-up-enhanced {
          from {
            transform: translateY(30px) scale(0.9) rotateX(15deg);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(-5px) rotate(-1deg); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(5px) rotate(-1deg); }
          66% { transform: translateY(10px) rotate(1deg); }
        }

        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 0 0 40px rgba(168, 85, 247, 0.3);
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes nav-slide-down {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Enhanced Component Styles */
        .floating-orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: float-slow 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent);
          top: -60px;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent);
          top: -40px;
          right: 20%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
          bottom: -50px;
          left: 30%;
          animation-delay: 4s;
        }

        .orb-4 {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent);
          bottom: -30px;
          right: 40%;
          animation-delay: 6s;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.8), transparent);
          border-radius: 50%;
          animation: float-particle 3s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          right: 30%;
          animation-delay: 1s;
        }

        .particle-3 {
          bottom: 20%;
          left: 60%;
          animation-delay: 2s;
        }

        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.7; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
        }

        .bg-dots-pattern {
          background-image: radial-gradient(circle, rgba(6, 182, 212, 0.3) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .scanning-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.8), transparent);
          animation: scan 4s ease-in-out infinite;
        }

        @keyframes scan {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: -100%; }
        }

        .border-gradient {
          border-image: linear-gradient(90deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3)) 1;
        }

        /* Animation Delays */
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-1000 { animation-delay: 1s; }

        /* Utility Classes */
        .animate-gradient-x { animation: gradient-x 8s ease infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 6s ease-in-out infinite; }
        .animate-float-icon { animation: float-icon 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-nav-slide-down { animation: nav-slide-down 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

        /* Fade animations */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }

        .animate-fade-in { animation: fade-in 0.6s ease forwards; }

        /* Enhanced mobile responsive */
        @media (max-width: 768px) {
          .logo-container span {
            font-size: 1.5rem;
          }

          .floating-orb {
            display: none;
          }

          .nav-link {
            padding: 0.75rem 1rem;
          }
        }
      </style>
    `;

    // Enhanced mobile toggle with advanced animations
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileBtn && mobileMenu) {
      let isOpen = false;

      mobileBtn.addEventListener('click', () => {
        isOpen = !isOpen;

        // Enhanced hamburger to X animation
        if (isOpen) {
          menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
          menuIcon.style.transform = 'rotate(90deg)';
        } else {
          menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
          menuIcon.style.transform = 'rotate(0deg)';
        }

        // Enhanced menu toggle with advanced animations
        if (isOpen) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.style.animation = 'fade-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        } else {
          mobileMenu.style.animation = 'fade-out 0.3s ease forwards';
          setTimeout(() => {
            mobileMenu.classList.add('hidden');
          }, 300);
        }
      });

      // Close menu on window resize if open
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) { // md breakpoint
          isOpen = false;
          menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
          menuIcon.style.transform = 'rotate(0deg)';
          mobileMenu.classList.add('hidden');
        }
      });
    }
  } catch (err) {
    navbar.innerHTML = '<div class="p-4 bg-slate-800 text-white"><a href="index.html">Home</a></div>';
  }
}

loadNavbar();