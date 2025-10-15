      // Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable certain key combinations (like F12, Ctrl+Shift+I)
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
    }
    // Ctrl+U (view source)
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
    }
});

// Optional: detect DevTools (basic)
setInterval(() => {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
        alert("DevTools detected! Please close it.");
         window.location.href = "about:blank";
    }
}, 1000);
