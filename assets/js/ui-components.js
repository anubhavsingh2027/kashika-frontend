// Lightweight UI components: modal and testimonial carousel
export function initModal() {
  let modal = document.getElementById('globalModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform transition-all duration-300 scale-95 opacity-0" role="document">
        <div class="relative">
          <div class="p-6" id="globalModalContent"></div>
          <div class="p-4 bg-gradient-to-br from-slate-50 to-blue-50/50 border-t border-slate-100 flex justify-between items-center">
            <div class="text-sm text-slate-500" id="modalStatus"></div>
            <button id="closeModal" class="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
              Close
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // close handler with animations
    function closeModal() {
      const dialog = modal.querySelector('[role="document"]');

      // Start close animation
      dialog.classList.remove('scale-100', 'opacity-100');
      dialog.classList.add('scale-95', 'opacity-0');
      modal.style.opacity = '0';

      // Wait for animation to complete
      setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        dialog.classList.remove('scale-95', 'opacity-0');

        // Reset any loading states
        const content = document.getElementById('globalModalContent');
        const status = document.getElementById('modalStatus');
        content.classList.remove('opacity-50');
        status.textContent = '';

        // Restore focus
        const prev = modal._previousActive;
        if (prev && typeof prev.focus === 'function') prev.focus();
      }, 300); // Match duration in CSS

      document.removeEventListener('keydown', escHandler);
    }

    // escape key
    function escHandler(e) {
      if (e.key === 'Escape') closeModal();
    }

    // overlay click to close (only when clicking the backdrop)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // close button
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // expose helper
    modal._closeModal = closeModal;
    modal._escHandler = escHandler;
  }
  return modal;
}

export function openModal(contentHtml, options = {}) {
  const modal = initModal();
  const content = document.getElementById('globalModalContent');
  const status = document.getElementById('modalStatus');
  const dialog = modal.querySelector('[role="document"]');

  // Format content based on type
  let formattedContent = '';
  if (typeof contentHtml === 'object') {
    if (contentHtml instanceof Error) {
      // Handle Error objects
      formattedContent = `
        <div class="bg-red-50 border-l-4 border-red-500 p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>${contentHtml.message || contentHtml.toString()}</p>
                ${contentHtml.stack ? `<pre class="mt-2 text-xs bg-red-50 p-2 rounded overflow-auto">${contentHtml.stack}</pre>` : ''}
              </div>
            </div>
          </div>
        </div>`;
    } else if (contentHtml.error) {
      // Handle error property in objects
      formattedContent = `
        <div class="bg-red-50 border-l-4 border-red-500 p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>${contentHtml.error}</p>
              </div>
            </div>
          </div>
        </div>`;
    } else {
      // Handle other objects
      formattedContent = `
        <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <pre class="text-sm text-slate-700 overflow-auto">${JSON.stringify(contentHtml, null, 2)}</pre>
        </div>`;
    }
  } else if (typeof contentHtml === 'string') {
    formattedContent = contentHtml;
  } else {
    formattedContent = String(contentHtml);
  }

  // Update content
  content.innerHTML = formattedContent;

  // Handle modal states
  if (options.loading) {
    status.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="animate-spin h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading...</span>
      </div>`;
    content.classList.add('opacity-50');
  } else if (options.error) {
    status.innerHTML = `
      <div class="flex items-center gap-2 text-red-600">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <span>Error occurred</span>
      </div>`;
  } else if (options.success) {
    status.innerHTML = `
      <div class="flex items-center gap-2 text-green-600">
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span>Success</span>
      </div>`;
  } else {
    status.innerHTML = '';
    content.classList.remove('opacity-50');
  }

  // Store previously focused element to restore later
  modal._previousActive = document.activeElement;

  // Show modal with animation
  modal.classList.remove('hidden');
  modal.classList.add('flex');

  // Animate in
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    dialog.classList.remove('scale-95', 'opacity-0');
    dialog.classList.add('scale-100', 'opacity-100');
  });

  // Handle focus
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  (focusable || modal.querySelector('#closeModal') || modal).focus();

  // Bind keyboard handlers
  document.addEventListener('keydown', modal._escHandler);
}

export function initTestimonials(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = [
    { name: 'Asha K.', text: 'Excellent service — comfortable cars and friendly drivers.' },
    { name: 'Ravi T.', text: 'Well planned package. The Ganga aarti experience was unforgettable.' },
    { name: 'Priya S.', text: 'Responsive support and on-time pickups. Highly recommended.' },
  ];

  let idx = 0;
  function render() {
    container.innerHTML = `
      <div class="relative bg-transparent">
        <div id="testViewport" class="min-h-[120px] p-4">
          <blockquote class="bg-white p-6 rounded-lg shadow"> <p class=\"text-slate-700\">${items[idx].text}</p><footer class=\"mt-3 text-sm text-slate-500\">— ${items[idx].name}</footer></blockquote>
        </div>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button id="prevTest" class="px-3 py-1 bg-slate-100 rounded">Prev</button>
          <div id="dots" class="flex gap-2"></div>
          <button id="nextTest" class="px-3 py-1 bg-slate-100 rounded">Next</button>
        </div>
      </div>
    `;

    const dots = container.querySelector('#dots');
    items.forEach((it, i) => {
      const d = document.createElement('button');
      d.className = `w-3 h-3 rounded-full ${i===idx? 'bg-sky-600' : 'bg-slate-300'}`;
      d.setAttribute('aria-label', `Show testimonial ${i+1}`);
      d.addEventListener('click', () => { idx = i; restart(); });
      dots.appendChild(d);
    });

    container.querySelector('#prevTest').addEventListener('click', () => { idx = (idx - 1 + items.length) % items.length; restart(); });
    container.querySelector('#nextTest').addEventListener('click', () => { idx = (idx + 1) % items.length; restart(); });
  }

  function advance() {
    idx = (idx + 1) % items.length;
    render();
  }

  function restart() {
    render();
    if (container._interval) clearInterval(container._interval);
    container._interval = setInterval(advance, 4500);
  }

  // start
  restart();

  // pause on hover
  container.addEventListener('mouseenter', () => { if (container._interval) clearInterval(container._interval); });
  container.addEventListener('mouseleave', () => { container._interval = setInterval(advance, 4500); });
}
