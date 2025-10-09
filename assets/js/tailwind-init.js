// Utilities: toast, loader, and scroll reveal using Tailwind classes
export function showToast(message, type = 'info', timeout = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-6 right-6 z-50 flex flex-col gap-3';
    document.body.appendChild(container);
  }

  const color = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-sky-500';
  const toast = document.createElement('div');
  toast.className = `${color} text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in-right`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('animate-fade-out');
    setTimeout(() => toast.remove(), 400);
  }, timeout);
}

export function withLoader(button, fn) {
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<svg class="animate-spin h-5 w-5 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> Processing...`;

  return fn().finally(() => {
    button.disabled = false;
    button.innerHTML = original;
  });
}

// Simple scroll reveal using IntersectionObserver
export function initScrollReveal(selector = '[data-reveal]') {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
    obs.observe(el);
  });
}

// small helper to mount Tailwind animations (if not present)
export function mountUtilities() {
  // create some keyframes via style tag for slide-in/out
  if (!document.getElementById('tw-utils-style')) {
    const s = document.createElement('style');
    s.id = 'tw-utils-style';
    s.innerHTML = `
      @keyframes slide-in-right { from { transform: translateX(24px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
      @keyframes fade-out { from { opacity: 1 } to { opacity: 0; transform: translateY(-8px) } }
      .animate-slide-in-right { animation: slide-in-right .35s ease forwards }
      .animate-fade-out { animation: fade-out .35s ease forwards }
      .animate-fade-in { animation: fade-out .35s reverse both }
    `;
    document.head.appendChild(s);
  }
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  mountUtilities();
  initScrollReveal();
});
