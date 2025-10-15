// 🧠 Advanced Anti-Inspect & DevTools Protection

(function() {
  // Disable right-click, copy, and selection
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('copy', e => e.preventDefault());
  document.addEventListener('cut', e => e.preventDefault());
  document.addEventListener('selectstart', e => e.preventDefault());

  // Disable common DevTools shortcuts
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') e.preventDefault();
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) e.preventDefault();
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toLowerCase() === 'u') e.preventDefault();
    // Ctrl+S (Save page)
    if (e.ctrlKey && e.key.toLowerCase() === 's') e.preventDefault();
  });

  // Detect console opening (size-based)
  setInterval(() => {
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
      document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20%;'>⚠️ Developer Tools Detected! Access Blocked.</h1>";
      setTimeout(() => window.location.href = "about:blank", 1000);
    }
  }, 1000);

  // Detect DevTools via performance timing
  let start = Date.now();
  debugger;
  if (Date.now() - start > 50) {
    document.write("<h1 style='color:red;text-align:center;margin-top:20%;'>⚠️ Debugger Detected!</h1>");
    window.location.href = "about:blank";
  }

  // Anti-console logging (flood prevention)
  const originalLog = console.log;
  console.log = function() {
    originalLog("Console access blocked.");
    setTimeout(() => window.location.href = "about:blank", 100);
  };

  // Anti-inspection trap using hidden property
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      alert("⚠️ Developer Tools Detected!");
      window.location.href = "about:blank";
    }
  });
  console.log(element);

})();
