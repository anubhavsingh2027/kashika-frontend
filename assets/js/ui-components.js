// Lightweight UI components: modal and testimonial carousel
export function initModal() {
  let modal = document.getElementById('globalModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalModal';
    modal.className = 'fixed inset-0 z-50 hidden items-center justify-center bg-black/40';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden" role="document">
        <div class="p-6" id="globalModalContent"></div>
        <div class="p-4 bg-slate-50 text-right"><button id="closeModal" class="px-4 py-2 bg-sky-600 text-white rounded">Close</button></div>
      </div>
    `;
    document.body.appendChild(modal);

    // close handler
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      const prev = modal._previousActive;
      if (prev && typeof prev.focus === 'function') prev.focus();
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

export function openModal(contentHtml) {
  const modal = initModal();
  const content = document.getElementById('globalModalContent');
  content.innerHTML = contentHtml;
  // store previously focused element to restore later
  modal._previousActive = document.activeElement;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  // focus first focusable element inside modal or the close button
  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  (focusable || modal.querySelector('#closeModal') || modal).focus();
  // bind esc handler
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
